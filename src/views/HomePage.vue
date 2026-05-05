<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-pale via-white to-secondary-pale overflow-hidden">
    <!-- Floating decorative emojis -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <span class="absolute text-2xl opacity-20 animate-float" style="top: 10%; left: 5%; animation-delay: 0s">🏙️</span>
      <span class="absolute text-3xl opacity-20 animate-float" style="top: 20%; right: 8%; animation-delay: 0.5s">🌸</span>
      <span class="absolute text-2xl opacity-20 animate-float" style="bottom: 30%; left: 10%; animation-delay: 1s">🌊</span>
      <span class="absolute text-3xl opacity-20 animate-float" style="bottom: 20%; right: 5%; animation-delay: 1.5s">🏔️</span>
      <span class="absolute text-4xl opacity-10 animate-float" style="top: 40%; left: 3%; animation-delay: 2s">🌆</span>
      <span class="absolute text-2xl opacity-20 animate-float" style="top: 60%; right: 12%; animation-delay: 0.8s">🎋</span>
      <span class="absolute text-3xl opacity-10 animate-float" style="top: 5%; left: 50%; animation-delay: 1.2s">🍜</span>
      <span class="absolute text-2xl opacity-15 animate-float" style="bottom: 10%; right: 20%; animation-delay: 1.8s">🏮</span>
    </div>

    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <!-- Logo / Brand -->
      <div class="animate-scale-in text-center mb-6">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary shadow-xl mb-6 transform hover:scale-110 transition-transform duration-500">
          <span class="text-5xl">🏙️</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-display font-bold text-gray-800 mb-2 bg-gradient-to-r from-primary via-accent to-secondary gradient-text">
          CityFit
        </h1>
        <p class="text-lg text-gray-400 font-display tracking-wide">城 宜</p>
      </div>

      <!-- Slogan -->
      <div class="animate-fade-in text-center mb-8" style="animation-delay: 0.3s">
        <p class="text-lg md:text-xl text-gray-500 leading-relaxed max-w-sm">
          每一座城市，都有它的脾气
          <br>每一个灵魂，都有归属之地
        </p>
      </div>

      <!-- Main Action -->
      <div class="animate-slide-up text-center" style="animation-delay: 0.5s">
        <button @click="startTest"
          class="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <span class="relative z-10 flex items-center gap-3">
            <span class="text-2xl">✨</span>
            <span>测一测你的本命城市</span>
            <span class="text-2xl group-hover:animate-wiggle inline-block">🔮</span>
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
        <p class="text-sm text-gray-400 mt-4 animate-fade-in" style="animation-delay: 0.8s">
          💫 仅需 2 分钟 · 发现你的灵魂之城
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-3 gap-3 mt-12 max-w-md w-full animate-slide-up" style="animation-delay: 0.7s">
        <div class="glass-card p-4 text-center transform hover:scale-105 transition-all duration-300">
          <div class="text-2xl mb-2">🧠</div>
          <div class="text-xs text-gray-500 font-bold">AI 人格分析</div>
        </div>
        <div class="glass-card p-4 text-center transform hover:scale-105 transition-all duration-300">
          <div class="text-2xl mb-2">🔮</div>
          <div class="text-xs text-gray-500 font-bold">八字玄学匹配</div>
        </div>
        <div class="glass-card p-4 text-center transform hover:scale-105 transition-all duration-300">
          <div class="text-2xl mb-2">🗺️</div>
          <div class="text-xs text-gray-500 font-bold">中国城市地图</div>
        </div>
      </div>

      <!-- Bottom decorative -->
      <div class="mt-12 text-center animate-fade-in" style="animation-delay: 1s">
        <div class="flex items-center justify-center gap-2 text-sm text-gray-300">
          <span class="deco-dot bg-primary"></span>
          <span class="deco-dot bg-secondary"></span>
          <span class="deco-dot bg-accent"></span>
          <span class="deco-dot bg-light-green"></span>
          <span class="deco-dot bg-bright-yellow"></span>
        </div>
        <p class="text-xs text-gray-200 mt-3">娱乐测评 · 仅供开心</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startTest() {
  router.push('/info')
}
</script>
