<template>
  <div ref="shareRef" class="bg-canvas-card border border-border-subtle p-6 w-[360px]">
    <div class="text-center mb-4">
      <IconSprite name="cityscape" size="36" />
      <h2 class="text-xl font-bold text-text-primary font-display">CityFit 城宜</h2>
      <p class="text-fine text-text-muted">找到属于你的灵魂城市</p>
    </div>

    <div class="bg-canvas-overlay p-4 mb-4 text-center border border-border-subtle">
      <div class="text-5xl mb-2"><IconSprite :name="personalityEmoji" size="40" /></div>
      <div class="text-xl font-bold text-text-primary font-display">{{ personalityTag }}</div>
    </div>

    <div class="space-y-3 mb-4">
      <div v-for="(r, idx) in topResults" :key="r.city.id"
        class="flex items-center gap-3 bg-canvas-overlay px-4 py-3 border border-border-subtle"
      >
        <div class="w-8 h-8 flex items-center justify-center text-text-primary font-bold text-sm"
          :style="{ backgroundColor: idx === 0 ? '#F0B90B' : idx === 1 ? '#C8A84E' : '#A08840', color: '#0D0D0F' }"
        >
          {{ idx + 1 }}
        </div>
        <div class="flex-1">
          <span class="font-bold text-text-primary"><IconSprite :name="r.city.icon" size="16" /> {{ r.city.name }}</span>
          <div class="text-fine text-text-muted">{{ r.city.province }}</div>
        </div>
        <div class="text-lg font-bold text-gold">
          {{ r.matchPercentage }}%
        </div>
      </div>
    </div>

    <div class="text-center text-fine text-text-muted">
      扫码测试你的本命城市 →
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconSprite from './IconSprite.vue'
import type { CityResult } from '../types'

const props = defineProps<{
  personalityTag: string
  personalityEmoji?: string
  topResults: CityResult[]
}>()

const shareRef = ref<HTMLDivElement>()

const personalityEmoji = props.personalityEmoji || 'cityscape'

defineExpose({ shareRef })
</script>