<template>
  <div class="min-h-screen bg-gradient-to-br from-accent-pale via-white to-purple-pale py-8">
    <div class="max-w-lg mx-auto px-4">
      <div class="text-center mb-8 animate-slide-up">
        <h1 class="text-3xl font-display font-bold text-gray-800 mb-2">
          <span class="inline-flex items-center gap-2">📋 基本信息</span>
        </h1>
        <p class="text-sm text-gray-400">先告诉我一些基本信息吧~</p>
      </div>

      <div class="section-block-yellow animate-scale-in space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">🎂 出生日期</label>
          <div class="grid grid-cols-3 gap-3">
            <select v-model="year" class="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary focus:ring-0 text-gray-700 text-sm transition-colors">
              <option value="" disabled>年</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-model="month" class="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-secondary focus:ring-0 text-gray-700 text-sm transition-colors">
              <option value="" disabled>月</option>
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="day" class="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-accent focus:ring-0 text-gray-700 text-sm transition-colors">
              <option value="" disabled>日</option>
              <option v-for="d in daysInMonth" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <p v-if="dateError" class="text-xs text-primary mt-1.5 ml-1">{{ dateError }}</p>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">🕐 出生时间（选填）</label>
          <div class="grid grid-cols-2 gap-3">
            <select v-model="hour"
              class="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary focus:ring-0 text-gray-700 text-sm transition-colors"
              :class="{ 'text-gray-400': hour === '' }"
            >
              <option value="" disabled>时</option>
              <option v-for="h in 24" :key="h" :value="h - 1">{{ (h - 1).toString().padStart(2, '0') }} 点</option>
            </select>
            <select v-model="minute"
              class="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-secondary focus:ring-0 text-gray-700 text-sm transition-colors"
              :class="{ 'text-gray-400': minute === '' }"
            >
              <option value="" disabled>分</option>
              <option v-for="m in 60" :key="m" :value="m - 1">{{ (m - 1).toString().padStart(2, '0') }} 分</option>
            </select>
          </div>
          <label class="inline-flex items-center gap-2 mt-2 cursor-pointer group">
            <input type="checkbox" v-model="unknownTime" class="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary transition-colors">
            <span class="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">❓ 不知道出生时间</span>
          </label>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">👤 性别</label>
          <div class="grid grid-cols-2 gap-3">
            <button @click="gender = 'male'"
              class="py-4 rounded-2xl font-bold text-sm border-2 transition-all duration-300 transform hover:scale-[1.02]"
              :class="gender === 'male' ? 'bg-accent/10 border-accent text-accent shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-accent/30'"
            >
              🧑 男生
            </button>
            <button @click="gender = 'female'"
              class="py-4 rounded-2xl font-bold text-sm border-2 transition-all duration-300 transform hover:scale-[1.02]"
              :class="gender === 'female' ? 'bg-primary/10 border-primary text-primary shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-primary/30'"
            >
              👩 女生
            </button>
          </div>
          <p v-if="genderError" class="text-xs text-primary mt-1.5 ml-1">{{ genderError }}</p>
        </div>

        <button @click="submitInfo"
          class="w-full py-4 bg-gradient-to-r from-accent to-secondary text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
        >
          🚀 开始测试
        </button>
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
    if (d > daysInMonth.value) return `该月只有 ${daysInMonth.value} 天哦~`
  }
  return ''
})

const genderError = computed(() => {
  if (gender.value) return ''
  return ''
})

const isValid = computed(() => {
  return year.value && month.value && day.value && !dateError.value && gender.value
})

function submitInfo() {
  if (!isValid.value) return
  const data = {
    birthDate: { year: parseInt(year.value), month: parseInt(month.value), day: parseInt(day.value) },
    birthTime: unknownTime.value ? null : { hour: hour.value !== '' ? parseInt(hour.value) : 12, minute: minute.value !== '' ? parseInt(minute.value) : 0 },
    gender: gender.value,
  }
  const store = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
  store.userInfo = data
  sessionStorage.setItem('cityfit', JSON.stringify(store))
  router.push('/quiz')
}
</script>
