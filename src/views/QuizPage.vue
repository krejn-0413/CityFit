<template>
  <div class="min-h-screen bg-gradient-to-br from-secondary-pale via-white to-bright-yellow-pale py-8">
    <div class="max-w-lg mx-auto px-4">
      <div class="text-center mb-6 animate-slide-up">
        <h1 class="text-2xl font-display font-bold text-gray-800 mb-1">
          <span class="inline-flex items-center gap-2">🧠 城市人格测试</span>
        </h1>
        <p class="text-sm text-gray-400">每题选择一个最符合你的选项</p>
      </div>

      <!-- Progress -->
      <div class="glass-card p-4 mb-6 animate-scale-in">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-bold text-gray-600">
            {{ currentIndex + 1 }} / {{ questions.length }}
          </span>
          <span v-if="currentQuestion" class="text-xs text-gray-400">
            {{ currentQuestion.category === 'material' ? '🏙️ 物质生活' : currentQuestion.category === 'spiritual' ? '🌿 精神追求' : '🔮 玄学倾向' }}
          </span>
        </div>
        <div class="score-bar">
          <div class="score-bar-fill bg-gradient-to-r from-primary via-secondary to-accent" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- Animation container -->
      <Transition name="slide" mode="out-in">
        <div v-if="currentQuestion" :key="currentIndex" class="space-y-4">
          <div class="section-block-secondary text-center animate-scale-in">
            <div class="text-4xl mb-4">{{ questionEmoji }}</div>
            <h2 class="text-lg md:text-xl font-bold text-gray-700 leading-relaxed mb-6">
              {{ currentQuestion.text }}
            </h2>

            <div class="space-y-3">
              <button v-for="(opt, idx) in currentQuestion.options" :key="idx"
                @click="selectOption(opt)"
                class="w-full p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-secondary hover:bg-secondary/5 text-left text-sm text-gray-600 font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              >
                <span class="flex items-start gap-3">
                  <span class="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 shrink-0 mt-0.5">
                    {{ ['A', 'B', 'C', 'D'][idx] }}
                  </span>
                  <span class="leading-relaxed">{{ opt.label }}</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between items-center">
            <button @click="prevQuestion"
              class="px-5 py-2.5 rounded-full text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="currentIndex === 0"
            >
              ← 上一题
            </button>
            <span class="text-xs text-gray-300">{{ currentIndex + 1 }} / {{ questions.length }}</span>
            <button @click="nextQuestion"
              class="px-5 py-2.5 rounded-full text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="currentIndex === questions.length - 1"
            >
              下一题 →
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { questions } from '../data/questions'
import { calculateBazi } from '../composables/useBazi'
import { calculateResults } from '../composables/useMatching'
import type { Answer, QuestionOption } from '../types'

const router = useRouter()
const currentIndex = ref(0)
const answers = ref<Answer[]>([])

const currentQuestion = computed(() => questions[currentIndex.value] || null)
const progressPercent = computed(() => ((currentIndex.value + 1) / questions.length) * 100)

const questionEmoji = computed(() => {
  const q = currentQuestion.value
  if (!q) return '❓'
  const emojiList = ['🌆', '🌃', '🏙️', '🎯', '🧩', '🎪', '🏯', '🌉', '🎠', '🌈', '🌟', '💫', '✨', '🎭', '🎨', '🎵', '🎮', '📚']
  return emojiList[currentIndex.value % emojiList.length]
})

function selectOption(opt: QuestionOption) {
  const answer: Answer = {
    questionId: currentQuestion.value!.id,
    selectedValue: opt.value,
  }
  const existing = answers.value.findIndex(a => a.questionId === currentQuestion.value?.id)
  if (existing >= 0) {
    answers.value[existing] = answer
  } else {
    answers.value.push(answer)
  }

  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    submitAnswers()
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) currentIndex.value--
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) currentIndex.value++
}

function submitAnswers() {
  const store = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
  const userInfo = store.userInfo

  if (!userInfo) {
    router.push('/')
    return
  }

  const bazi = calculateBazi(
    userInfo.birthDate.year,
    userInfo.birthDate.month,
    userInfo.birthDate.day,
    userInfo.birthTime?.hour ?? null
  )

  const results = calculateResults(answers.value, bazi, userInfo.gender)
  store.results = {
    ...results,
    baziInfo: bazi,
  }
  sessionStorage.setItem('cityfit', JSON.stringify(store))
  router.push('/result')
}

onMounted(() => {
  const store = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
  if (!store.userInfo) {
    router.push('/')
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
