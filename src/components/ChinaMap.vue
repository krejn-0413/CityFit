<template>
  <div ref="chartRef" class="w-full h-full min-h-[400px]"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { CityResult, FriendRecommendation } from '../types'

const props = defineProps<{
  topResults: CityResult[]
  friendRecommendations?: FriendRecommendation[]
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
const chinaJson = shallowRef<any>(null)

function getCityCoord(cityName: string): [number, number] | undefined {
  const coordMap: Record<string, [number, number]> = {
    '北京': [116.40, 39.90],
    '上海': [121.47, 31.23],
    '广州': [113.26, 23.13],
    '深圳': [114.07, 22.55],
    '成都': [104.07, 30.57],
    '杭州': [120.15, 30.28],
    '重庆': [106.55, 29.57],
    '西安': [108.93, 34.27],
    '南京': [118.80, 32.06],
    '武汉': [114.30, 30.60],
    '长沙': [112.97, 28.23],
    '昆明': [102.72, 25.04],
    '苏州': [120.58, 31.30],
    '青岛': [120.38, 36.07],
    '大连': [121.62, 38.92],
    '厦门': [118.09, 24.46],
    '三亚': [109.51, 18.25],
    '大理': [100.23, 25.60],
    '拉萨': [91.13, 29.65],
    '哈尔滨': [126.63, 45.75],
    '乌鲁木齐': [87.68, 43.77],
    '兰州': [103.73, 36.03],
    '贵阳': [106.71, 26.57],
    '南宁': [108.33, 22.84],
    '天津': [117.19, 39.13],
    '宁波': [121.54, 29.86],
    '济南': [116.98, 36.67],
    '福州': [119.30, 26.07],
    '合肥': [117.27, 31.86],
    '南昌': [115.89, 28.68],
    '郑州': [113.65, 34.76],
    '太原': [112.53, 37.87],
    '沈阳': [123.43, 41.80],
    '长春': [125.32, 43.88],
  }
  return coordMap[cityName]
}

function getFriendColor(name: string): string {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#96CEB4', '#FF9FF3', '#54A0FF', '#5F27CD']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

async function initChart() {
  if (!chartRef.value) return

  if (!chinaJson.value) {
    try {
      const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      chinaJson.value = await res.json()
      echarts.registerMap('china', chinaJson.value)
    } catch {
      return
    }
  }

  if (chart) chart.dispose()
  chart = echarts.init(chartRef.value)

  const scatterData: any[] = []
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D']

  props.topResults.forEach((r, idx) => {
    const coord = getCityCoord(r.city.name)
    if (coord) {
      scatterData.push({
        name: r.city.name,
        value: [...coord, r.matchPercentage],
        itemStyle: {
          color: colors[idx],
          shadowBlur: 10,
          shadowColor: colors[idx] + '80',
        },
        label: {
          formatter: `{b}\n匹配度: ${r.matchPercentage}%`,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
        },
        symbolSize: Math.max(30, r.matchPercentage / 2 + 20),
      })
    }
  })

  if (props.friendRecommendations) {
    props.friendRecommendations.forEach((f) => {
      const coord = getCityCoord(f.cityName)
      if (coord) {
        const color = getFriendColor(f.name)
        scatterData.push({
          name: `${f.name}的${f.cityName}`,
          value: [...coord, 0],
          itemStyle: {
            color: color,
            shadowBlur: 8,
            shadowColor: color + '60',
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            formatter: `👤 ${f.name}\n🏙️ ${f.cityName}`,
            fontSize: 11,
            color: '#666',
          },
          symbolSize: 22,
        })
      }
    })
  }

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.data) {
          const isFriend = params.data.name && params.data.name.includes('的')
          if (isFriend) {
            const [namePart, cityPart] = params.data.name.split('的')
            return `<strong>👤 ${namePart}</strong><br/>📍 推荐城市: ${cityPart}`
          }
          return `<strong>${params.name}</strong><br/>匹配度: ${params.value?.[2] || '?'}%`
        }
        return params.name
      },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      borderRadius: 12,
      padding: [12, 16],
    },
    visualMap: {
      min: 0,
      max: 100,
      text: ['高匹配', '低匹配'],
      textStyle: { color: '#666' },
      inRange: {
        color: ['#e0f5f3', '#96CEB4', '#4ECDC4', '#45B7D1', '#FF6B6B'],
      },
      show: false,
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.2,
      center: [104, 35],
      label: {
        show: true,
        fontSize: 9,
        color: '#666',
      },
      itemStyle: {
        areaColor: '#f0f9f8',
        borderColor: '#cbd5e1',
        borderWidth: 1,
        shadowBlur: 5,
        shadowColor: 'rgba(0,0,0,0.05)',
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e8f5f4',
        },
        label: {
          color: '#333',
          fontWeight: 'bold',
        },
      },
    },
    series: [
      {
        name: '推荐城市',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbol: 'circle',
        symbolSize: (val: any) => val[2] ? Math.max(28, val[2] / 2 + 18) : 20,
        encode: {
          value: 2,
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            if (params.data.name.includes('的')) {
              const parts = params.data.name.split('的')
              return `{small|${parts[0]}}\n{small|${parts[1]}}`
            }
            return `{bold|${params.name}}\n{small|${params.value?.[2] || 0}%}`
          },
          rich: {
            bold: { fontSize: 13, fontWeight: 'bold', color: '#333', padding: [0, 0, 2, 0] },
            small: { fontSize: 10, color: '#666' },
          },
        },
        emphasis: {
          scale: 1.5,
          label: {
            show: true,
          },
        },
      },
    ],
  }

  chart.setOption(option)
  chart.on('click', (params: any) => {
    if (params.data) {
      alert(`📍 ${params.name}\n${params.value?.[2] ? `匹配度: ${params.value[2]}%` : '朋友的推荐城市'}`)
    }
  })
}

onMounted(() => {
  initChart()
})

watch(() => props.topResults, () => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  initChart()
}, { deep: true })
</script>
