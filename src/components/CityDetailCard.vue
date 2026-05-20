<template>
  <Teleport to="body">
    <Transition name="card-overlay">
      <div v-if="visible && city" class="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4"
        @click.self="close">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <Transition name="card-slide">
          <div v-if="visible" class="relative w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden border border-border-subtle bg-canvas-card"
            style="box-shadow: 0 16px 48px rgba(0,0,0,0.5)">

            <div class="relative h-48 shrink-0 overflow-hidden">
              <img
                :src="personaAssetSrc"
                :alt="city.name"
                class="w-full h-full object-cover object-top"
                @error="onImageError"
              />
              <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-canvas-overlay">
                <IconSprite :name="city.icon" size="48" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-canvas-card via-transparent to-transparent"></div>

              <button @click="close"
                class="absolute top-3 right-3 w-8 h-8 bg-canvas-base/60 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-gold transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div class="absolute bottom-3 left-4 right-4">
                <div class="flex items-center gap-2 mb-1">
                  <IconSprite :name="city.icon" size="28" />
                  <div>
                    <h2 class="text-xl font-display font-bold text-text-primary">{{ city.name }}</h2>
                    <span class="text-fine text-text-muted">{{ city.province }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">

              <div class="flex items-center gap-3">
                <div v-if="(matchPercentage ?? 0) > 0" class="flex-1 bg-canvas-overlay px-4 py-3 text-center border border-border-subtle">
                  <div class="text-2xl font-bold font-display text-gold">
                    {{ matchPercentage }}%
                  </div>
                  <div class="text-fine text-text-muted mt-0.5">匹配度</div>
                </div>
                <div class="flex-1 bg-canvas-overlay px-4 py-3 text-center border border-border-subtle">
                  <div class="text-2xl font-bold font-display" :style="{ color: personalityColor }">
                    {{ personalityTag }}
                  </div>
                  <div class="text-fine text-text-muted mt-0.5">城市人格</div>
                </div>
              </div>

              <div class="bg-canvas-overlay p-4 border border-border-subtle">
                <p class="text-body text-text-body leading-relaxed">{{ city.description }}</p>
              </div>

              <div v-if="personalityDesc" class="bg-canvas-overlay p-4 border border-border-subtle">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 flex items-center justify-center text-sm"
                    :style="{ backgroundColor: personalityColor + '15' }">
                    <IconSprite :name="personalityEmoji" size="14" />
                  </span>
                  <span class="text-caption text-text-primary font-bold">城市人设</span>
                </div>
                <p class="text-body text-text-body leading-relaxed">{{ personalityDesc }}</p>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in city.tags" :key="tag"
                  class="px-3 py-1 text-fine font-medium border"
                  :style="{
                    backgroundColor: personalityColor + '10',
                    color: personalityColor,
                    borderColor: personalityColor + '30'
                  }">
                  #{{ tag }}
                </span>
              </div>

              <div class="bg-canvas-overlay p-4 border border-border-subtle">
                <div class="text-caption text-text-primary font-bold mb-3 tracking-wider">城市画像</div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <IconSprite name="cityscape" size="16" class="mx-auto" />
                    <span class="text-caption text-text-muted w-12 shrink-0">物质</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.material + '%', backgroundColor: '#FF6B6B' }"></div>
                    </div>
                    <span class="text-caption font-bold text-text-body w-8 text-right">{{ city.material }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <IconSprite name="leaf" size="16" class="mx-auto" />
                    <span class="text-caption text-text-muted w-12 shrink-0">精神</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.spiritual + '%', backgroundColor: '#4ECDC4' }"></div>
                    </div>
                    <span class="text-caption font-bold text-text-body w-8 text-right">{{ city.spiritual }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <IconSprite name="crystal-ball" size="16" class="mx-auto" />
                    <span class="text-caption text-text-muted w-12 shrink-0">玄学</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.xuanxue + '%', backgroundColor: '#45B7D1' }"></div>
                    </div>
                    <span class="text-caption font-bold text-text-body w-8 text-right">{{ city.xuanxue }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-center gap-2">
                <span class="text-caption text-text-muted">五行偏好</span>
                <span v-for="elem in city.baziPreference" :key="elem"
                  class="px-2.5 py-1 text-fine font-bold"
                  :style="{
                    backgroundColor: getWuxingColor(elem) + '15',
                    color: getWuxingColor(elem)
                  }">
                   <span>{{ elem }}</span><IconSprite :name="getWuxingIcon(elem)" size="14" />
                </span>
              </div>

              <div v-if="reason" class="bg-gold/5 p-4 border border-gold/10">
                <div class="text-caption text-gold font-bold mb-1 tracking-wider">匹配理由</div>
                <p class="text-body text-text-body leading-relaxed">{{ reason }}</p>
              </div>

            </div>

            <div class="shrink-0 px-5 pb-5 pt-2">
              <button @click="close"
                class="btn-primary w-full">
                关闭
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { City } from '../types'
import { cityPersonalities } from '../data/cities'
import { WUXING_COLORS, WUXING_ICONS } from '../composables/useBazi'
import IconSprite from './IconSprite.vue'

const props = defineProps<{
  visible: boolean
  city: City | null
  matchPercentage?: number
  reason?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const imageError = ref(false)

watch(() => props.city, () => {
  imageError.value = false
})

const personality = computed(() => {
  if (!props.city) return null
  const list = cityPersonalities[props.city.id]
  return list && list.length > 0 ? list[0] : null
})

const personalityColor = computed(() => personality.value?.color || '#FF6B6B')
const personalityTag = computed(() => personality.value?.tag || '城市探索家')
const personalityEmoji = computed(() => personality.value?.icon || props.city?.icon || 'cityscape')
const personalityDesc = computed(() => personality.value?.description || '')

const personaAssetSrc = computed(() => {
  if (!props.city) return ''
  return `${import.meta.env.BASE_URL}assets/personas/${props.city.id}.png`
})

function onImageError() {
  imageError.value = true
}

function close() {
  emit('close')
}

function getWuxingColor(wuxing: string): string {
  return WUXING_COLORS[wuxing] || '#9CA3AF'
}

function getWuxingIcon(wuxing: string): string {
  return WUXING_ICONS[wuxing] || 'sparkles'
}
</script>

<style scoped>
.card-overlay-enter-active,
.card-overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-overlay-enter-from,
.card-overlay-leave-to {
  opacity: 0;
}

.card-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-slide-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}
.card-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>