<template>
  <div ref="chartRef" class="w-full h-full min-h-[280px]"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  material: number
  spiritual: number
  xuanxue: number
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

function initChart() {
  if (!chartRef.value) return

  if (chart) chart.dispose()
  chart = echarts.init(chartRef.value)

  const option = {
    radar: {
      indicator: [
        { name: '物欲都市 🏙️', max: 100, color: '#FF6B6B' },
        { name: '精神桃源 🌿', max: 100, color: '#4ECDC4' },
        { name: '玄学缘分 🔮', max: 100, color: '#45B7D1' },
      ],
      shape: 'circle',
      center: ['50%', '50%'],
      radius: '65%',
      axisName: {
        color: '#666',
        fontSize: 13,
        fontWeight: 'bold',
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(78, 205, 196, 0.02)', 'rgba(78, 205, 196, 0.05)', 'rgba(78, 205, 196, 0.08)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(78, 205, 196, 0.3)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(78, 205, 196, 0.2)',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [props.material, props.spiritual, props.xuanxue],
            name: '你的城市画像',
            areaStyle: {
              color: 'rgba(255, 107, 107, 0.25)',
            },
            lineStyle: {
              color: '#FF6B6B',
              width: 2,
            },
            itemStyle: {
              color: '#FF6B6B',
            },
          },
        ],
      },
    ],
    backgroundColor: 'transparent',
  }

  chart.setOption(option)
}

onMounted(() => {
  initChart()
})

watch([() => props.material, () => props.spiritual, () => props.xuanxue], () => {
  initChart()
})
</script>
