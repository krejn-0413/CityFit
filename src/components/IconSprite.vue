<template>
  <svg
    :viewBox="iconData?.viewBox || '0 0 24 24'"
    :class="className"
    class="inline-block align-text-bottom shrink-0"
    :style="{ width: size + 'px', height: size + 'px' }"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path :d="iconData?.svgPath || ''" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ICON_PATHS } from '../data/icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    className?: string
  }>(),
  { size: 24 }
)

const iconData = computed(() => ICON_PATHS[props.name])
</script>
