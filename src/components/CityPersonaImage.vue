<template>
  <div class="city-persona-card">
    <div class="persona-frame">
      <img
        :src="assetSrc"
        :alt="`${cityName} - ${tag}`"
        class="persona-image"
        @error="onError"
      />
      <div v-if="error" class="fallback">
        <span class="fallback-emoji">{{ emoji }}</span>
        <span class="fallback-label" :style="{ color }">{{ tag }}</span>
      </div>
    </div>
    <div class="persona-meta">
      <span class="persona-city">{{ cityName }}</span>
      <span class="persona-tag" :style="{ color, borderColor: color + '40' }">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  assetSrc: string
  cityName: string
  color: string
  tag: string
  emoji: string
}>()

const error = ref(false)

function onError() {
  error.value = true
}
</script>

<style scoped>
.city-persona-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.persona-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #f8f9fa;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.persona-frame:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
}

.persona-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  gap: 8px;
}

.fallback-emoji {
  font-size: 3rem;
  line-height: 1;
}

.fallback-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.persona-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
}

.persona-city {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
}

.persona-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1.5px solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
}
</style>
