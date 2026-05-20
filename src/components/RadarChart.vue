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
        { name: '物欲都市', max: 100, color: '#F0B90B' },
        { name: '精神桃源', max: 100, color: '#F0B90B' },
        { name: '玄学缘分', max: 100, color: '#F0B90B' },
      ],
      shape: 'circle',
      center: ['50%', '50%'],
      radius: '65%',
      axisName: {
        color: '#7A756E',
        fontSize: 13,
        fontWeight: 'bold',
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(240,185,11,0.02)', 'rgba(240,185,11,0.04)', 'rgba(240,185,11,0.06)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(240,185,11,0.15)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(240,185,11,0.1)',
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
              color: 'rgba(240,185,11,0.2)',
            },
            lineStyle: {
              color: '#F0B90B',
              width: 2,
            },
            itemStyle: {
              color: '#F0B90B',
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
