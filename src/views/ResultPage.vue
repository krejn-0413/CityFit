<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50">
    <div class="max-w-2xl mx-auto px-4 py-8 space-y-8">

      <div v-if="sharedFromFriend" class="animate-slide-up bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-200 shadow-sm">
        <div class="flex items-center gap-3">
          <span class="text-3xl">👋</span>
          <div>
            <p class="text-sm font-bold text-gray-700">
              {{ sharedFromFriend.private ? '一位匿名好友' : sharedFromFriend.name }} 分享了TA的城市测评
            </p>
            <p class="text-xs text-gray-500">以下地图中彩色气泡为好友的推荐城市，你也可以测测自己的！</p>
          </div>
        </div>
      </div>

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

      <div class="section-block-secondary animate-slide-up" style="animation-delay: 0.15s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">🎨 AI 城市人格画像</span>
        </h3>
        <div v-if="personalityProfile" class="flex flex-col items-center">
          <div class="w-48 h-48 mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-white/60"
            :style="{ boxShadow: '0 0 30px ' + personalityProfile.color + '30' }"
          >
            <CityPersonaImage
              :asset-src="personalityAssetSrc"
              :city-name="topResults[0]?.city.name || ''"
              :color="personalityProfile.color"
              :tag="personalityProfile.tag"
              :emoji="personalityProfile.emoji"
            />
          </div>
          <div class="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 mb-2">
            <span class="text-lg font-bold text-gray-700">{{ personalityProfile.tag }}</span>
            <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">城市人格</span>
          </div>
          <p class="text-sm text-gray-500 text-center max-w-md">{{ personalityProfile.description }}</p>
          <div class="mt-3 text-xs text-gray-400 text-center">
            你的性格气质与{{ topResults[0]?.city.name }}完美共振
          </div>
        </div>
      </div>

      <div class="space-y-4 animate-slide-up" style="animation-delay: 0.2s">
        <h3 class="text-xl font-display font-bold text-gray-700 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full inline-block"></span>
          🏆 你的 Top 3 城市
        </h3>
        <div v-for="(r, idx) in topResults" :key="r.city.id"
          class="glass-card-strong p-5 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          :style="{ animationDelay: (0.3 + idx * 0.15) + 's' }"
          @click="showCityDetail(r.city)"
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

      <div class="section-block-accent animate-slide-up" style="animation-delay: 0.4s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-1 text-center">
          <span class="inline-flex items-center gap-2">🗺️ 点亮中国地图</span>
        </h3>
        <p class="text-xs text-gray-400 text-center mb-4">
          你和好友的 Top 城市将在这里点亮！分享链接互相看到对方的地图
        </p>

        <div class="flex items-stretch justify-center gap-3 mb-4">
          <div v-for="(r, idx) in topResults" :key="r.city.id"
            class="flex-1 max-w-[110px] flex flex-col items-center gap-1.5 bg-white/70 rounded-2xl px-2.5 py-3 shadow-sm border relative overflow-hidden"
            :class="idx === 0 ? 'border-primary/40' : idx === 1 ? 'border-secondary/40' : 'border-accent/40'"
          >
            <div class="absolute top-0 left-0 right-0 h-1"
              :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-accent'"
            ></div>
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
              :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-accent'"
            >
              {{ '🏆🥈🥉'[idx] }}
            </div>
            <span class="text-lg">{{ r.city.emoji }}</span>
            <span class="text-sm font-bold text-gray-700">{{ r.city.name }}</span>
            <span class="text-xs font-bold"
              :class="idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-accent'"
            >{{ r.matchPercentage }}%</span>
            <div class="w-full bg-gray-100 rounded-full h-1.5 mt-0.5 overflow-hidden">
              <div class="h-full rounded-full transition-all duration-1000"
                :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-accent'"
                :style="{ width: r.matchPercentage + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="h-[420px] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
          <ChinaMap
            :top-cities="mapTopCities"
            :merged-points="mapMergedPoints"
            :team-id="teamId"
            :show-team-label="true"
            @city-click="showCityDetail"
          />
        </div>

        <div class="mt-4 space-y-3">
          <div class="bg-white/60 rounded-2xl p-4 border border-white">
            <h4 class="text-sm font-bold text-gray-600 mb-3 text-center">👥 小队系统 · 组队点亮地图</h4>

            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                🏳️ 小队 <span class="font-bold text-gray-800">{{ teamId }}</span>
              </span>
              <span class="text-xs text-gray-400">· {{ teamMembers.length + 1 }} 人</span>
            </div>

            <div class="flex gap-2 mb-4">
              <button @click="copyTeamLink"
                class="flex-1 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all"
                :class="copyStatus === 'copied' ? 'bg-green-500 text-white' : copyStatus === 'error' ? 'bg-red-400 text-white' : 'bg-gradient-to-r from-secondary to-accent text-white'"
              >
                {{ copyStatus === 'copied' ? '✅ 已复制到剪贴板！' : copyStatus === 'error' ? '❌ 复制失败' : '🔗 复制小队链接' }}
              </button>
              <button @click="showJoinInput = !showJoinInput"
                class="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-600 text-sm font-bold rounded-2xl hover:border-secondary hover:text-secondary transition-all"
              >
                ➕ 加入小队
              </button>
            </div>

            <div v-if="showJoinInput" class="mb-4 p-3 bg-gray-50 rounded-2xl">
              <p class="text-xs text-gray-500 mb-2">输入对方的小队码，加入后你们的地图会合并显示：</p>
              <div class="flex gap-2">
                <input v-model="joinTeamCode" type="text" placeholder="输入小队码"
                  class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-secondary transition-all text-center"
                  maxlength="6"
                />
                <button @click="joinTeam"
                  class="px-5 py-2 bg-secondary text-white text-sm font-bold rounded-xl hover:shadow-md transition-all"
                >
                  加入
                </button>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 mb-3 pt-3 border-t border-gray-200/60">
              <span class="text-sm text-gray-500">匿名</span>
              <button @click="privateMode = !privateMode"
                class="relative w-12 h-6 rounded-full transition-colors duration-300"
                :class="privateMode ? 'bg-gray-300' : 'bg-secondary'"
              >
                <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300"
                  :class="privateMode ? 'translate-x-0' : 'translate-x-6'"
                ></span>
              </button>
              <span class="text-sm text-gray-500">昵称</span>
            </div>
            <div v-if="!privateMode" class="mb-3">
              <input v-model="shareName" type="text" placeholder="输入你的昵称（可选）"
                class="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-center"
                maxlength="10"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="section-block-yellow animate-slide-up" style="animation-delay: 0.5s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">📊 三维城市画像 · 专业解读</span>
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

        <div class="mt-4 space-y-3">
          <div class="bg-white/70 rounded-2xl p-4 border border-primary/20">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">🏙️</span>
              <span class="text-sm font-bold text-gray-700">物质维度</span>
              <span class="ml-auto text-primary font-bold text-sm">{{ radarScores.material }}%</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">{{ materialInterpretation }}</p>
          </div>
          <div class="bg-white/70 rounded-2xl p-4 border border-secondary/20">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">🌿</span>
              <span class="text-sm font-bold text-gray-700">精神维度</span>
              <span class="ml-auto text-secondary font-bold text-sm">{{ radarScores.spiritual }}%</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">{{ spiritualInterpretation }}</p>
          </div>
          <div class="bg-white/70 rounded-2xl p-4 border border-accent/20">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">🔮</span>
              <span class="text-sm font-bold text-gray-700">玄学维度</span>
              <span class="ml-auto text-accent font-bold text-sm">{{ radarScores.xuanxue }}%</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">{{ xuanxueInterpretation }}</p>
          </div>
        </div>
      </div>

      <div v-if="enhancedBazi" class="section-block-purple animate-slide-up" style="animation-delay: 0.6s">
        <h3 class="text-lg font-display font-bold text-gray-700 mb-4 text-center">
          <span class="inline-flex items-center gap-2">🔮 八字玄学 · 日主与城市深度分析</span>
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
              <div class="w-14 h-10 rounded-xl flex items-center justify-center text-base font-bold text-gray-500 bg-gray-50 mt-1 border border-gray-100">
                {{ enhancedBazi.earthlyBranches[i] }}
              </div>
              <div class="text-xs mt-1 font-medium" :style="{ color: getWuxingColor(enhancedBazi.fiveElements[i]) }">
                {{ enhancedBazi.fiveElements[i] }}{{ getWuxingEmoji(enhancedBazi.fiveElements[i]) }}
              </div>
            </div>
          </div>
          <div class="space-y-2 text-xs text-gray-500">
            <p v-for="(interp, i) in enhancedBazi.pillarInterpretations" :key="i">{{ interp }}</p>
          </div>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-3 text-center">五行分布</h4>
          <div class="space-y-2.5">
            <div v-for="(count, elem) in enhancedBazi.elementDistribution" :key="elem" class="flex items-center gap-3">
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
          <h4 class="text-sm font-bold text-gray-600 mb-2 text-center">
            日主分析 · {{ enhancedBazi.dayMaster }}{{ getWuxingEmoji(enhancedBazi.dayMaster) }}
            <span class="text-xs text-gray-400 font-normal">（与城市选择的关系）</span>
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed mb-3">{{ enhancedBazi.dayMasterPersonality }}</p>

          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200/60">
            <p class="text-xs text-gray-600 leading-relaxed">{{ dayMasterCityAnalysis }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-white/70 rounded-2xl p-4 border border-green-200/50">
            <div class="text-xs text-gray-400 mb-1">✨ 喜用神</div>
            <div class="flex gap-1.5">
              <span v-for="l in enhancedBazi.likes" :key="l"
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :style="{ backgroundColor: getWuxingColor(l) + '20', color: getWuxingColor(l) }"
              >{{ l }}{{ getWuxingEmoji(l) }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-2">你的 Top 1 城市「{{ topResults[0]?.city.name }}」{{ cityWuxingMatchText }}</div>
          </div>
          <div class="bg-white/70 rounded-2xl p-4 border border-red-200/50">
            <div class="text-xs text-gray-400 mb-1">⚠️ 忌神</div>
            <div class="flex gap-1.5">
              <span v-for="d in enhancedBazi.dislikes" :key="d"
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :style="{ backgroundColor: getWuxingColor(d) + '15', color: getWuxingColor(d) }"
              >{{ d }}{{ getWuxingEmoji(d) }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-2">需谨慎选择忌神元素过旺的城市</div>
          </div>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white mb-4">
          <h4 class="text-sm font-bold text-gray-600 mb-3 text-center">五行生克制化 · 与城市选择的关系</h4>
          <div v-if="enhancedBazi.wuxingRelation.shengCycles.length > 0 || enhancedBazi.wuxingRelation.keCycles.length > 0">
            <div class="flex flex-wrap gap-2 justify-center mb-3">
              <span v-for="s in enhancedBazi.wuxingRelation.shengCycles" :key="s"
                class="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200"
              >{{ s }} 🌱</span>
              <span v-for="k in enhancedBazi.wuxingRelation.keCycles" :key="k"
                class="px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-500 border border-red-200"
              >{{ k }} ⚡</span>
            </div>
            <p class="text-xs text-gray-500 mb-3 text-center">{{ enhancedBazi.wuxingRelation.summary }}</p>
          </div>
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/60">
            <p class="text-xs text-gray-600 leading-relaxed">{{ wuxingCityAnalysis }}</p>
          </div>
        </div>

        <div class="bg-white/60 rounded-2xl p-5 border border-white">
          <h4 class="text-sm font-bold text-gray-600 mb-2 text-center">
            💕 夫妻宫 · {{ enhancedBazi.earthlyBranches[2] }}
            <span class="text-xs text-gray-400 font-normal">（对城市选择的影响）</span>
          </h4>
          <p class="text-xs text-gray-500 mb-2">{{ enhancedBazi.detailedCouplePalace.summary }}</p>
          <p class="text-xs text-gray-600 leading-relaxed mb-3">{{ enhancedBazi.detailedCouplePalace.detailed }}</p>
          <div class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-200/60">
            <p class="text-xs text-gray-600 leading-relaxed">{{ couplePalaceCityAnalysis }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center animate-fade-in" style="animation-delay: 0.8s">
        <button @click="retakeTest"
          class="py-4 px-14 glass-card-strong text-gray-600 font-bold rounded-2xl hover:border-primary hover:text-primary hover:shadow-lg transition-all duration-300 border-2 border-transparent"
        >
          🔁 重新测试
        </button>
      </div>

    <div v-if="showUrlModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      @click.self="showUrlModal = false"
    >
      <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div class="text-center mb-4">
          <span class="text-3xl">🔗</span>
          <h3 class="text-base font-bold text-gray-700 mt-2">复制链接加入小队</h3>
          <p class="text-xs text-gray-400 mt-1">点击下方链接全选后复制，分享给好友即可加入你的小队</p>
        </div>
        <input
           ref="urlInputRef"
           :value="manualCopyUrl"
           class="w-full px-4 py-3 bg-gray-50 rounded-2xl text-xs text-gray-600 border border-gray-200 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary mb-4 select-all"
           @focus="onUrlInputFocus"
           @click="onUrlInputFocus"
           readonly
         />
        <div class="flex gap-2">
          <button @click="copyUrlText"
            class="flex-1 py-2.5 bg-gradient-to-r from-secondary to-accent text-white text-sm font-bold rounded-2xl hover:shadow-md transition-all"
          >
            📋 复制链接
          </button>
          <button @click="showUrlModal = false"
            class="py-2.5 px-5 bg-gray-100 text-gray-500 text-sm font-bold rounded-2xl hover:bg-gray-200 transition-all"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

      <div class="text-center text-xs text-gray-300 py-4">
        © 2026 CityFit · 仅供娱乐 · 开心就好 😊
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RadarChart from '../components/RadarChart.vue'
import ChinaMap from '../components/ChinaMap.vue'
import CityPersonaImage from '../components/CityPersonaImage.vue'
import { getEnhancedBaziInfo, WUXING_COLORS, WUXING_EMOJI } from '../composables/useBazi'
import { cities, cityPersonalities } from '../data/cities'
import type { CityResult, SharedUserData, BaziInfo, CityPersonality } from '../types'

const router = useRouter()
const route = useRoute()

const privateMode = ref(false)
const shareName = ref('')

const store = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
const results = store.results
const baziInfo = results?.baziInfo as BaziInfo | null

const topResults = ref<CityResult[]>(results?.topResults || [])
const personalityTag = ref(results?.personalityTag || '城市探索家')
const allScores = ref<Record<string, number>>(results?.allScores || {})

const teamId = ref(results?.teamId || Math.random().toString(36).substring(2, 6).toUpperCase())
const teamMembers = ref<{ name: string; results: { cityId: string; cityName: string; matchPercentage: number }[] }[]>([])
const showJoinInput = ref(false)
const joinTeamCode = ref('')

if (results && !results.teamId) {
  results.teamId = teamId.value
  sessionStorage.setItem('cityfit', JSON.stringify(store))
}

const enhancedBazi = computed(() => {
  if (!baziInfo) return null
  return getEnhancedBaziInfo(baziInfo)
})

const personalityProfile = computed<CityPersonality | null>(() => {
  const tag = personalityTag.value
  for (const [, personalities] of Object.entries(cityPersonalities)) {
    const found = personalities.find(p => p.tag === tag)
    if (found) return found
  }
  return null
})

const personalityEmoji = computed(() => {
  return personalityProfile.value?.emoji || '🏙️'
})

const personalityAssetSrc = computed(() => {
  const topCity = topResults.value[0]?.city
  return topCity ? `/assets/personas/${topCity.id}.png` : ''
})

const radarScores = computed(() => {
  if (topResults.value.length > 0) {
    const top = topResults.value[0].city
    return { material: top.material, spiritual: top.spiritual, xuanxue: top.xuanxue }
  }
  return { material: 50, spiritual: 50, xuanxue: 50 }
})

const materialInterpretation = computed(() => {
  const score = radarScores.value.material
  if (score >= 80) return '你对物质生活有很高的追求，喜欢繁华都市的便利与精彩。高薪、品质消费、现代化设施是你的生活关键词。像上海、深圳这样的经济中心能充分满足你对物质生活的期待。'
  if (score >= 60) return '你懂得享受物质生活但不过分追求，适度的消费升级和生活品质提升让你感到满足。新一线城市如成都、杭州的节奏可能最适合你的物质需求。'
  return '你更看重精神层面的富足，对物质的要求比较朴素。大理、拉萨这样生活成本低但精神丰富的城市更适合你。'
})

const spiritualInterpretation = computed(() => {
  const score = radarScores.value.spiritual
  const city = topResults.value[0]?.city
  if (score >= 80) return `你的精神世界非常丰富，内心渴望与自然、艺术、文化深度连接。${city ? '「' + city.name + '」' : '你的本命城市'}的文化氛围和生活方式能为你的灵魂提供充沛的养分。适合选择文化底蕴深厚、自然环境优美的城市。`
  if (score >= 60) return '你重视精神生活，希望在物质追求和精神满足之间找到平衡。一个有文化氛围、有自然景观的城市能让你感到舒适和充实。'
  return '你更偏向务实的生活方式，精神追求主要体现在日常的社交和娱乐活动中。选择生活便利、社交丰富的城市能让你感到快乐。'
})

const xuanxueInterpretation = computed(() => {
  const score = radarScores.value.xuanxue
  if (score >= 80) return '你与玄学缘分深厚，八字五行对你的生活选择有很强的指导意义。选择与你五行相生的城市，能让你在运势、健康、人际关系等方面更加顺遂。西安、拉萨等历史底蕴深厚的城市与你的玄学能量高度共振。'
  if (score >= 60) return '你相信缘分和运势，但不完全依赖玄学。在选择城市时，你会本能地选择那些让你感觉"气场相合"的地方。'
  return '你对玄学持开放但理性的态度，城市的实际条件比五行属性更能影响你的决策。不过，选择一个与你八字没有冲突的城市总是有益的。'
})

const mapTopCities = computed(() => {
  return topResults.value.map(r => ({
    name: r.city.name,
    value: r.matchPercentage,
    color: r === topResults.value[0] ? '#FF6B6B' : r === topResults.value[1] ? '#45B7D1' : '#96CEB4',
  }))
})

const mapMergedPoints = computed(() => {
  const points: { name: string; value: number }[] = []
  teamMembers.value.forEach(m => {
    m.results.forEach(r => {
      const city = cities.find(c => c.id === r.cityId)
      if (city) {
        points.push({ name: city.name, value: r.matchPercentage })
      }
    })
  })
  return points
})

const sharedFromFriend = ref<SharedUserData | null>(null)

const dayMasterCityAnalysis = computed(() => {
  const bazi = enhancedBazi.value
  const city = topResults.value[0]?.city
  if (!bazi || !city) return '加载中...'
  const dayWuxing = bazi.dayMaster
  const cityPrefs = city.baziPreference
  const matchCount = cityPrefs.filter(e => bazi.likes.includes(e)).length
  if (matchCount >= 2) {
    return `你的日主为${dayWuxing}${getWuxingEmoji(dayWuxing)}，而你的本命城市「${city.name}」的五行偏好（${cityPrefs.join('、')}）与你的喜用神（${bazi.likes.join('、')}）高度匹配！这表明${city.name}的气场对你的八字有正向的加持作用，居住或常去这座城市会对你的整体运势产生积极影响。你的${dayWuxing}性人格特质也能在这座城市得到最好的发挥和释放。`
  }
  if (matchCount === 1) {
    return `你的日主为${dayWuxing}${getWuxingEmoji(dayWuxing)}，「${city.name}」的五行偏好中包含你的喜用神${cityPrefs.filter(e => bazi.likes.includes(e)).join('、')}，有一定的正向作用。同时这座城市也有其他元素特质，整体来说是一个不错的选择。`
  }
  return `你的日主为${dayWuxing}${getWuxingEmoji(dayWuxing)}，「${city.name}」的五行偏好与你的喜用神匹配度不高，但这并不意味着不合适。城市的选择是多维度的，物质和精神层面的契合同样重要。建议你多关注下文其他维度的分析。`
})

const cityWuxingMatchText = computed(() => {
  const city = topResults.value[0]?.city
  const bazi = enhancedBazi.value
  if (!city || !bazi) return ''
  const matched = city.baziPreference.filter(e => bazi.likes.includes(e))
  const unmatched = city.baziPreference.filter(e => bazi.dislikes.includes(e))
  if (matched.length > 0) return `的五行偏好（${city.baziPreference.join('、')}）与喜用神（${matched.join('、')}）相合 ✨`
  if (unmatched.length > 0) return `的五行偏好（${city.baziPreference.join('、')}）包含忌神元素，建议综合考量`
  return '的五行属性较为中性'
})

const wuxingCityAnalysis = computed(() => {
  const bazi = enhancedBazi.value
  const city = topResults.value[0]?.city
  if (!bazi || !city) return ''
  const cityElem = city.baziPreference.join('、')
  let analysis = `从五行生克制化的角度来看，「${city.name}」的五行属性为${cityElem}。`
  if (city.baziPreference.some(e => bazi.likes.includes(e))) {
    analysis += ` 这与你的八字喜用神相合，能够形成良性互动，在你的生活中起到"扶抑"的积极作用——补足你八字中偏弱的元素，平抑过旺的元素。`
  } else {
    analysis += ` 建议你结合下文综合评分来评估，因为五行只是影响人城契合度的因素之一。`
  }
  if (bazi.wuxingRelation.shengCycles.length > 0) {
    analysis += ` 你的八字中出现了${bazi.wuxingRelation.shengCycles.join('、')}的相生关系，这说明你的内在能量流动顺畅，选择${city.name}这样的城市能进一步助长这种良性循环。`
  }
  return analysis
})

const couplePalaceCityAnalysis = computed(() => {
  const bazi = enhancedBazi.value
  const city = topResults.value[0]?.city
  if (!bazi || !city) return ''
  const branch = bazi.earthlyBranches[2]
  const branchWuxing = ZHI_WUXING_MAP[branch] || '土'
  if (city.baziPreference.includes(branchWuxing)) {
    return `你的夫妻宫为「${branch}」，五行属${branchWuxing}，与「${city.name}」的五行偏好（${city.baziPreference.join('、')}）相契合。这意味着在这座城市中，你遇到理想伴侣的概率更高，感情生活也更容易顺遂。${city.name}的气场能滋养你的夫妻宫能量，让你的感情运势更加旺盛。`
  }
  return `你的夫妻宫为「${branch}」，五行属${branchWuxing}。虽然「${city.name}」的五行偏好与夫妻宫不完全一致，但城市对感情的影响是多方面的——文化氛围、社交圈子、生活节奏都会影响你的感情生活。`
})

function getWuxingColor(wuxing: string): string {
  return WUXING_COLORS[wuxing] || '#9CA3AF'
}

function getWuxingEmoji(wuxing: string): string {
  return WUXING_EMOJI[wuxing] || '✨'
}

const ZHI_WUXING_MAP: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

function showCityDetail(city: CityResult['city'] | string) {
  const cityName = typeof city === 'string' ? city : city.name
  const result = topResults.value.find(r => r.city.name === cityName)
  const match = result?.matchPercentage || allScores.value[cities.find(c => c.name === cityName)?.id || ''] || 0
  const reason = result?.reason || ''
  alert(`📍 ${cityName}\n匹配度: ${match}%\n\n${reason}`)
}

function generateShareLink(): string {
  const data: SharedUserData = {
    name: privateMode.value ? '匿名用户' : (shareName.value || '我的好友'),
    private: privateMode.value,
    teamId: teamId.value,
    results: topResults.value.map(r => ({
      cityId: r.city.id,
      cityName: r.city.name,
      matchPercentage: r.matchPercentage,
    })),
  }
  const currentTeamData = teamMembers.value.map(m => ({
    name: m.name,
    private: false,
    teamId: teamId.value,
    results: m.results,
  }))
  const allData = [data, ...currentTeamData]
  const encoded = btoa(encodeURIComponent(JSON.stringify(allData)))
  const shareUrl = `${window.location.origin}${window.location.pathname}?team=${teamId.value}&data=${encoded}`
  return shareUrl
}

const copyStatus = ref<'idle' | 'copied' | 'error'>('idle')
const showUrlModal = ref(false)
const manualCopyUrl = ref('')
const urlInputRef = ref<HTMLInputElement>()

function onUrlInputFocus() {
  urlInputRef.value?.select()
}

function copyUrlText() {
  if (urlInputRef.value) {
    urlInputRef.value.select()
    urlInputRef.value.setSelectionRange(0, manualCopyUrl.value.length)
    try {
      document.execCommand('copy')
    } catch {}
    showUrlModal.value = false
    copyStatus.value = 'copied'
    setTimeout(() => { copyStatus.value = 'idle' }, 2500)
  }
}

async function copyTeamLink() {
  const url = generateShareLink()
  copyStatus.value = 'idle'

  const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  const clipboardApiAvailable = isSecure && !!navigator.clipboard?.writeText
  if (clipboardApiAvailable) {
    try {
      await navigator.clipboard.writeText(url)
      copyStatus.value = 'copied'
      setTimeout(() => { copyStatus.value = 'idle' }, 2500)
      return
    } catch {
    }
  }

  try {
    const input = document.createElement('input')
    input.value = url
    input.style.cssText = 'position:fixed;left:-9999px;font-size:16px;top:-9999px'
    input.readOnly = true
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, url.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(input)
    if (ok) {
      copyStatus.value = 'copied'
      setTimeout(() => { copyStatus.value = 'idle' }, 2500)
      return
    }
  } catch {
  }

  copyStatus.value = 'error'
  manualCopyUrl.value = url
  showUrlModal.value = true
  setTimeout(() => { copyStatus.value = 'idle' }, 2500)
}

function joinTeam() {
  if (!joinTeamCode.value.trim()) {
    alert('请输入小队码')
    return
  }
  const code = joinTeamCode.value.trim().toUpperCase()
  teamId.value = code
  if (results) {
    results.teamId = code
    store.results = results
    sessionStorage.setItem('cityfit', JSON.stringify(store))
  }
  showJoinInput.value = false
  joinTeamCode.value = ''
  alert(`✅ 已加入小队「${code}」！对方的小队链接中将包含你的数据`)
}

function retakeTest() {
  sessionStorage.removeItem('cityfit')
  router.push('/')
}

onMounted(() => {
  if (!results) {
    router.push('/')
    return
  }

  const dataParam = route.query.data as string
  const teamParam = route.query.team as string
  if (dataParam && teamParam) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(dataParam)))
      if (Array.isArray(decoded)) {
        const members = decoded as SharedUserData[]
        if (members.length > 0) {
          sharedFromFriend.value = members[0]
          teamId.value = teamParam
          teamMembers.value = members.map(m => ({
            name: m.name,
            results: m.results,
          }))
        }
      }
    } catch {
      console.warn('Failed to parse team data')
    }
  }
})
</script>
