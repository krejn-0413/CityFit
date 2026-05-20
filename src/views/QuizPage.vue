<template>
  <div class="min-h-screen bg-canvas-base">
    <div class="top-bar flex items-center px-4">
      <button @click="goBack" class="btn-ghost px-2 text-caption">← 退出</button>
      <span class="flex-1 text-center text-caption text-text-muted tracking-wider">城市人格测试</span>
      <span class="text-caption text-text-muted">{{ currentIndex + 1 }}/{{ questions.length }}</span>
    </div>

    <div class="progress-track" style="margin-top: 52px">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <div class="max-w-content mx-auto">
      <Transition name="slide" mode="out-in">
        <div v-if="currentQuestion" :key="currentIndex" class="section-block">
          <h2 class="font-display text-question text-text-primary text-center mb-12 leading-relaxed max-w-lg mx-auto animate-reveal">
            {{ currentQuestion.text }}
          </h2>

          <div class="space-y-3 max-w-lg mx-auto">
            <button v-for="(opt, idx) in currentQuestion.options" :key="idx"
              @click="selectOption(opt)"
              class="w-full text-left py-4 px-5 border border-border-subtle transition-all duration-300 group animate-reveal"
              :class="'stagger-' + (idx + 1)"
              :style="{
                animationDelay: (0.05 * (idx + 1)) + 's'
              }"
            >
              <div class="flex items-start gap-4">
                <span class="w-7 h-7 rounded-sm border border-border-subtle flex items-center justify-center text-caption text-text-muted shrink-0 mt-0.5 group-hover:border-gold/50 group-hover:text-gold transition-colors">
                  {{ ['A', 'B', 'C', 'D'][idx] }}
                </span>
                <span class="inline-flex items-center gap-2 text-body text-text-body leading-relaxed flex-1 group-hover:text-text-primary transition-colors">
                  <IconSprite v-if="(opt as any).icon" :name="(opt as any).icon" size="18" />
                  <span>{{ opt.label }}</span>
                </span>
              </div>
            </button>
          </div>

          <div class="flex justify-between items-center max-w-lg mx-auto mt-10">
            <button @click="prevQuestion"
              class="btn-ghost text-caption"
              :disabled="currentIndex === 0"
              :class="{ 'opacity-20 pointer-events-none': currentIndex === 0 }"
            >
              ← 上一题
            </button>
            <span class="text-caption text-text-faint">{{ currentIndex + 1 }} / {{ questions.length }}</span>
            <button @click="nextQuestion"
              class="btn-ghost text-caption"
              :disabled="currentIndex === questions.length - 1"
              :class="{ 'opacity-20 pointer-events-none': currentIndex === questions.length - 1 }"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import IconSprite from '../components/IconSprite.vue'
import { questions } from '../data/questions'
import { calculateBazi } from '../composables/useBazi'
import { calculateResults } from '../composables/useMatching'
import type { Answer, QuestionOption } from '../types'

const router = useRouter()
const currentIndex = ref(0)
const answers = ref<Answer[]>([])

const currentQuestion = computed(() => questions[currentIndex.value] || null)
const progressPercent = computed(() => ((currentIndex.value + 1) / questions.length) * 100)

function goBack() {
  router.push('/')
}

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
    router.push('/info')
    return
  }

  const [y, m, d] = userInfo.birthDate.split('-').map(Number)
  let h = 12
  if (userInfo.birthTime) {
    const [hh] = userInfo.birthTime.split(':').map(Number)
    h = hh
  }

  const baziInfo = calculateBazi(y, m, d, h)
  const results = calculateResults(answers.value, baziInfo, userInfo.gender)

  // Preserve pending team ID (set when user visited a shared link before quiz)
  const pendingTeamId = localStorage.getItem('cityfit_pending_team') || ''

  sessionStorage.setItem('cityfit', JSON.stringify({
    userInfo,
    results,
    teamId: pendingTeamId,
  }))

  router.push('/result')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>