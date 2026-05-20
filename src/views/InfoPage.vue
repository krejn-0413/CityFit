<template>
  <div class="min-h-screen bg-canvas-base">
    <div class="max-w-narrow mx-auto px-6 section-block">
      <div class="animate-reveal mb-12">
        <div class="gold-line mb-6"></div>
        <h1 class="font-display text-section text-text-primary mb-2">基本信息</h1>
        <p class="text-caption text-text-muted tracking-wider">先告诉我一些基本信息吧</p>
      </div>

      <div class="space-y-10">
        <div class="animate-reveal stagger-1">
          <label class="block text-caption text-text-muted tracking-widest mb-4">出生日期</label>
          <div class="grid grid-cols-3 gap-3">
            <select v-model="year" class="text-input w-full">
              <option value="" disabled>年</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-model="month" class="text-input w-full">
              <option value="" disabled>月</option>
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="day" class="text-input w-full">
              <option value="" disabled>日</option>
              <option v-for="d in daysInMonth" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <p v-if="dateError" class="text-caption text-gold mt-3">{{ dateError }}</p>
        </div>

        <div class="animate-reveal stagger-2">
          <label class="block text-caption text-text-muted tracking-widest mb-4">出生时间<span class="text-text-faint ml-1">选填</span></label>
          <div class="grid grid-cols-2 gap-3">
            <select v-model="hour" class="text-input w-full" :class="{ 'text-text-faint': hour === '' }">
              <option value="" disabled>时</option>
              <option v-for="h in 24" :key="h" :value="h - 1">{{ (h - 1).toString().padStart(2, '0') }} 点</option>
            </select>
            <select v-model="minute" class="text-input w-full" :class="{ 'text-text-faint': minute === '' }">
              <option value="" disabled>分</option>
              <option v-for="m in 60" :key="m" :value="m - 1">{{ (m - 1).toString().padStart(2, '0') }} 分</option>
            </select>
          </div>
          <label class="inline-flex items-center gap-2 mt-4 cursor-pointer group">
            <input type="checkbox" v-model="unknownTime" class="w-4 h-4 rounded-sm border-border-subtle bg-canvas-card accent-gold">
            <span class="text-caption text-text-muted group-hover:text-text-body transition-colors">不知道出生时间</span>
          </label>
        </div>

        <div class="animate-reveal stagger-3">
          <label class="block text-caption text-text-muted tracking-widest mb-4">性别</label>
          <div class="grid grid-cols-2 gap-3">
            <button @click="gender = 'male'"
              class="py-4 text-center border transition-all duration-300 text-body"
              :class="gender === 'male' ? 'border-gold bg-gold/10 text-gold' : 'border-border-subtle text-text-muted hover:border-border-subtle'"
            >
              男生
            </button>
            <button @click="gender = 'female'"
              class="py-4 text-center border transition-all duration-300 text-body"
              :class="gender === 'female' ? 'border-gold bg-gold/10 text-gold' : 'border-border-subtle text-text-muted hover:border-border-subtle'"
            >
              女生
            </button>
          </div>
        </div>

        <div class="animate-reveal stagger-4 pt-4">
          <button @click="submitInfo"
            class="btn-primary w-full"
            :disabled="!isValid"
            :class="{ 'opacity-30 pointer-events-none': !isValid }"
          >
            开始测试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const year = ref('')
const month = ref('')
const day = ref('')
const hour = ref('')
const minute = ref('')
const unknownTime = ref(false)
const gender = ref<string>('')

const yearNow = new Date().getFullYear()
const years = Array.from({ length: 80 }, (_, i) => yearNow - i)

const daysInMonth = computed(() => {
  if (!year.value || !month.value) return 31
  const m = parseInt(month.value)
  const y = parseInt(year.value)
  if (m === 2) return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28
  return [4, 6, 9, 11].includes(m) ? 30 : 31
})

const dateError = computed(() => {
  if (year.value && month.value && day.value) {
    const d = parseInt(day.value)
    if (d > daysInMonth.value) return `该月只有 ${daysInMonth.value} 天`
  }
  return ''
})

const isValid = computed(() => {
  return year.value && month.value && day.value && gender.value && !dateError.value
})

function submitInfo() {
  if (!isValid.value) return
  const m = String(month.value).padStart(2, '0')
  const d = String(day.value).padStart(2, '0')
  const h = String(hour.value).padStart(2, '0')
  const min = String(minute.value).padStart(2, '0')
  const userInfo = {
    birthDate: `${year.value}-${m}-${d}`,
    birthTime: unknownTime.value ? '' : `${h}:${min}`,
    gender: gender.value,
  }
  sessionStorage.setItem('cityfit', JSON.stringify({ userInfo }))
  router.push('/quiz')
}
</script>