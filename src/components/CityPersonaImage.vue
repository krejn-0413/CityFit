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
        <IconSprite :name="emoji" size="36" />
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
import IconSprite from './IconSprite.vue'

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
  overflow: hidden;
  background: #16161a;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.persona-frame:hover {
  transform: translateY(-2px);
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
  background: linear-gradient(135deg, #16161a, #111114);
  gap: 8px;
}

.fallback-emoji {
  font-size: 3rem;
  line-height: 1;
}

.fallback-label {
  font-size: 0.85rem;
  font-weight: 700;
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
  color: #FFFFFF;
  white-space: nowrap;
}

.persona-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1.5px solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
}
</style>