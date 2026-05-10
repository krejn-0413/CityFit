<template>
  <div class="w-full rounded-2xl overflow-hidden relative"
    style="background: transparent">
    
    <div class="absolute top-3 left-4 z-10 flex items-center gap-2">
      <span class="text-xs text-white/60">{{ mergedPointsLength }} 人</span>
      <span v-if="teamId && showTeamLabel" class="text-xs text-white/40">· 小队「{{ teamId }}」</span>
    </div>

    <div v-if="mapState === 'loading'" class="w-full flex flex-col items-center justify-center gap-3" style="height: 420px">
      <div class="w-8 h-8 border-3 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
      <span class="text-sm text-white/50">地图加载中...</span>
    </div>

    <div v-else-if="mapState === 'error'" class="w-full flex flex-col items-center justify-center gap-4" style="height: 420px">
      <span class="text-4xl">🗺️</span>
      <span class="text-sm text-white/60 text-center px-8">{{ errorMessage }}</span>
      <button @click="mapState = 'ready'"
        class="px-5 py-2 bg-white/10 text-white/80 text-sm font-bold rounded-xl hover:bg-white/20 transition-all"
      >
        🔄 重试
      </button>
    </div>

    <div v-show="mapState === 'ready'" class="relative flex items-center justify-center" style="min-height: 500px">
      <div ref="mapContainerRef" class="relative" style="width: 100%; max-width: 700px;">
        <img
          :src="mapSvgUrl"
          alt="中国地图"
          class="w-full h-auto block"
          @load="onMapLoaded"
          @error="onMapError"
        />

        <div v-for="point in allPoints" :key="point.name + point.source"
          class="absolute cursor-pointer group"
          :class="point.rank <= 3 ? 'transform -translate-x-1/2 -translate-y-full' : 'transform -translate-x-1/2 -translate-y-1/2'"
          :style="{ left: point.x + '%', top: point.y + '%' }"
          @click="emit('cityClick', point.name)"
          @mouseenter="hoveredCity = point.name"
          @mouseleave="hoveredCity = null"
        >
          <div class="relative flex items-center justify-center">
            <div v-if="point.rank === 1" class="absolute w-12 h-12 rounded-full animate-ping"
              style="left: 50%; top: 60%; transform: translate(-50%, -50%)"
              :style="{ backgroundColor: point.color + '25' }"></div>
            <div v-if="point.rank === 1" class="absolute w-9 h-9 rounded-full animate-pulse"
              style="left: 50%; top: 60%; transform: translate(-50%, -50%)"
              :style="{ backgroundColor: point.color + '15' }"></div>

            <img v-if="point.rank <= 3"
              :src="'/assets/flag' + point.rank + '.svg'"
              class="relative z-10 transition-transform duration-200 group-hover:scale-110"
              :class="point.rank === 1 ? 'w-8 h-8' : point.rank === 2 ? 'w-7 h-7' : 'w-6 h-6'"
            />
            <div v-else
              class="relative z-10 flex items-center justify-center rounded-full shadow transition-transform duration-200 group-hover:scale-125 w-3 h-3"
              :style="{ backgroundColor: point.color }">
            </div>
          </div>

          <div v-if="point.rank <= 3 || hoveredCity === point.name"
            class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-medium pointer-events-none transition-opacity"
            :class="point.rank === 1 ? 'top-9' : point.rank === 2 ? 'top-8' : 'top-7'"
            :style="{
              backgroundColor: point.rank === 1 ? point.color : 'rgba(255,255,255,0.9)',
              color: point.rank === 1 ? '#fff' : '#374151',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
            }">
            {{ point.name }} {{ point.value }}%
          </div>
        </div>
      </div>

      <div v-if="hoveredCity" class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-4 py-2 rounded-lg pointer-events-none">
        点击「{{ hoveredCity }}」查看详情
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  topCities: { name: string; value: number; color?: string }[]
  mergedPoints?: { name: string; value: number }[]
  teamId?: string
  showTeamLabel?: boolean
}>()

const emit = defineEmits<{
  cityClick: [name: string]
}>()

const mapContainerRef = ref<HTMLDivElement>()
const mapState = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')
const hoveredCity = ref<string | null>(null)
const mapSvgUrl = '/assets/converteverything.io-d4Bqj5E6b3.svg'

const mergedPointsLength = computed(() => props.mergedPoints?.length || 0)

const cityEmojiMap: Record<string, string> = {
  '成都': '🐼', '上海': '🌆', '北京': '🏯', '杭州': '🌊', '深圳': '🚀',
  '重庆': '🌶️', '西安': '🏛️', '昆明': '🌸', '广州': '🥟', '三亚': '🏖️',
  '南京': '📚', '大理': '🏔️', '长沙': '🍢', '苏州': '🎋', '青岛': '🍺',
  '拉萨': '🏔️', '武汉': '⚓', '厦门': '🏝️', '大连': '🏰', '哈尔滨': '❄️',
  '天津': '🎭', '贵阳': '🌲', '兰州': '🍜', '沈阳': '🏰', '济南': '⛲',
  '洛阳': '🌸', '桂林': '🏞️', '珠海': '🌴', '呼和浩特': '🐏', '郑州': '🏛️',
  '南昌': '🏗️', '合肥': '🔬',
}

const cityCoordMap: Record<string, [number, number]> = {
  '成都': [92, 89], '上海': [173, 113], '北京': [153, 69],
  '杭州': [169, 118], '深圳': [147, 154], '重庆': [119, 120],
  '西安': [123, 101], '昆明': [99, 144], '大理': [85, 142],
  '长沙': [137, 129], '苏州': [168, 111], '青岛': [171, 81],
  '拉萨': [60, 116], '武汉': [142, 116], '厦门': [166, 140],
  '大连': [171, 69], '哈尔滨': [187, 32], '天津': [156, 74],
  '贵阳': [115, 135], '兰州': [105, 95], '沈阳': [171, 61],
  '济南': [157, 86], '洛阳': [139, 99], '桂林': [127, 143],
  '珠海': [140, 157], '呼和浩特': [133, 62], '郑州': [143, 96],
  '南昌': [152, 125], '合肥': [155, 113],
  '南京': [163, 114], '三亚': [129, 171], '广州': [139, 156],
}

const GRID = 20
const SVG_W = 4177
const SVG_H = 3578

function gridToPercent(col: number, row: number): { x: number; y: number } {
  return {
    x: (col * GRID / SVG_W) * 100,
    y: (row * GRID / SVG_H) * 100,
  }
}

interface MapPoint {
  name: string
  value: number
  color: string
  rank: number
  emoji: string
  x: number
  y: number
  source: string
}

const allPoints = computed<MapPoint[]>(() => {
  const topNames = new Set(props.topCities.map(c => c.name))
  const points: MapPoint[] = []

  props.topCities.forEach((c, idx) => {
    const coord = cityCoordMap[c.name]
    if (!coord) return
    const pos = gridToPercent(coord[0], coord[1])
    points.push({
      name: c.name,
      value: c.value,
      color: c.color || (idx === 0 ? '#FF6B6B' : idx === 1 ? '#4ECDC4' : '#45B7D1'),
      rank: idx + 1,
      emoji: cityEmojiMap[c.name] || '📍',
      x: pos.x,
      y: pos.y,
      source: 'top',
    })
  })

  ;(props.mergedPoints || []).forEach(p => {
    if (topNames.has(p.name)) return
    const coord = cityCoordMap[p.name]
    if (!coord) return
    const pos = gridToPercent(coord[0], coord[1])
    points.push({
      name: p.name,
      value: p.value,
      color: '#45B7D1',
      rank: 99,
      emoji: cityEmojiMap[p.name] || '📍',
      x: pos.x,
      y: pos.y,
      source: 'merged',
    })
  })

  return points
})

function onMapLoaded() {
  mapState.value = 'ready'
}

function onMapError() {
  mapState.value = 'error'
  errorMessage.value = '地图图片加载失败'
}

onMounted(() => {
  const img = new Image()
  img.onload = () => { if (mapState.value === 'loading') mapState.value = 'ready' }
  img.onerror = () => { mapState.value = 'error'; errorMessage.value = '地图图片加载失败' }
  img.src = mapSvgUrl
})
</script>
