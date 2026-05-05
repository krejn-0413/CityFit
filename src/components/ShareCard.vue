<template>
  <div ref="shareRef" class="bg-gradient-to-br from-white via-pink-50 to-cyan-50 rounded-3xl p-6 w-[360px] shadow-2xl">
    <div class="text-center mb-4">
      <div class="text-4xl mb-1">🏙️</div>
      <h2 class="text-xl font-bold text-gray-800 font-display">CityFit 城宜</h2>
      <p class="text-xs text-gray-500">找到属于你的灵魂城市</p>
    </div>

    <div class="bg-white/70 backdrop-blur rounded-2xl p-4 mb-4 text-center">
      <div class="text-5xl mb-2">{{ personalityEmoji }}</div>
      <div class="text-xl font-bold text-gray-800 font-display">{{ personalityTag }}</div>
    </div>

    <div class="space-y-3 mb-4">
      <div v-for="(r, idx) in topResults" :key="r.city.id"
        class="flex items-center gap-3 bg-white/70 backdrop-blur rounded-xl px-4 py-3"
      >
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-accent'"
        >
          {{ idx + 1 }}
        </div>
        <div class="flex-1">
          <span class="font-bold text-gray-800">{{ r.city.emoji }} {{ r.city.name }}</span>
          <div class="text-xs text-gray-500">{{ r.city.province }}</div>
        </div>
        <div class="text-lg font-bold" :class="idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-accent'">
          {{ r.matchPercentage }}%
        </div>
      </div>
    </div>

    <div class="text-center text-xs text-gray-400">
      扫码测试你的本命城市 →
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CityResult } from '../types'

const props = defineProps<{
  personalityTag: string
  personalityEmoji?: string
  topResults: CityResult[]
}>()

const shareRef = ref<HTMLDivElement>()

const personalityEmoji = props.personalityEmoji || '🏙️'

defineExpose({ shareRef })
</script>
