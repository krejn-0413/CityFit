<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50">
    <div class="max-w-2xl mx-auto px-4 py-8 space-y-8">

      <div class="text-center animate-slide-up">
        <div class="text-6xl mb-4">🎉</div>
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">
          你的城市人格是...
        </h1>
      </div>

      <div class="section-block-primary text-center animate-scale-in">
        <div class="text-5xl mb-4">{{ personalityEmoji }}</div>
        <h2 class="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary via-primary-light to-accent gradient-text">
          {{ personalityTag }}
        </h2>
      </div>

      <div class="space-y-4 animate-slide-up" style="animation-delay: 0.2s">
        <h3 class="text-xl font-display font-bold text-gray-700 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full inline-block"></span>
          🏆 你的 Top 3 城市
        </h3>
        <div v-for="(r, idx) in topResults" :key="r.city.id"
          class="glass-card-strong p-5 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          :style="{ animationDelay: (0.3 + idx * 0.15) + 's' }"
          @click="showCityDetail(r.city.name, r.matchPercentage)"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0 transform group-hover:scale-110 transition-transform"
              :class="idx === 0 ? 'bg-gradient-to-br from-primary to-primary-light' : idx === 1 ? 'bg-gradient-to-br from-secondary to-secondary-light' : 'bg-gradient-to-br from-accent to-accent-light'"
            >
              {{ idx + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ r.city.emoji }}</span>
                <span class="text-lg font-bold text-gray-800">{{ r.city.name }}</span>
                <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ r.city.province }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span v-for="tag in r.city.tags" :key="tag"
                  class="px-2.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="text-2xl font-bold"
                :class="idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-accent'"
              >
                {{ r.matchPercentage }}%
              </div>
              <div class="text-xs text-gray-400">匹配度</div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-gray-100">
            <p class="text-sm text-gray-500 leading-relaxed">{{ r.reason }}</p>
          </div>
        </div>
      </div>

      <div class="section-block-secondary animate-slide-up" style="animation-delay: 0.5s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">📊 你的城市三维画像</span>
        </h3>
        <div class="h-72">
          <RadarChart :material="radarScores.material" :spiritual="radarScores.spiritual" :xuanxue="radarScores.xuanxue" />
        </div>
        <div class="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
          <div class="bg-primary/10 rounded-2xl p-3 border border-primary/20">
            <div class="text-primary font-bold text-lg">{{ radarScores.material }}%</div>
            <div class="text-gray-500">物欲都市 🏙️</div>
          </div>
          <div class="bg-secondary/10 rounded-2xl p-3 border border-secondary/20">
            <div class="text-secondary font-bold text-lg">{{ radarScores.spiritual }}%</div>
            <div class="text-gray-500">精神桃源 🌿</div>
          </div>
          <div class="bg-accent/10 rounded-2xl p-3 border border-accent/20">
            <div class="text-accent font-bold text-lg">{{ radarScores.xuanxue }}%</div>
            <div class="text-gray-500">玄学缘分 🔮</div>
          </div>
        </div>
      </div>

      <div class="section-block-accent animate-slide-up" style="animation-delay: 0.6s">
        <div ref="mapSectionRef">
          <h3 class="text-lg font-display font-bold text-gray-700 mb-1 text-center">
            <span class="inline-flex items-center gap-2">🗺️ 中国地图 · 你的城市坐标</span>
          </h3>
          <p class="text-xs text-gray-400 text-center mb-4">点击气泡查看详情</p>
          <div class="h-[450px] w-full">
            <ChinaMap :top-results="topResults" :friend-recommendations="friendRecommendations" />
          </div>
        </div>

        <div class="mt-4 text-center">
          <button @click="inviteFriend"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            💌 邀请朋友一起测
          </button>
        </div>
      </div>

      <div class="section-block-yellow animate-slide-up" style="animation-delay: 0.7s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">📖 详细解读</span>
        </h3>
        <div class="space-y-4 text-sm text-gray-600 leading-relaxed">
          <div class="bg-white/60 rounded-2xl p-4 border border-white">
            <p>{{ interpretation1 }}</p>
          </div>
          <div class="bg-white/60 rounded-2xl p-4 border border-white">
            <p>{{ interpretation2 }}</p>
          </div>
          <div class="bg-white/60 rounded-2xl p-4 border border-white">
            <p>{{ interpretation3 }}</p>
          </div>
        </div>
      </div>

      <div v-if="enhancedBazi" class="section-block-purple animate-slide-up" style="animation-delay: 0.8s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">🔮 八字玄学深度分析</span>
        </h3>

        <div class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-3 text-center">四柱八字</h4>
          <div class="flex justify-center gap-3 mb-4">
            <div v-for="(stem, i) in enhancedBazi.heavenlyStems" :key="i"
              class="flex flex-col items-center"
            >
              <div class="text-xs text-gray-400 mb-1">{{ ['年', '月', '日', '时'][i] }}柱</div>
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md"
                :style="{ backgroundColor: getWuxingColor(enhancedBazi.fiveElements[i]) + '20', color: getWuxingColor(enhancedBazi.fiveElements[i]), border: '2px solid ' + getWuxingColor(enhancedBazi.fiveElements[i]) + '40' }"
              >
                {{ stem }}
              </div>
              <div class="w-14 h-10 rounded-xl flex items-center justify-center text-base font-bold text-gray-500 bg-gray-50 mt-1 border border-gray-100"
              >
                {{ enhancedBazi.earthlyBranches[i] }}
              </div>
              <div class="text-xs mt-1 font-medium" :style="{ color: getWuxingColor(enhancedBazi.fiveElements[i]) }">
                {{ enhancedBazi.fiveElements[i] }}{{ getWuxingEmoji(enhancedBazi.fiveElements[i]) }}
              </div>
            </div>
          </div>
          <div class="space-y-2 text-xs text-gray-500">
            <p v-for="(interp, i) in enhancedBazi.pillarInterpretations" :key="i">
              {{ interp }}
            </p>
          </div>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-3 text-center">五行分布</h4>
          <div class="space-y-2.5">
            <div v-for="(count, elem) in enhancedBazi.elementDistribution" :key="elem"
              class="flex items-center gap-3"
            >
              <span class="w-6 text-center text-sm">{{ getWuxingEmoji(elem) }}</span>
              <span class="w-6 text-sm font-medium" :style="{ color: getWuxingColor(elem) }">{{ elem }}</span>
              <div class="score-bar flex-1">
                <div class="score-bar-fill" :style="{ width: (count / 4 * 100) + '%', backgroundColor: getWuxingColor(elem) }"></div>
              </div>
              <span class="w-5 text-right text-xs text-gray-400">{{ count }}</span>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>五行均衡度</span>
            <div class="score-bar w-24">
              <div class="score-bar-fill bg-gradient-to-r from-primary via-secondary to-accent" :style="{ width: enhancedBazi.wuxingBalanceScore + '%' }"></div>
            </div>
            <span class="font-medium" :style="{ color: enhancedBazi.wuxingBalanceScore > 60 ? '#4ECDC4' : '#FF6B6B' }">{{ enhancedBazi.wuxingBalanceScore }}%</span>
          </div>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-2 text-center">日主分析 · {{ enhancedBazi.dayMaster }}{{ getWuxingEmoji(enhancedBazi.dayMaster) }}</h4>
          <p class="text-xs text-gray-600 leading-relaxed">{{ enhancedBazi.dayMasterPersonality }}</p>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-white/70 rounded-2xl p-4 border border-green-200/50">
            <div class="text-xs text-gray-400 mb-1">✨ 喜用神</div>
            <div class="flex gap-1.5">
              <span v-for="l in enhancedBazi.likes" :key="l"
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :style="{ backgroundColor: getWuxingColor(l) + '20', color: getWuxingColor(l) }"
              >
                {{ l }}{{ getWuxingEmoji(l) }}
              </span>
            </div>
            <div class="text-xs text-gray-500 mt-2">适合选择喜用神元素匹配的城市</div>
          </div>
          <div class="bg-white/70 rounded-2xl p-4 border border-red-200/50">
            <div class="text-xs text-gray-400 mb-1">⚠️ 忌神</div>
            <div class="flex gap-1.5">
              <span v-for="d in enhancedBazi.dislikes" :key="d"
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :style="{ backgroundColor: getWuxingColor(d) + '15', color: getWuxingColor(d) }"
              >
                {{ d }}{{ getWuxingEmoji(d) }}
              </span>
            </div>
            <div class="text-xs text-gray-500 mt-2">尽量避免忌神元素过旺的城市</div>
          </div>
        </div>

        <div v-if="enhancedBazi.wuxingRelation.shengCycles.length > 0 || enhancedBazi.wuxingRelation.keCycles.length > 0" class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-2 text-center">五行生克关系</h4>
          <div class="flex flex-wrap gap-2 justify-center">
            <span v-for="s in enhancedBazi.wuxingRelation.shengCycles" :key="s"
              class="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200"
            >
              {{ s }} 🌱
            </span>
            <span v-for="k in enhancedBazi.wuxingRelation.keCycles" :key="k"
              class="px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-500 border border-red-200"
            >
              {{ k }} ⚡
            </span>
          </div>
          <p class="text-xs text-center text-gray-500 mt-3">{{ enhancedBazi.wuxingRelation.summary }}</p>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white">
          <h4 class="text-sm font-bold text-gray-600 mb-2 text-center">💕 夫妻宫 · {{ enhancedBazi.earthlyBranches[2] }}</h4>
          <p class="text-xs text-gray-500 mb-1">{{ enhancedBazi.detailedCouplePalace.summary }}</p>
          <p class="text-xs text-gray-600 leading-relaxed">{{ enhancedBazi.detailedCouplePalace.detailed }}</p>
        </div>
      </div>

      <div class="section-block-green animate-slide-up" style="animation-delay: 0.9s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">📊 全城市对比总表</span>
        </h3>
        <p class="text-xs text-gray-400 text-center mb-4">16 个城市 · 多维度评分 · 一目了然</p>

        <div class="overflow-x-auto -mx-4 px-4">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-gray-500">
                <th class="text-left py-2 pr-2 font-medium sticky left-0 bg-[#F0F9F4] z-10">#</th>
                <th class="text-left py-2 px-2 font-medium sticky left-0 bg-[#F0F9F4] z-10 min-w-[80px]">城市</th>
                <th class="text-center py-2 px-2 font-medium">匹配</th>
                <th class="text-center py-2 px-2 font-medium text-primary">🏙️</th>
                <th class="text-center py-2 px-2 font-medium text-secondary">🌿</th>
                <th class="text-center py-2 px-2 font-medium text-accent">🔮</th>
                <th class="text-center py-2 px-2 font-medium">八字</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in cityComparisonData" :key="item.city.id"
                class="border-t border-gray-100 transition-colors hover:bg-white/60"
                :class="{ 'bg-primary/5': idx < 3, 'bg-white/40': idx >= 3 }"
              >
                <td class="py-2.5 pr-2 sticky left-0 z-10" :class="idx < 3 ? 'bg-primary/5' : 'bg-white/40'">
                  <span class="w-5 h-5 rounded-full inline-flex items-center justify-center text-white text-[10px] font-bold"
                    :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-accent' : 'bg-gray-200 text-gray-500'"
                  >{{ idx + 1 }}</span>
                </td>
                <td class="py-2.5 px-2 sticky left-0 z-10 font-medium" :class="idx < 3 ? 'bg-primary/5' : 'bg-white/40'">
                  <span class="text-sm">{{ item.city.emoji }}</span>
                  <span class="ml-1 text-gray-800">{{ item.city.name }}</span>
                </td>
                <td class="text-center py-2.5 px-2">
                  <span class="font-bold" :style="{ color: item.matchPercentage > 80 ? '#FF6B6B' : item.matchPercentage > 60 ? '#4ECDC4' : '#9CA3AF' }">
                    {{ item.matchPercentage }}%
                  </span>
                </td>
                <td class="text-center py-2.5 px-2">
                  <div class="flex items-center justify-center gap-1">
                    <div class="score-bar w-12">
                      <div class="score-bar-fill bg-primary" :style="{ width: item.city.material + '%' }"></div>
                    </div>
                    <span class="text-[10px] text-gray-400 w-5">{{ item.city.material }}</span>
                  </div>
                </td>
                <td class="text-center py-2.5 px-2">
                  <div class="flex items-center justify-center gap-1">
                    <div class="score-bar w-12">
                      <div class="score-bar-fill bg-secondary" :style="{ width: item.city.spiritual + '%' }"></div>
                    </div>
                    <span class="text-[10px] text-gray-400 w-5">{{ item.city.spiritual }}</span>
                  </div>
                </td>
                <td class="text-center py-2.5 px-2">
                  <div class="flex items-center justify-center gap-1">
                    <div class="score-bar w-12">
                      <div class="score-bar-fill bg-accent" :style="{ width: item.city.xuanxue + '%' }"></div>
                    </div>
                    <span class="text-[10px] text-gray-400 w-5">{{ item.city.xuanxue }}</span>
                  </div>
                </td>
                <td class="text-center py-2.5 px-2">
                  <div class="flex gap-0.5 justify-center">
                    <span v-for="elem in item.city.baziPreference" :key="elem"
                      class="w-3.5 h-3.5 rounded inline-block"
                      :style="{ backgroundColor: getWuxingColor(elem) }"
                      :title="elem"
                    ></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-400">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-primary"></span> 物欲</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-secondary"></span> 精神</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-accent"></span> 玄学</span>
          <span class="flex items-center gap-1"><span class="text-xs">●</span> 八字偏好</span>
        </div>
      </div>

      <div class="flex flex-col gap-3 animate-fade-in" style="animation-delay: 1s">
        <button @click="shareResult"
          class="w-full py-4 bg-gradient-to-r from-bright-yellow to-[#FFE066] text-gray-800 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
        >
          📸 一键生成分享图
        </button>

        <div class="grid grid-cols-2 gap-3">
          <button @click="compareCities"
            class="py-3 glass-card-strong text-gray-600 font-bold rounded-2xl hover:border-secondary hover:text-secondary transition-all duration-300 border-2 border-transparent"
          >
            🔄 城市对比
          </button>
          <button @click="retakeTest"
            class="py-3 glass-card-strong text-gray-600 font-bold rounded-2xl hover:border-primary hover:text-primary transition-all duration-300 border-2 border-transparent"
          >
            🔁 重新测试
          </button>
        </div>
      </div>

      <div class="text-center text-xs text-gray-300 py-4">
        © 2024 CityFit · 仅供娱乐 · 开心就好 😊
      </div>
    </div>

    <ShareCard ref="shareCardRef"
      v-if="showShareCard"
      :personality-tag="personalityTag"
      :personality-emoji="personalityEmoji"
      :top-results="topResults"
      class="fixed"
      style="left: -9999px; top: 0;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'
import RadarChart from '../components/RadarChart.vue'
import ChinaMap from '../components/ChinaMap.vue'
import ShareCard from '../components/ShareCard.vue'
import { getEnhancedBaziInfo, WUXING_COLORS, WUXING_EMOJI } from '../composables/useBazi'
import { cities } from '../data/cities'
import type { CityResult, FriendRecommendation, BaziInfo } from '../types'

const router = useRouter()
const showShareCard = ref(false)
const shareCardRef = ref<InstanceType<typeof ShareCard>>()

const store = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
const results = store.results
const baziInfo = results?.baziInfo as BaziInfo | null

const topResults = ref<CityResult[]>(results?.topResults || [])
const personalityTag = ref(results?.personalityTag || '城市探索家')
const allScores = ref<Record<string, number>>(results?.allScores || {})

const enhancedBazi = computed(() => {
  if (!baziInfo) return null
  return getEnhancedBaziInfo(baziInfo)
})

const personalityEmoji = computed(() => {
  const tag = personalityTag.value
  const emojiMap: Record<string, string> = {
    '温暖奶茶社牛': '🧋',
    '佛系养生达人': '🧘',
    '精致都市丽人': '💅',
    '野心勃勃打工人': '💼',
    '文艺慢生活家': '🎨',
    '火辣热情山城人': '🌶️',
    '古风达人': '🎭',
  }
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (tag.includes(key)) return emoji
  }
  return '🏙️'
})

const radarScores = computed(() => {
  if (topResults.value.length > 0) {
    const top = topResults.value[0].city
    return {
      material: top.material,
      spiritual: top.spiritual,
      xuanxue: top.xuanxue,
    }
  }
  return { material: 50, spiritual: 50, xuanxue: 50 }
})

const cityComparisonData = computed(() => {
  return cities
    .map(city => ({
      city,
      matchPercentage: allScores.value[city.id] || 0,
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
})

const interpretation1 = computed(() => {
  const city = topResults.value[0]?.city
  if (!city) return ''
  const dayMasterText = enhancedBazi.value ? `你的日主为${enhancedBazi.value.dayMaster}${WUXING_EMOJI[enhancedBazi.value.dayMaster]}，${enhancedBazi.value.dayMaster.split('')[0]}性人格让你与${city.name}的气质形成奇妙共振。` : ''
  return `你的灵魂城市是 ${city.emoji} ${city.name}！${dayMasterText}这座城市的气质与你的性格高度契合——${city.description} 在这里，你能够找到属于自己的节奏和生活方式的完美平衡。${city.tags.slice(0, 3).join('、')}，每一个标签都像是在描述你理想中的生活状态。`
})

const interpretation2 = computed(() => {
  const top3 = topResults.value.slice(0, 3).map(r => `${r.city.emoji} ${r.city.name}`).join('、')
  const first = topResults.value[0]
  const second = topResults.value[1]
  const third = topResults.value[2]

  let detail = ''
  if (first && second && third) {
    detail = `${first.city.name}（${first.matchPercentage}%）代表了你内心最真实的渴望和价值观；${second.city.name}（${second.matchPercentage}%）则揭示了你性格中另一面的潜能；而${third.city.name}（${third.matchPercentage}%）则可能是你未曾发现的惊喜选项。`
  }

  return `你的 Top 3 城市 ${top3} 构成了你的城市人格三角。${detail}三座城市从不同维度勾勒出了你完整的生活偏好图谱，值得一一去探索和体验！`
})

const interpretation3 = computed(() => {
  const city = topResults.value[0]?.city
  if (!city) return ''
  const likesText = enhancedBazi.value ? `从八字来看，你的喜用神为${enhancedBazi.value.likes.join('、')}，` : ''
  return `最适合你的城市类型是 ${city.tags.slice(0, 3).join('、')} 风格。${likesText}${city.name} 的五行属性与你的八字形成了良好的呼应。建议你在选择居住或旅行目的地时，多关注这些与你灵魂契合的特质。记住，城市就像恋人一样，合适比优秀更重要！💕`
})

const friendRecommendations = ref<FriendRecommendation[]>([
  { name: '小明', cityName: '成都', avatar: '😎', color: '#FF6B6B' },
  { name: '小红', cityName: '大理', avatar: '🌸', color: '#4ECDC4' },
  { name: '阿杰', cityName: '上海', avatar: '🕶️', color: '#45B7D1' },
  { name: '玲玲', cityName: '杭州', avatar: '👩‍💻', color: '#FFD93D' },
])

function getWuxingColor(wuxing: string): string {
  return WUXING_COLORS[wuxing] || '#9CA3AF'
}

function getWuxingEmoji(wuxing: string): string {
  return WUXING_EMOJI[wuxing] || '✨'
}

function showCityDetail(name: string, match: number) {
  alert(`📍 ${name}\n匹配度: ${match}%\n\n${topResults.value.find(r => r.city.name === name)?.reason}`)
}

function inviteFriend() {
  const shareUrl = window.location.origin
  if (navigator.share) {
    navigator.share({
      title: 'CityFit 城宜 - 找到你的灵魂城市',
      text: `我在 CityFit 测出了我的本命城市是 ${topResults.value[0]?.city.name}！快来测测你的～`,
      url: shareUrl,
    }).catch(() => {})
  } else {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('📋 链接已复制！分享给朋友一起测吧～')
    }).catch(() => {
      prompt('复制链接分享给朋友：', shareUrl)
    })
  }
}

async function shareResult() {
  showShareCard.value = true
  await new Promise((r) => setTimeout(r, 100))

  if (shareCardRef.value?.shareRef) {
    try {
      const canvas = await html2canvas(shareCardRef.value.shareRef, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })
      const link = document.createElement('a')
      link.download = 'CityFit-我的城市人格.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch {
      alert('生成分享图失败，请手动截图 😅')
    }
  }

  showShareCard.value = false
}

function compareCities() {
  const cityNames = topResults.value.slice(0, 3).map(r => r.city.name).join('、')
  alert(`🔄 城市对比功能\n\n你的 Top 3 城市：${cityNames}\n\n详细对比数据已在上方「全城市对比总表」中展示，请滚动查看~`)
}

function retakeTest() {
  sessionStorage.removeItem('cityfit')
  router.push('/')
}

onMounted(() => {
  if (!results) {
    router.push('/')
  }
})
</script>
