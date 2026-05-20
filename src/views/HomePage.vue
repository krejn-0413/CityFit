<template>
  <div class="min-h-screen bg-canvas-base flex flex-col">
    <div class="flex-1 flex flex-col justify-center px-6 md:px-12 max-w-content mx-auto w-full">
      <div class="animate-reveal">
        <div class="gold-line mb-8"></div>
      </div>

      <h1 class="animate-reveal stagger-1 font-display text-hero text-text-primary mb-3">
        CityFit
      </h1>

      <p class="animate-reveal stagger-2 text-caption text-gold-muted tracking-[0.2em] mb-12">
        城 宜
      </p>

      <p class="animate-reveal stagger-3 text-body text-text-body leading-relaxed max-w-sm mb-14">
        每一座城市，都有它的脾气
        <br>每一个灵魂，都有归属之地
      </p>

      <div class="animate-reveal stagger-4 mb-20">
        <button @click="startTest" class="btn-primary">
          测一测你的本命城市
        </button>
      </div>

      <div class="animate-reveal stagger-5 flex gap-8 text-caption text-text-muted tracking-wider">
        <span>AI 人格分析</span>
        <span class="text-text-faint">·</span>
        <span>八字玄学匹配</span>
        <span class="text-text-faint">·</span>
        <span>中国城市地图</span>
      </div>

      <p class="animate-reveal stagger-6 text-fine text-text-faint mt-6 tracking-widest">
        仅需 2 分钟 · 发现你的灵魂之城
      </p>
    </div>

    <footer class="py-10 text-center">
      <p class="text-fine text-text-faint tracking-widest">娱乐测评 · 仅供开心</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startTest() {
  router.push('/info')
}
</script>