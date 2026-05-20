<template>
  <div class="w-full h-full">
    <div class="text-fine text-text-muted mb-2 flex items-center justify-between px-2">
      <span v-if="teamId && showTeamLabel">小队「{{ teamId }}」· {{ mergedPointsLength }} 人</span>
      <span v-else>{{ mergedPointsLength }} 人</span>
      <span v-if="totalCities > 0" class="text-text-muted">{{ totalCities }} 座城市</span>
    </div>

    <div v-if="mapState === 'loading'" class="w-full flex flex-col items-center justify-center gap-3" style="height: 400px">
      <div class="w-8 h-8 border-2 border-border-subtle border-t-gold rounded-full animate-spin"></div>
      <span class="text-caption text-text-muted">地图数据加载中...</span>
    </div>

    <div v-else-if="mapState === 'error'" class="w-full flex flex-col items-center justify-center gap-4" style="height: 400px">
      <IconSprite name="map" size="36" />
      <span class="text-caption text-text-muted text-center px-8">地图数据加载失败，请检查网络连接</span>
      <span class="text-fine text-text-muted text-center px-8">{{ errorMessage }}</span>
      <button @click="retryLoadMap" class="btn-secondary text-caption">
        重新加载
      </button>
    </div>

    <div v-if="mapState === 'ready'" ref="chartRef" class="w-full" style="height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import * as echarts from 'echarts'
import IconSprite from './IconSprite.vue'

const props = defineProps<{
  topCities: { name: string; value: number; color?: string }[]
  mergedPoints?: { name: string; value: number }[]
  overlapCities?: { name: string; value: number }[]
  teamId?: string
  showTeamLabel?: boolean
}>()

const emit = defineEmits<{
  cityClick: [name: string]
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
const mapState = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')

const mergedPointsLength = computed(() => props.mergedPoints?.length || 0)

const totalCities = computed(() => {
  const seen = new Set<string>()
  ;[...props.topCities, ...(props.mergedPoints || [])].forEach(p => seen.add(p.name))
  return seen.size
})

const MAP_CDN_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
const MAP_FALLBACK_URL = 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json'
const MAX_RETRIES = 3
let loadAttempts = 0

function getCityCoord(name: string): number[] | undefined {
  const map: Record<string, [number, number]> = {
    '北京': [116.40, 39.90], '上海': [121.47, 31.23], '广州': [113.26, 23.13],
    '深圳': [114.07, 22.55], '成都': [104.07, 30.57], '杭州': [120.15, 30.28],
    '重庆': [106.55, 29.57], '西安': [108.93, 34.27], '昆明': [102.72, 25.04],
    '三亚': [109.51, 18.25], '南京': [118.80, 32.06], '大理': [100.23, 25.60],
    '长沙': [112.97, 28.23], '苏州': [120.58, 31.30], '青岛': [120.38, 36.07],
    '拉萨': [91.13, 29.65], '武汉': [114.30, 30.60], '厦门': [118.09, 24.46],
    '大连': [121.62, 38.92], '哈尔滨': [126.63, 45.75], '天津': [117.19, 39.13],
    '贵阳': [106.71, 26.57], '兰州': [103.73, 36.03], '沈阳': [123.43, 41.80],
    '济南': [116.98, 36.67], '洛阳': [112.45, 34.62],
    '桂林': [110.28, 25.29], '珠海': [113.57, 22.27], '呼和浩特': [111.75, 40.84],
    '郑州': [113.65, 34.76], '南昌': [115.89, 28.68], '合肥': [117.27, 31.86],
  }
  return map[name]
}

function renderChart() {
  if (!chartRef.value || mapState.value !== 'ready') return

  try {
    if (!chart) {
      chart = echarts.init(chartRef.value)
    }

    const allPoints = [...props.topCities.map(c => ({
      name: c.name,
      value: [...(getCityCoord(c.name) || [0, 0]), c.value],
      itemStyle: { color: c.color || '#45B7D1' }
    })), ...(props.mergedPoints || []).map(p => ({
      name: p.name,
      value: [...(getCityCoord(p.name) || [0, 0]), p.value],
      itemStyle: { color: '#45B7D1', opacity: 0.4 }
    }))]

    const overlapPoints = (props.overlapCities || []).map(p => ({
      name: p.name,
      value: [...(getCityCoord(p.name) || [0, 0]), p.value],
    }))

    const series: any[] = [{
      type: 'scatter',
      coordinateSystem: 'geo',
      data: allPoints,
      symbolSize: (val: number[]) => Math.max(8, Math.min(16, val[2] / 6)),
      label: {
        show: true,
        formatter: (params: any) => params.name,
        position: 'right',
        color: '#9B9B9B',
        fontSize: 10,
        fontWeight: 400,
      },
      emphasis: {
        label: { show: true, color: '#FFFFFF', fontSize: 11, fontWeight: 500 },
        itemStyle: { borderColor: '#F0B90B', borderWidth: 2 },
      },
    }]

    // Add overlap highlight series (pulsing gold rings around shared cities)
    if (overlapPoints.length > 0) {
      series.push({
        type: 'scatter',
        coordinateSystem: 'geo',
        data: overlapPoints,
        symbolSize: 24,
        symbol: 'circle',
        itemStyle: {
          color: 'transparent',
          borderColor: '#F0B90B',
          borderWidth: 3,
          borderType: 'dashed',
          shadowBlur: 16,
          shadowColor: 'rgba(240,185,11,0.6)',
        },
        label: {
          show: true,
          formatter: (params: any) => `✦ ${params.name}`,
          position: 'top',
          color: '#F0B90B',
          fontSize: 11,
          fontWeight: 700,
        },
        emphasis: {
          scale: 1.5,
          itemStyle: { borderColor: '#FFD700', borderWidth: 4, shadowBlur: 24 },
        },
      })
    }

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.name}<br/>匹配度: ${params.value[2]}%`,
        backgroundColor: 'rgba(22,22,26,0.95)',
        borderColor: '#2a2a30',
        borderWidth: 1,
        textStyle: { color: '#C8C0B8', fontSize: 12 },
      },
      visualMap: { show: false, min: 0, max: 100 },
      series,
      geo: {
        map: 'china',
        roam: true,
        label: { show: false },
        itemStyle: {
          areaColor: '#16161a',
          borderColor: '#2a2a30',
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: { areaColor: '#1c1c21' },
          label: { show: false },
        },
      },
      grid: { show: false },
    }, true)
  } catch (err) {
    console.warn('[ChinaMap] Render failed:', err)
  }
}

async function loadMapData() {
  mapState.value = 'loading'
  loadAttempts++

  const urls = [MAP_CDN_URL, MAP_FALLBACK_URL]

  for (const url of urls) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(url, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const geoJSON = await res.json()
        echarts.registerMap('china', geoJSON)
        mapState.value = 'ready'
        errorMessage.value = ''
        await nextTick()
        renderChart()
        return
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        if (attempt < MAX_RETRIES - 1) {
          await new Promise(r => setTimeout(r, 1500 * (attempt + 1)))
        } else {
          errorMessage.value = `无法加载中国地图数据 (${msg})`
        }
      }
    }
  }
  mapState.value = 'error'
}

function retryLoadMap() {
  loadAttempts = 0
  errorMessage.value = ''
  loadMapData()
}

onMounted(async () => {
  await loadMapData()
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  chart = null
})

watch(
  () => [props.topCities, props.mergedPoints],
  () => {
    if (mapState.value === 'ready') renderChart()
  },
  { deep: true }
)
</script>
