<template>
  <div class="constellation-layer" aria-hidden="true">
    <svg class="constellation-svg" ref="svgRef" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <TransitionGroup name="conn">
        <line
          v-for="conn in connections"
          :key="conn.key"
          :x1="conn.x1 + '%'"
          :y1="conn.y1 + '%'"
          :x2="conn.x2 + '%'"
          :y2="conn.y2 + '%'"
          stroke="rgba(240,185,11,0.15)"
          stroke-width="0.25"
        />
      </TransitionGroup>
      <circle
        v-for="p in particles"
        :key="p.id"
        :cx="p.x + '%'"
        :cy="p.y + '%'"
        :r="p.r"
        :fill="p.fill"
        :opacity="p.opacity"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  id: number
  x: number
  y: number
  r: number
  vx: number
  vy: number
  fill: string
  opacity: number
  life: number
}

const svgRef = ref<SVGSVGElement>()
const particles = ref<Particle[]>([])
const connections = ref<{ key: string; x1: number; y1: number; x2: number; y2: number }[]>([])
let animFrame = 0
let connTick = 0 // throttle connection recalculation

function createParticle(): Particle {
  return {
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 0.25 + Math.random() * 0.4,
    vx: (Math.random() - 0.5) * 0.012,
    vy: (Math.random() - 0.5) * 0.012,
    fill: `rgba(240,185,11,${0.12 + Math.random() * 0.22})`,
    opacity: 0.18 + Math.random() * 0.28,
    life: Math.random() * 6000,
  }
}

function tick() {
  while (particles.value.length < 14) particles.value.push(createParticle())
  while (particles.value.length > 16) particles.value.pop()

  for (const p of particles.value) {
    p.x += p.vx
    p.y += p.vy
    p.life -= 16
    if (p.x < -5) p.x = 105
    if (p.x > 105) p.x = -5
    if (p.y < -5) p.y = 105
    if (p.y > 105) p.y = -5
    p.opacity = 0.06 + 0.22 * Math.abs(Math.sin(p.life / 3000))
  }

  particles.value = particles.value.filter((p) => p.life > 0)

  // Only update connections every 3 frames (1/3 speed)
  connTick++
  if (connTick >= 3) {
    connTick = 0
    const conns: typeof connections.value = []
    for (let i = 0; i < particles.value.length; i++) {
      for (let j = i + 1; j < particles.value.length; j++) {
        const dx = particles.value[i].x - particles.value[j].x
        const dy = particles.value[i].y - particles.value[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 25) {
          conns.push({
            key: `${i}-${j}-${Date.now()}`,
            x1: particles.value[i].x,
            y1: particles.value[i].y,
            x2: particles.value[j].x,
            y2: particles.value[j].y,
          })
        }
      }
    }
    connections.value = conns
  }

  animFrame = requestAnimationFrame(tick)
}

onMounted(() => {
  animFrame = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  particles.value = []
})
</script>

<style scoped>
.constellation-layer {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.constellation-svg {
  width: 100%;
  height: 100%;
}

/* ── Connection fade-in/fade-out transitions ── */
.conn-enter-active {
  transition: opacity 0.8s ease-out;
}
.conn-enter-from {
  opacity: 0;
}
.conn-leave-active {
  transition: opacity 0.6s ease-in;
}
.conn-leave-to {
  opacity: 0;
}
</style>
