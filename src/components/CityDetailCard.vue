<template>
  <Teleport to="body">
    <Transition name="card-overlay">
      <div v-if="visible && city" class="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4"
        @click.self="close">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <Transition name="card-slide">
          <div v-if="visible" class="relative w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            :style="{ background: cardGradient }">

            <div class="relative h-48 shrink-0 overflow-hidden">
              <img
                :src="personaAssetSrc"
                :alt="city.name"
                class="w-full h-full object-cover object-top"
                @error="onImageError"
              />
              <div v-if="imageError" class="absolute inset-0 flex items-center justify-center"
                :style="{ background: `linear-gradient(135deg, ${personalityColor}40, ${personalityColor}15)` }">
                <span class="text-7xl">{{ city.emoji }}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <button @click="close"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-white/30 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div class="absolute bottom-3 left-4 right-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-3xl drop-shadow-lg">{{ city.emoji }}</span>
                  <div>
                    <h2 class="text-xl font-display font-bold text-white drop-shadow-md">{{ city.name }}</h2>
                    <span class="text-xs text-white/70">{{ city.province }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4" style="scrollbar-width: thin;">

              <div class="flex items-center gap-3">
                <div v-if="(matchPercentage ?? 0) > 0" class="flex-1 bg-white/50 rounded-2xl px-4 py-3 text-center">
                  <div class="text-2xl font-bold font-display" :style="{ color: personalityColor }">
                    {{ matchPercentage }}%
                  </div>
                  <div class="text-[10px] text-gray-500 mt-0.5">匹配度</div>
                </div>
                <div class="flex-1 bg-white/50 rounded-2xl px-4 py-3 text-center">
                  <div class="text-2xl font-bold font-display" :style="{ color: personalityColor }">
                    {{ personalityTag }}
                  </div>
                  <div class="text-[10px] text-gray-500 mt-0.5">城市人格</div>
                </div>
              </div>

              <div class="bg-white/60 rounded-2xl p-4">
                <p class="text-sm text-gray-700 leading-relaxed">{{ city.description }}</p>
              </div>

              <div v-if="personalityDesc" class="bg-white/60 rounded-2xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
                    :style="{ backgroundColor: personalityColor + '20' }">
                    {{ personalityEmoji }}
                  </span>
                  <span class="text-xs font-bold text-gray-600">城市人设</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ personalityDesc }}</p>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in city.tags" :key="tag"
                  class="px-3 py-1 rounded-full text-xs font-medium border"
                  :style="{
                    backgroundColor: personalityColor + '10',
                    color: personalityColor,
                    borderColor: personalityColor + '30'
                  }">
                  #{{ tag }}
                </span>
              </div>

              <div class="bg-white/60 rounded-2xl p-4">
                <div class="text-xs font-bold text-gray-500 mb-3">城市画像</div>
                <div class="space-y-2.5">
                  <div class="flex items-center gap-3">
                    <span class="text-sm w-5 text-center">🏙️</span>
                    <span class="text-xs text-gray-500 w-12 shrink-0">物质</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.material + '%', backgroundColor: '#FF6B6B' }"></div>
                    </div>
                    <span class="text-xs font-bold text-gray-600 w-8 text-right">{{ city.material }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm w-5 text-center">🌿</span>
                    <span class="text-xs text-gray-500 w-12 shrink-0">精神</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.spiritual + '%', backgroundColor: '#4ECDC4' }"></div>
                    </div>
                    <span class="text-xs font-bold text-gray-600 w-8 text-right">{{ city.spiritual }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm w-5 text-center">🔮</span>
                    <span class="text-xs text-gray-500 w-12 shrink-0">玄学</span>
                    <div class="score-bar flex-1">
                      <div class="score-bar-fill" :style="{ width: city.xuanxue + '%', backgroundColor: '#45B7D1' }"></div>
                    </div>
                    <span class="text-xs font-bold text-gray-600 w-8 text-right">{{ city.xuanxue }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-center gap-2">
                <span class="text-xs text-gray-400">五行偏好</span>
                <span v-for="elem in city.baziPreference" :key="elem"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold"
                  :style="{
                    backgroundColor: getWuxingColor(elem) + '20',
                    color: getWuxingColor(elem)
                  }">
                  {{ elem }}{{ getWuxingEmoji(elem) }}
                </span>
              </div>

              <div v-if="reason" class="bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-2xl p-4 border border-amber-200/40">
                <div class="text-xs font-bold text-amber-600 mb-1">💡 匹配理由</div>
                <p class="text-xs text-gray-600 leading-relaxed">{{ reason }}</p>
              </div>

            </div>

            <div class="shrink-0 px-5 pb-5 pt-2">
              <button @click="close"
                class="w-full py-3 rounded-2xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                :style="{ background: `linear-gradient(135deg, ${personalityColor}, ${personalityColor}CC)` }">
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
import { WUXING_COLORS, WUXING_EMOJI } from '../composables/useBazi'

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
const personalityEmoji = computed(() => personality.value?.emoji || props.city?.emoji || '🏙️')
const personalityDesc = computed(() => personality.value?.description || '')

const personaAssetSrc = computed(() => {
  if (!props.city) return ''
  return `/assets/personas/${props.city.id}.png`
})

const cardGradient = computed(() => {
  const c = personalityColor.value
  return `linear-gradient(180deg, ${c}08 0%, white 30%, white 100%)`
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

function getWuxingEmoji(wuxing: string): string {
  return WUXING_EMOJI[wuxing] || '✨'
}
</script>

<style scoped>
.card-overlay-enter-active,
.card-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.card-overlay-enter-from,
.card-overlay-leave-to {
  opacity: 0;
}

.card-slide-enter-active {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.card-slide-leave-active {
  transition: transform 0.25s ease-in, opacity 0.2s ease-in;
}
.card-slide-enter-from {
  transform: translateY(60px) scale(0.95);
  opacity: 0;
}
.card-slide-leave-to {
  transform: translateY(30px) scale(0.97);
  opacity: 0;
}

.score-bar {
  height: 8px;
  border-radius: 9999px;
  background: #f3f4f6;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.7s ease-out;
}
</style>
