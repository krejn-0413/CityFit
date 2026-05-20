<template>
  <div class="result-pages">
    <!-- ===== Page 1: 城市人格 ===== -->
    <section class="result-page" data-page="0">
      <div class="page-inner">
        <!-- Preview mode: visitor without test results -->
        <template v-if="previewMode">
          <div class="card border-gold/20 animate-reveal text-center">
            <IconSprite name="wave-hand" size="32" />
            <p class="text-body text-text-primary font-bold mt-3">
              {{ sharedFromFriend?.private ? '一位匿名好友' : sharedFromFriend?.name }}
            </p>
            <p class="text-caption text-text-muted mt-1">分享了TA的城市测评，来看看TA的本命城市！</p>
          </div>
          <!-- Friend's top cities preview -->
          <div class="mt-8">
            <h3 class="font-display text-section text-text-primary mb-4 text-center">
              {{ sharedFromFriend?.private ? 'TA' : sharedFromFriend?.name }} 的 Top 城市
            </h3>
            <div v-for="(r, idx) in previewFriendCities" :key="r.cityId"
              class="card-hover mb-3 animate-reveal"
              :class="'stagger-' + (idx + 1)"
            >
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 flex items-center justify-center text-lg font-bold shrink-0"
                  :class="idx === 0 ? 'bg-gold text-canvas-base' : 'bg-canvas-overlay border border-border-subtle text-text-muted'"
                >{{ idx + 1 }}</div>
                <div class="flex-1">
                  <span class="text-body text-text-primary font-bold">{{ r.cityName }}</span>
                </div>
                <span class="text-section text-gold">{{ r.matchPercentage }}%</span>
              </div>
            </div>
          </div>
          <!-- Preview map -->
          <div class="h-[300px] w-full border border-border-subtle overflow-hidden mt-6 animate-reveal stagger-5">
            <ChinaMap
              :top-cities="[]"
              :merged-points="previewMapCities"
              :team-id="teamId"
              :show-team-label="true"
              @city-click="showCityDetail"
            />
          </div>
          <div class="flex justify-center mt-8 animate-reveal stagger-6">
            <button @click="goTakeTest" class="btn-primary text-caption">我也测一测</button>
          </div>
          <p class="text-fine text-text-muted text-center mt-3">完成测试后，可以选择加入TA的小队一起点亮地图！</p>
          <footer class="py-10 text-center">
            <p class="text-fine text-text-faint tracking-widest">娱乐测评 · 仅供开心</p>
          </footer>
        </template>

        <!-- Merge banner (after quiz, with pending invite) -->
        <div v-if="showMergeBanner" class="card border-gold/20 animate-reveal mb-6">
          <div class="flex items-center gap-3 mb-4">
            <IconSprite name="map" size="24" />
            <div>
              <p class="text-caption text-text-primary font-bold">已展示「{{ pendingTeamName }}」的推荐城市</p>
              <p class="text-fine text-text-muted mt-1">想正式加入TA的小队，让地图持续合并展示吗？</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="acceptJoinTeam" class="btn-primary flex-1 text-caption">
              加入小队
            </button>
            <button @click="declineJoinTeam" class="btn-secondary text-caption px-4">
              仅看效果
            </button>
          </div>
        </div>

        <!-- Normal mode (has results, not preview) -->
        <template v-if="!previewMode">
        <div v-if="sharedFromFriend" class="card border-gold/20 animate-reveal">
          <div class="flex items-center gap-3">
            <IconSprite name="wave-hand" size="24" />
            <div>
              <p class="text-caption text-text-primary font-bold">
                {{ sharedFromFriend.private ? '一位匿名好友' : sharedFromFriend.name }} 分享了TA的城市测评
              </p>
              <p class="text-fine text-text-muted mt-1">以下地图中彩色气泡为好友的推荐城市，你也可以测测自己的！</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <div class="gold-line-center mb-8 animate-reveal"></div>
          <h1 class="font-display text-hero text-text-primary mb-3 animate-reveal stagger-1">你的城市人格是...</h1>
        </div>

        <div class="text-center">
          <div class="animate-reveal stagger-2">
            <h2 class="font-display text-section text-gold mb-4">{{ personalityTag }}</h2>
            <div class="gold-line-center mb-6"></div>
          </div>
        </div>

        <div>
          <h3 class="font-display text-section text-text-primary mb-10 text-center animate-reveal">AI 城市人格画像</h3>

          <div v-if="personalityProfile" class="flex flex-col items-center animate-reveal stagger-1">
            <div class="w-48 h-48 mb-6 overflow-hidden border border-border-subtle"
              :style="{ boxShadow: '0 0 40px ' + personalityProfile.color + '15' }"
            >
              <CityPersonaImage
                :asset-src="personalityAssetSrc"
                :city-name="topResults[0]?.city.name || ''"
                :color="personalityProfile.color"
                :tag="personalityProfile.tag"
                :emoji="personalityProfile.icon || personalityProfile.emoji || ''"
              />
            </div>
            <div class="inline-flex items-center gap-2 px-5 py-2 card mb-4">
              <span class="text-body text-text-primary font-bold">{{ personalityProfile.tag }}</span>
              <span class="tag-active">城市人格</span>
            </div>
            <p class="text-body text-text-body text-center max-w-md leading-relaxed">{{ personalityProfile.description }}</p>
            <p class="mt-4 text-caption text-text-muted text-center">
              你的性格气质与{{ topResults[0]?.city.name }}完美共振
            </p>
          </div>
        </div>
      </template>
      </div>
    </section>

    <!-- ===== Page 2: 八字玄学 ===== -->
    <section class="result-page" data-page="1">
      <div class="page-inner">
        <div v-if="enhancedBazi">
          <h3 class="font-display text-section text-text-primary mb-10 text-center animate-reveal">八字玄学 · 日主与城市深度分析</h3>

          <div class="card mb-5 animate-reveal stagger-1">
            <h4 class="text-caption text-text-primary font-bold mb-5 text-center tracking-wider">四柱八字</h4>
            <div class="flex justify-center gap-3 mb-5">
              <div v-for="(stem, i) in enhancedBazi.heavenlyStems" :key="i" class="flex flex-col items-center">
                <div class="text-fine text-text-muted mb-1">{{ ['年', '月', '日', '时'][i] }}柱</div>
                <div class="w-14 h-14 flex items-center justify-center text-xl font-bold shadow-md"
                  :style="{ backgroundColor: getWuxingColor(enhancedBazi.fiveElements[i]) + '15', color: getWuxingColor(enhancedBazi.fiveElements[i]), border: '1px solid ' + getWuxingColor(enhancedBazi.fiveElements[i]) + '30' }"
                >
                  {{ stem }}
                </div>
                <div class="w-14 h-10 flex items-center justify-center text-base font-bold text-text-muted bg-canvas-overlay mt-1 border border-border-subtle">
                  {{ enhancedBazi.earthlyBranches[i] }}
                </div>
                <div class="text-fine mt-1 font-medium" :style="{ color: getWuxingColor(enhancedBazi.fiveElements[i]) }">
                  {{ enhancedBazi.fiveElements[i] }}<IconSprite :name="getWuxingIcon(enhancedBazi.fiveElements[i])" size="14" />
                </div>
              </div>
            </div>
            <div class="space-y-2 text-body text-text-body">
              <p v-for="(interp, i) in enhancedBazi.pillarInterpretations" :key="i">{{ interp }}</p>
            </div>
          </div>

          <div class="card mb-5 animate-reveal stagger-2">
            <h4 class="text-caption text-text-primary font-bold mb-5 text-center tracking-wider">五行分布</h4>
            <div class="space-y-3">
              <div v-for="(count, elem) in enhancedBazi.elementDistribution" :key="elem" class="flex items-center gap-3">
                <span class="w-6 text-center text-sm"><IconSprite :name="getWuxingIcon(elem)" size="14" /></span>
                <span class="w-6 text-caption font-medium" :style="{ color: getWuxingColor(elem) }">{{ elem }}</span>
                <div class="score-bar flex-1">
                  <div class="score-bar-fill" :style="{ width: (count / 4 * 100) + '%', backgroundColor: getWuxingColor(elem) }"></div>
                </div>
                <span class="w-5 text-right text-fine text-text-muted">{{ count }}</span>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-center gap-2 text-caption text-text-muted">
              <span>五行均衡度</span>
              <div class="score-bar w-24">
                <div class="score-bar-fill bg-gold" :style="{ width: enhancedBazi.wuxingBalanceScore + '%' }"></div>
              </div>
              <span class="font-medium text-gold">{{ enhancedBazi.wuxingBalanceScore }}%</span>
            </div>
          </div>

          <div class="card mb-5 animate-reveal stagger-3">
            <h4 class="text-caption text-text-primary font-bold mb-4 text-center tracking-wider">
              日主分析 · {{ enhancedBazi.dayMaster }}<IconSprite :name="getWuxingIcon(enhancedBazi.dayMaster)" size="14" />
              <span class="text-fine text-text-muted font-normal">（与城市选择的关系）</span>
            </h4>
            <p class="text-body text-text-body leading-relaxed mb-5">{{ enhancedBazi.dayMasterPersonality }}</p>
            <div class="bg-gold/5 p-4 border border-gold/10">
              <p class="text-body text-text-body leading-relaxed">{{ dayMasterCityAnalysis }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-5 animate-reveal stagger-4">
            <div class="card border-gold/10">
              <div class="text-caption text-text-muted mb-2">喜用神</div>
              <div class="flex gap-1.5 flex-wrap">
                <span v-for="l in enhancedBazi.likes" :key="l"
                  class="tag-active text-fine"
                >{{ l }}<IconSprite :name="getWuxingIcon(l)" size="14" /></span>
              </div>
              <div class="text-fine text-text-muted mt-3">你的 Top 1 城市「{{ topResults[0]?.city.name }}」{{ cityWuxingMatchText }}</div>
            </div>
            <div class="card">
              <div class="text-caption text-text-muted mb-2">忌神</div>
              <div class="flex gap-1.5 flex-wrap">
                <span v-for="d in enhancedBazi.dislikes" :key="d"
                  class="tag text-fine"
                  :style="{ borderColor: getWuxingColor(d) + '40', color: getWuxingColor(d) }"
                >{{ d }}<IconSprite :name="getWuxingIcon(d)" size="14" /></span>
              </div>
              <div class="text-fine text-text-muted mt-3">需谨慎选择忌神元素过旺的城市</div>
            </div>
          </div>

          <div class="card mb-5 animate-reveal stagger-5">
            <h4 class="text-caption text-text-primary font-bold mb-5 text-center tracking-wider">五行生克制化 · 与城市选择的关系</h4>
            <div v-if="enhancedBazi.wuxingRelation.shengCycles.length > 0 || enhancedBazi.wuxingRelation.keCycles.length > 0">
              <div class="flex flex-wrap gap-2 justify-center mb-5">
                <span v-for="s in enhancedBazi.wuxingRelation.shengCycles" :key="s" class="tag-active text-fine">{{ s }}</span>
                <span v-for="k in enhancedBazi.wuxingRelation.keCycles" :key="k" class="tag text-fine">{{ k }}</span>
              </div>
              <p class="text-body text-text-body text-center mb-5">{{ enhancedBazi.wuxingRelation.summary }}</p>
            </div>
            <div class="bg-gold/5 p-4 border border-gold/10">
              <p class="text-body text-text-body leading-relaxed">{{ wuxingCityAnalysis }}</p>
            </div>
          </div>

          <div class="card animate-reveal stagger-6">
            <h4 class="text-caption text-text-primary font-bold mb-4 text-center tracking-wider">
              夫妻宫 · {{ enhancedBazi.earthlyBranches[2] }}
              <span class="text-fine text-text-muted font-normal">（对城市选择的影响）</span>
            </h4>
            <p class="text-body text-text-body mb-4">{{ enhancedBazi.detailedCouplePalace.summary }}</p>
            <p class="text-body text-text-body leading-relaxed mb-5">{{ enhancedBazi.detailedCouplePalace.detailed }}</p>
            <div class="bg-gold/5 p-4 border border-gold/10">
              <p class="text-body text-text-body leading-relaxed">{{ couplePalaceCityAnalysis }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Page 3: 三维城市画像 ===== -->
    <section class="result-page" data-page="2">
      <div class="page-inner">
        <div>
          <h3 class="font-display text-section text-text-primary mb-10 text-center animate-reveal">三维城市画像 · 专业解读</h3>
          <div class="h-72 mb-8 animate-reveal stagger-1">
            <RadarChart :material="radarScores.material" :spiritual="radarScores.spiritual" :xuanxue="radarScores.xuanxue" />
          </div>

          <div class="grid grid-cols-3 gap-3 mb-8 text-center animate-reveal stagger-2">
            <div class="card border-gold/10">
              <div class="text-section text-gold">{{ radarScores.material }}%</div>
              <div class="text-caption text-text-muted">物欲都市</div>
            </div>
            <div class="card border-gold/10">
              <div class="text-section text-gold">{{ radarScores.spiritual }}%</div>
              <div class="text-caption text-text-muted">精神桃源</div>
            </div>
            <div class="card border-gold/10">
              <div class="text-section text-gold">{{ radarScores.xuanxue }}%</div>
              <div class="text-caption text-text-muted">玄学缘分</div>
            </div>
          </div>

          <div class="space-y-4 animate-reveal stagger-3">
            <div class="card">
              <div class="flex items-center gap-2 mb-3">
                <span class="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold text-sm">物</span>
                <span class="text-caption text-text-primary font-bold">物质维度</span>
                <span class="ml-auto text-caption text-gold font-bold">{{ radarScores.material }}%</span>
              </div>
              <p class="text-body text-text-body leading-relaxed">{{ materialInterpretation }}</p>
            </div>
            <div class="card">
              <div class="flex items-center gap-2 mb-3">
                <span class="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold text-sm">精</span>
                <span class="text-caption text-text-primary font-bold">精神维度</span>
                <span class="ml-auto text-caption text-gold font-bold">{{ radarScores.spiritual }}%</span>
              </div>
              <p class="text-body text-text-body leading-relaxed">{{ spiritualInterpretation }}</p>
            </div>
            <div class="card">
              <div class="flex items-center gap-2 mb-3">
                <span class="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold text-sm">玄</span>
                <span class="text-caption text-text-primary font-bold">玄学维度</span>
                <span class="ml-auto text-caption text-gold font-bold">{{ radarScores.xuanxue }}%</span>
              </div>
              <p class="text-body text-text-body leading-relaxed">{{ xuanxueInterpretation }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Page 4: 组队 + Top3 ===== -->
    <section class="result-page" data-page="3">
      <div class="page-inner">
        <div>
          <h3 class="font-display text-section text-text-primary mb-2 text-center animate-reveal">点亮中国地图</h3>
          <p class="text-caption text-text-muted text-center mb-8 animate-reveal stagger-1">
            你和好友的 Top 城市将在这里点亮！分享链接互相看到对方的地图
          </p>

          <div class="flex items-stretch justify-center gap-3 mb-8 animate-reveal stagger-2">
            <div v-for="(r, idx) in topResults" :key="r.city.id"
              class="flex-1 max-w-[110px] flex flex-col items-center gap-1.5 card py-3 relative overflow-hidden"
              :class="idx === 0 ? 'border-gold/30' : ''"
            >
              <div class="absolute top-0 left-0 right-0 h-0.5 bg-gold" v-if="idx === 0"></div>
              <div class="w-8 h-8 flex items-center justify-center text-xs font-bold"
                :class="idx === 0 ? 'bg-gold text-canvas-base' : 'bg-canvas-overlay text-text-muted'"
              >
                <IconSprite :name="idx === 0 ? 'trophy-gold' : idx === 1 ? 'medal-silver' : 'medal-bronze'" size="16" />
              </div>
              <IconSprite :name="r.city.icon" size="18" />
              <span class="text-caption text-text-primary font-bold">{{ r.city.name }}</span>
              <span class="text-caption font-bold" :class="idx === 0 ? 'text-gold' : 'text-text-muted'">{{ r.matchPercentage }}%</span>
              <div class="score-bar w-full mt-0.5">
                <div class="score-bar-fill bg-gold" :style="{ width: r.matchPercentage + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="h-[420px] w-full border border-border-subtle overflow-hidden animate-reveal stagger-3">
            <ChinaMap
              :top-cities="mapTopCities"
              :merged-points="mapMergedPoints"
              :overlap-cities="mapOverlapCities"
              :team-id="teamId"
              :show-team-label="true"
              @city-click="showCityDetail"
            />
          </div>

          <!-- Merge banner (repeated for users scrolling directly to page 4) -->
          <div v-if="showMergeBanner" class="card border-gold/20 animate-reveal mt-4">
            <div class="flex items-center gap-3 mb-4">
              <IconSprite name="map" size="24" />
              <div>
                <p class="text-caption text-text-primary font-bold">已展示「{{ pendingTeamName }}」的推荐城市</p>
                <p class="text-fine text-text-muted mt-1">想正式加入TA的小队，让地图持续合并展示吗？</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="acceptJoinTeam" class="btn-primary flex-1 text-caption">
                加入小队
              </button>
              <button @click="declineJoinTeam" class="btn-secondary text-caption px-4">
                仅看效果
              </button>
            </div>
          </div>

          <div class="mt-8 card animate-reveal stagger-4">
            <h4 class="text-caption text-text-primary font-bold mb-5 text-center tracking-wider">分享结果 · 邀请好友一起点亮地图</h4>

            <div class="flex items-center justify-center gap-2 mb-5">
              <span class="tag-active">小队 {{ teamId }}</span>
              <span class="text-caption text-text-muted">&middot; {{ teamMembers.length + 1 }} 人</span>
            </div>

            <div class="flex gap-2 mb-5">
              <button @click="copyTeamLink"
                class="btn-primary flex-1 text-caption"
                :class="{ 'bg-green-500': copyStatus === 'copied', 'bg-red-400': copyStatus === 'error' }"
              >
                {{ copyStatus === 'copied' ? '已复制到剪贴板！' : copyStatus === 'error' ? '复制失败' : '分享我的结果' }}
              </button>
              <button @click="showJoinInput = !showJoinInput" class="btn-secondary text-caption px-4">
                加入小队
              </button>
            </div>

            <div v-if="showJoinInput" class="mb-5 p-4 bg-canvas-overlay">
              <p class="text-caption text-text-muted mb-3">输入对方的小队码，加入后你们的地图会合并显示：</p>
              <div class="flex gap-2">
                <input v-model="joinTeamCode" type="text" placeholder="输入小队码"
                  class="text-input flex-1 text-center"
                />
                <button @click="joinTeam" class="btn-primary text-caption">加入</button>
              </div>
            </div>

            <div class="divider mb-5"></div>

            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="text-caption text-text-muted">匿名</span>
              <button @click="privateMode = !privateMode"
                class="relative w-12 h-6 rounded-pill transition-colors duration-300 overflow-hidden"
                :class="privateMode ? 'bg-canvas-overlay border border-border-subtle' : 'bg-gold'"
              >
                <span class="absolute left-0.5 top-0.5 w-5 h-5 bg-gold rounded-full shadow-md transition-transform duration-300"
                  :class="privateMode ? 'translate-x-0' : 'translate-x-[22px]'"
                ></span>
              </button>
              <span class="text-caption text-text-muted">昵称</span>
            </div>
            <div v-if="!privateMode">
              <input v-model="shareName" type="text" placeholder="输入你的昵称（可选）"
                class="text-input w-full text-center" maxlength="10"
              />
            </div>
          </div>
        </div>

        <div class="mt-12">
          <div class="flex items-center gap-3 justify-center mb-10 animate-reveal">
            <div class="gold-line"></div>
            <h3 class="font-display text-section text-text-primary">你的 Top 3 城市</h3>
            <div class="gold-line" style="transform: scaleX(-1)"></div>
          </div>
          <div class="space-y-4">
            <div v-for="(r, idx) in topResults" :key="r.city.id"
              class="card-hover animate-reveal"
              :class="'stagger-' + (idx + 1)"
              @click="showCityDetail(r.city)"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 flex items-center justify-center text-lg font-bold shrink-0"
                  :class="idx === 0 ? 'bg-gold text-canvas-base' : 'bg-canvas-overlay border border-border-subtle text-text-muted'"
                >
                  {{ idx + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <IconSprite :name="r.city.icon" size="20" />
                    <span class="text-body text-text-primary font-bold">{{ r.city.name }}</span>
                    <span class="tag">{{ r.city.province }}</span>
                  </div>
                  <div class="flex flex-wrap gap-1.5 mt-2">
                    <span v-for="tag in r.city.tags" :key="tag" class="tag">#{{ tag }}</span>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-section text-gold">{{ r.matchPercentage }}%</div>
                  <div class="text-caption text-text-muted">匹配度</div>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-border-subtle">
                <p class="text-body text-text-body leading-relaxed">{{ r.reason }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center py-12 animate-reveal">
          <button @click="retakeTest" class="btn-secondary px-14">
            重新测试
          </button>
        </div>
      </div>
      <footer class="py-10 text-center">
        <p class="text-fine text-text-faint tracking-widest">娱乐测评 · 仅供开心</p>
      </footer>
    </section>

    <!-- Dot indicators -->
    <div class="page-dots">
      <span v-for="i in 4" :key="i" class="page-dot" :class="{ active: currentPage === i - 1 }" @click="goToPage(i - 1)"></span>
    </div>
  </div>

  <!-- URL modal (outside scroll container) -->
  <div v-if="showUrlModal" class="modal-overlay" @click.self="showUrlModal = false">
    <div class="modal-content">
      <div class="text-center mb-5">
        <h3 class="text-caption text-text-primary font-bold mt-2 tracking-wider">复制链接加入小队</h3>
        <p class="text-fine text-text-muted mt-1">点击下方链接全选后复制，分享给好友即可加入你的小队</p>
      </div>
      <input
        ref="urlInputRef"
        :value="manualCopyUrl"
        class="text-input w-full mb-5 text-fine select-all"
        @focus="onUrlInputFocus"
        @click="onUrlInputFocus"
        readonly
      />
      <div class="flex gap-2">
        <button @click="copyUrlText" class="btn-primary flex-1 text-caption">复制链接</button>
        <button @click="showUrlModal = false" class="btn-secondary text-caption px-5">关闭</button>
      </div>
    </div>
  </div>

  <!-- CityDetailCard (outside scroll container) -->
  <CityDetailCard
    :visible="detailCardVisible"
    :city="detailCardCity"
    :match-percentage="detailCardMatch"
    :reason="detailCardReason"
    @close="detailCardVisible = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RadarChart from '../components/RadarChart.vue'
import ChinaMap from '../components/ChinaMap.vue'
import CityPersonaImage from '../components/CityPersonaImage.vue'
import CityDetailCard from '../components/CityDetailCard.vue'
import IconSprite from '../components/IconSprite.vue'
import { getEnhancedBaziInfo, WUXING_COLORS, WUXING_EMOJI, WUXING_ICONS } from '../composables/useBazi'
import { cities, cityPersonalities } from '../data/cities'
import type { CityResult, SharedUserData, BaziInfo, CityPersonality, City } from '../types'

// ── Page tracking ──
const currentPage = ref(0)
const pagesContainer = ref<HTMLElement>()

function goToPage(n: number) {
  const el = pagesContainer.value
  if (!el) return
  el.scrollTo({ top: n * el.clientHeight, behavior: 'smooth' })
}

function onPageScroll() {
  const el = pagesContainer.value
  if (!el) return
  const pageHeight = el.clientHeight
  const scrollTop = el.scrollTop
  currentPage.value = Math.round(scrollTop / pageHeight)
}

const router = useRouter()
const route = useRoute()

const privateMode = ref(false)
const shareName = ref('')

const detailCardVisible = ref(false)
const detailCardCity = ref<City | null>(null)
const detailCardMatch = ref(0)
const detailCardReason = ref('')

const store = ref(JSON.parse(sessionStorage.getItem('cityfit') || '{}'))
const results = ref(store.value.results)
const baziInfo = ref(results.value?.baziInfo as BaziInfo | null)

const topResults = ref<CityResult[]>(results.value?.topResults || [])
const personalityTag = ref(results.value?.personalityTag || '城市探索家')
const allScores = ref<Record<string, number>>(results.value?.allScores || {})

const teamId = ref(results.value?.teamId || Math.random().toString(36).substring(2, 6).toUpperCase())
const teamMembers = ref<{ name: string; results: { cityId: string; cityName: string; matchPercentage: number }[] }[]>([])
const showJoinInput = ref(false)
const joinTeamCode = ref('')

const previewMode = ref(false)
const showMergeBanner = ref(false)
const pendingTeamName = ref('')

function loadResults() {
  const s = JSON.parse(sessionStorage.getItem('cityfit') || '{}')
  store.value = s
  results.value = s.results
  baziInfo.value = (s.results?.baziInfo as BaziInfo) || null
  if (s.results) {
    topResults.value = s.results.topResults || []
    personalityTag.value = s.results.personalityTag || '城市探索家'
    allScores.value = s.results.allScores || {}
    if (!s.results.teamId) {
      s.results.teamId = teamId.value
      sessionStorage.setItem('cityfit', JSON.stringify(s))
    }
  }
}

loadResults()

const enhancedBazi = computed(() => {
  if (!baziInfo.value) return null
  return getEnhancedBaziInfo(baziInfo.value)
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
  return topResults.value[0]?.city.emoji || '🏙️'
})

const personalityAssetSrc = computed(() => {
  const topCity = topResults.value[0]?.city
  return topCity ? `${import.meta.env.BASE_URL}assets/personas/${topCity.id}.png` : ''
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

// Detect cities that overlap between current user and team members (for map highlight)
const mapOverlapCities = computed(() => {
  const myCities = new Set(topResults.value.map(r => r.city.name))
  const teamCities = new Set<string>()
  if (sharedFromFriend.value) {
    sharedFromFriend.value.results.forEach(r => teamCities.add(r.cityName))
  }
  teamMembers.value.forEach(m => {
    m.results.forEach(r => teamCities.add(r.cityName))
  })
  const overlap = new Set([...myCities].filter(c => teamCities.has(c)))
  return [...overlap].map(name => ({ name, value: 100 }))
})

const sharedFromFriend = ref<SharedUserData | null>(null)

const previewFriendCities = computed(() => {
  if (!sharedFromFriend.value) return []
  return sharedFromFriend.value.results
})

const previewMapCities = computed(() => {
  if (!sharedFromFriend.value) return []
  return sharedFromFriend.value.results.map((r, idx) => ({
    name: r.cityName,
    value: r.matchPercentage,
    color: idx === 0 ? '#FF6B6B' : idx === 1 ? '#45B7D1' : '#96CEB4',
  }))
})

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

function getWuxingIcon(wuxing: string): string {
  return WUXING_ICONS[wuxing] || 'sparkles'
}

// ── Team Backend API ──
const API_BASE = location.hostname === 'localhost' ? 'http://localhost:8765' : ''

async function apiCreateTeam(code: string, member: object): Promise<string> {
  const res = await fetch(`${API_BASE}/api/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, member })
  })
  const data = await res.json()
  if (!res.ok && res.status !== 409) throw new Error(data.error || 'API error')
  return data.code || code
}

async function apiJoinTeam(code: string, member: object): Promise<{ members: any[] }> {
  const res = await fetch(`${API_BASE}/api/teams/${code}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ member })
  })
  if (!res.ok) throw new Error('Failed to join team')
  return res.json()
}

async function apiGetTeam(code: string): Promise<{ members: any[] } | null> {
  try {
    const res = await fetch(`${API_BASE}/api/teams/${code}`)
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

const ZHI_WUXING_MAP: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

function showCityDetail(city: CityResult['city'] | string) {
  const cityName = typeof city === 'string' ? city : city.name
  const cityData = cities.find(c => c.name === cityName)
  if (!cityData) return
  const result = topResults.value.find(r => r.city.name === cityName)
  detailCardCity.value = cityData
  detailCardMatch.value = result?.matchPercentage || allScores.value[cityData.id] || 0
  detailCardReason.value = result?.reason || ''
  detailCardVisible.value = true
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
  // Also post to backend (fire-and-forget in background)
  apiCreateTeam(teamId.value, data).catch(() => {})
  const shareUrl = `${window.location.origin}${window.location.pathname}#/result?team=${teamId.value}&data=${encoded}`
  return shareUrl
}

// ── Team data persistence (localStorage) ──
const TEAM_STORAGE_KEY = 'cityfit_team'

function persistTeamData() {
  const data = {
    teamId: teamId.value,
    teamMembers: teamMembers.value,
    sharedFromFriendName: sharedFromFriend.value?.name || null,
    sharedFromFriendPrivate: sharedFromFriend.value?.private ?? null,
    sharedFromFriendResults: sharedFromFriend.value?.results || null,
  }
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(data))
}

function loadTeamData() {
  try {
    const stored = localStorage.getItem(TEAM_STORAGE_KEY)
    if (!stored) return
    const data = JSON.parse(stored)
    if (data.teamId) teamId.value = data.teamId
    if (data.teamMembers?.length) teamMembers.value = data.teamMembers
    if (data.sharedFromFriendName) {
      sharedFromFriend.value = {
        name: data.sharedFromFriendName,
        private: data.sharedFromFriendPrivate || false,
        teamId: data.teamId || '',
        results: data.sharedFromFriendResults || [],
      }
    }
  } catch { /* ignore corrupt localStorage */ }
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
  persistTeamData()
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
  if (results.value) {
    results.value.teamId = code
    store.value.results = results.value
    sessionStorage.setItem('cityfit', JSON.stringify(store.value))
  }
  showJoinInput.value = false
  joinTeamCode.value = ''
  alert(`✅ 已加入小队「${code}」！对方的小队链接中将包含你的数据`)
}

function retakeTest() {
  sessionStorage.removeItem('cityfit')
  router.push('/')
}

function goTakeTest() {
  const invite = {
    teamId: teamId.value,
    fromName: sharedFromFriend.value?.private ? '匿名好友' : (sharedFromFriend.value?.name || '好友'),
    friendData: sharedFromFriend.value,
    membersData: teamMembers.value.map(m => ({
      name: m.name,
      private: false,
      teamId: teamId.value,
      results: m.results,
    })),
  }
  sessionStorage.setItem('cityfit_pending_invite', JSON.stringify(invite))
  router.push('/info')
}

function acceptJoinTeam() {
  showMergeBanner.value = false
  const pending = sessionStorage.getItem('cityfit_pending_invite')
  if (pending) {
    try {
      const invite = JSON.parse(pending)
      teamId.value = invite.teamId
      if (invite.friendData) {
        sharedFromFriend.value = invite.friendData
      }
      if (invite.membersData && invite.membersData.length > 0) {
        teamMembers.value = invite.membersData
      }
      if (results.value) {
        results.value.teamId = invite.teamId
        store.value.results = results.value
        sessionStorage.setItem('cityfit', JSON.stringify(store.value))
      }
    } catch {}
  }
  sessionStorage.removeItem('cityfit_pending_invite')
}

function declineJoinTeam() {
  showMergeBanner.value = false
  sessionStorage.removeItem('cityfit_pending_invite')
}

onMounted(() => {
  loadResults()
  loadTeamData()

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
  } else if (teamParam) {
    // Fallback: try backend API (newer URL format without data param)
    teamId.value = teamParam
    apiGetTeam(teamParam).then(result => {
      if (result?.team?.members) {
        const members = result.team.members
        if (members.length > 0) sharedFromFriend.value = members[0]
        if (members.length > 1) teamMembers.value = members.slice(1)
        persistTeamData()
      }
    }).catch(() => {})
  }

  if (!results.value) {
    if (sharedFromFriend.value) {
      previewMode.value = true
      return
    }
    router.push('/')
    return
  }

  const pending = sessionStorage.getItem('cityfit_pending_invite')
  if (pending) {
    try {
      const invite = JSON.parse(pending)
      pendingTeamName.value = invite.fromName
      if (invite.friendData) {
        sharedFromFriend.value = invite.friendData
      }
      if (invite.membersData && invite.membersData.length > 0) {
        teamMembers.value = invite.membersData
      }
      showMergeBanner.value = true
    } catch {
      sessionStorage.removeItem('cityfit_pending_invite')
    }
  }

  persistTeamData()

  // ── Page tracking setup ──
  pagesContainer.value = document.querySelector('.result-pages') as HTMLElement
  pagesContainer.value?.addEventListener('scroll', onPageScroll, { passive: true })
})

onUnmounted(() => {
  pagesContainer.value?.removeEventListener('scroll', onPageScroll)
})
</script>

<style scoped>
.result-pages {
  height: 100vh;
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.result-page {
  min-height: 100vh;
  min-height: 100dvh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.page-inner {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem);
  overflow-y: auto;
  max-height: 100vh;
  max-height: 100dvh;
}
.page-dots {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 10px;
}
.page-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(240,185,11,0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}
.page-dot.active {
  background: rgba(240,185,11,0.85);
  box-shadow: 0 0 8px rgba(240,185,11,0.4);
  transform: scale(1.3);
}
</style>
