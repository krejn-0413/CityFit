<template>
  <div class="w-full h-full rounded-2xl overflow-hidden relative"
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

    <!-- ===== Main map + marker layer: always rendered (opacity hidden until ready) ===== -->
    <div
      ref="outerRef"
      class="w-full h-full flex items-center justify-center"
      :class="mapState === 'ready' ? '' : 'invisible'"
    >
      <!-- Inner container: aspect-ratio locked to SVG native dimensions (4177:3578).
           Image and markers share this container → they scale together as one unit.
           Rendered unconditionally so @load fires; visibility gated by outer div. -->
      <div
        class="relative shrink-0"
        :style="{ width: (containerSize.width || 1) + 'px', height: (containerSize.height || 1) + 'px' }"
      >
        <img
          ref="mapImgRef"
          :src="mapSvgUrl"
          alt="中国地图"
          class="absolute inset-0 w-full h-full block"
          @load="onMapLoaded"
          @error="onMapError"
        />

        <!-- Marker layer: exactly overlays the image -->
        <div class="absolute inset-0">
          <div v-for="point in allPoints" :key="point.name + point.source"
            class="absolute cursor-pointer group"
            :style="{ left: point.x + '%', top: point.y + '%' }"
            @click="emit('cityClick', point.name)"
            @mouseenter="hoveredCity = point.name"
            @mouseleave="hoveredCity = null"
          >
            <div v-if="point.rank === 1" class="absolute rounded-full animate-ping"
              style="left: 50%; top: 50%; transform: translate(-50%, -50%); width: 3rem; height: 3rem"
              :style="{ backgroundColor: point.color + '25' }"></div>
            <div v-if="point.rank === 1" class="absolute rounded-full animate-pulse"
              style="left: 50%; top: 50%; transform: translate(-50%, -50%); width: 2.25rem; height: 2.25rem"
              :style="{ backgroundColor: point.color + '15' }"></div>

            <div
              class="pin-drop"
              :class="{ 'pin-glow': point.isOverlap }"
              :style="{ animationDelay: point.staggerIndex * 0.05 + 's' }"
            >
              <img
                :src="`${baseUrl}assets/pos_pin.svg`"
                class="transition-transform duration-200 group-hover:scale-110"
                :style="{ width: point.pinSize + 'rem', height: point.pinSize + 'rem' }"
              />
            </div>

            <div v-if="point.rank <= 3 || point.isOverlap || hoveredCity === point.name"
              class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-medium pointer-events-none transition-opacity z-20"
              :style="{
                top: (point.pinSize * 16 + 4) + 'px',
                backgroundColor: point.isOverlap ? '#F0B90B' : point.rank === 1 ? point.color : 'rgba(255,255,255,0.9)',
                color: (point.isOverlap || point.rank === 1) ? '#0a0a0c' : '#374151',
                boxShadow: point.isOverlap ? '0 0 10px rgba(240,185,11,0.5)' : '0 1px 4px rgba(0,0,0,0.15)'
              }">
              {{ point.isOverlap ? '✦ ' : '' }}{{ point.name }} {{ point.value }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hoveredCity" class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-4 py-2 rounded-lg pointer-events-none z-10">
      点击「{{ hoveredCity }}」查看详情
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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

const mapState = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')
const hoveredCity = ref<string | null>(null)
const baseUrl = import.meta.env.BASE_URL
const mapSvgUrl = baseUrl + 'assets/converteverything.io-d4Bqj5E6b3.svg'

// ── Adaptive scaling container ──
const outerRef = ref<HTMLElement | null>(null)
const mapImgRef = ref<HTMLImageElement | null>(null)

const SVG_W = 4177
const SVG_H = 3578
const SVG_RATIO = SVG_W / SVG_H
const GRID = 20
const PIN_MIN_REM = 1.25
const PIN_MAX_REM = 2.5

const containerSize = ref({ width: 0, height: 0 })

function computeContainerSize() {
  const el = outerRef.value
  if (!el) return
  const availW = el.clientWidth
  const availH = el.clientHeight
  if (availW <= 0 || availH <= 0) return

  let w: number, h: number
  if (availW / availH > SVG_RATIO) {
    // Available space wider than map → constrained by height
    h = availH
    w = h * SVG_RATIO
  } else {
    // Available space taller than map → constrained by width
    w = availW
    h = w / SVG_RATIO
  }
  containerSize.value = { width: Math.floor(w), height: Math.floor(h) }
}

let resizeObserver: ResizeObserver | null = null

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

// Original coordinates from pre-scaling version (commit 1a48d56).
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

function gridToPercent(col: number, row: number): { x: number; y: number } {
  return {
    x: (col * GRID / SVG_W) * 100,
    y: (row * GRID / SVG_H) * 100,
  }
}

function pinSizeFromValue(value: number): number {
  return PIN_MIN_REM + (value / 100) * (PIN_MAX_REM - PIN_MIN_REM)
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
  isOverlap?: boolean
  staggerIndex: number
  pinSize: number
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
      isOverlap: false,
      staggerIndex: points.length,
      pinSize: pinSizeFromValue(c.value),
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
      isOverlap: false,
      staggerIndex: points.length,
      pinSize: pinSizeFromValue(p.value),
    })
  })

  ;(props.overlapCities || []).forEach(c => {
    const coord = cityCoordMap[c.name]
    if (!coord) return
    const pos = gridToPercent(coord[0], coord[1])
    points.push({
      name: c.name,
      value: c.value,
      color: '#F0B90B',
      rank: 0,
      emoji: '',
      x: pos.x,
      y: pos.y,
      source: 'overlap',
      isOverlap: true,
      staggerIndex: points.length,
      pinSize: pinSizeFromValue(c.value),
    })
  })

  return points
})

function onMapLoaded() {
  // Image is now in DOM; ensure we have a ResizeObserver for responsive updates.
  // Initial size was already computed in onMounted before the container became visible.
  if (outerRef.value && !resizeObserver) {
    resizeObserver = new ResizeObserver(() => computeContainerSize())
    resizeObserver.observe(outerRef.value)
  }
}

function onMapError() {
  mapState.value = 'error'
  errorMessage.value = '地图图片加载失败'
}

// Trigger initial size computation early (before container becomes visible)
// to avoid 1px flash and the deadlock where v-if blocked <img> rendering.
function initContainerSize() {
  nextTick(() => {
    requestAnimationFrame(() => {
      computeContainerSize()
      if (outerRef.value && !resizeObserver) {
        resizeObserver = new ResizeObserver(() => computeContainerSize())
        resizeObserver.observe(outerRef.value)
      }
    })
  })
}

onMounted(() => {
  // Compute size immediately (outer div is in DOM, dimensions are valid even with invisible)
  initContainerSize()

  const img = new Image()
  img.onload = () => {
    if (mapState.value === 'loading') {
      mapState.value = 'ready'
    }
  }
  img.onerror = () => { mapState.value = 'error'; errorMessage.value = '地图图片加载失败' }
  img.src = mapSvgUrl
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>
