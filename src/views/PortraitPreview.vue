<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-white mb-2">🎨 AI 城市人格插画集</h1>
        <p class="text-gray-400">共 {{ totalCities }} 城 × 1 人格 = {{ totalPortraits }} 幅 AI 插画</p>
        <p class="text-xs text-gray-500 mt-1">预生成静态画像 · 每幅画融合城市地标 + 人格特征</p>
      </div>

      <div v-for="city in cities" :key="city.id" class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl">{{ city.emoji }}</span>
          <div>
            <h2 class="text-2xl font-bold text-white">{{ city.name }}</h2>
            <p class="text-gray-500 text-sm">{{ city.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div v-for="personality in getPersonalities(city.id)" :key="personality.tag"
            class="bg-white/5 backdrop-blur-sm rounded-3xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div class="w-full aspect-square mb-4 rounded-2xl overflow-hidden shadow-lg"
              :style="{ boxShadow: '0 0 30px ' + personality.color + '20' }"
            >
              <CityPersonaImage
                :asset-src="`/assets/personas/${city.id}.png`"
                :city-name="city.name"
                :color="personality.color"
                :tag="personality.tag"
                :emoji="personality.emoji"
              />
            </div>
            <div class="text-center">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full mb-2">
                <span class="text-white font-semibold text-sm">{{ personality.tag }}</span>
              </div>
              <p class="text-gray-400 text-xs leading-relaxed">{{ personality.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CityPersonaImage from '../components/CityPersonaImage.vue'
import { cities, cityPersonalities } from '../data/cities'
import type { CityPersonality } from '../types'

const totalCities = computed(() => cities.length)
const totalPortraits = computed(() => Object.values(cityPersonalities).flat().length)

function getPersonalities(cityId: string): CityPersonality[] {
  return cityPersonalities[cityId] || []
}
</script>
