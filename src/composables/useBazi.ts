import type { BaziInfo } from '../types'

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const WU_XING = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']
const ZHI_WUXING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}
const ZANG_GAN: Record<string, string[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'],
  '卯': ['乙'], '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'], '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'],
  '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲'],
}
const WUXING_SHENG: Record<string, string> = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' }
const WUXING_KE: Record<string, string> = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' }
const WUXING_COLORS: Record<string, string> = { '木': '#4ECDC4', '火': '#FF6B6B', '土': '#FFD93D', '金': '#A78BFA', '水': '#45B7D1' }

const PILLAR_NAMES = ['年柱 (祖上)', '月柱 (父母/事业)', '日柱 (自身/配偶)', '时柱 (晚年/子女)']

const DAY_MASTER_PERSONALITY: Record<string, string> = {
  '木': '木主仁，你天生具有包容力和生长力。性格温和却不失坚韧，像大树一样给人安全感。你有强烈的同理心和团队精神，适合在需要协作和创造力的环境中发展。',
  '火': '火主礼，你热情洋溢、充满活力，是天生的发光体。你富有感染力和领导气质，渴望被关注和认可。你的行动力强，但有时也需要学会沉淀和耐心。',
  '土': '土主信，你稳重踏实、诚实可靠，是朋友眼中的定海神针。你重视承诺，做事有始有终，有着极强的责任感和耐心。你的稳定是你最大的魅力。',
  '金': '金主义，你果断干练、追求卓越，有着锐利的洞察力和决断力。你对自己要求严格，崇尚效率和规则。你的坚韧和专注能让你在专业领域大放异彩。',
  '水': '水主智，你聪慧灵动、善于变通，有着过人的智慧和直觉。你适应力强，善于沟通和交际，总能找到最佳的解决方案。你的灵活性是你的最大优势。',
}

const WUXING_EMOJI: Record<string, string> = { '木': '🌳', '火': '🔥', '土': '⛰️', '金': '⚔️', '水': '💧' }

function getYearGanZhi(year: number): [string, string] {
  const offset = year - 4
  const gan = TIAN_GAN[((offset % 10) + 10) % 10]
  const zhi = DI_ZHI[((offset % 12) + 12) % 12]
  return [gan, zhi]
}

function getBaziMonthZhiIdx(month: number, day: number): number {
  const boundaries: { month: number; day: number; zhiIdx: number }[] = [
    { month: 1, day: 6, zhiIdx: 1 },
    { month: 2, day: 4, zhiIdx: 2 },
    { month: 3, day: 6, zhiIdx: 3 },
    { month: 4, day: 5, zhiIdx: 4 },
    { month: 5, day: 6, zhiIdx: 5 },
    { month: 6, day: 6, zhiIdx: 6 },
    { month: 7, day: 7, zhiIdx: 7 },
    { month: 8, day: 7, zhiIdx: 8 },
    { month: 9, day: 8, zhiIdx: 9 },
    { month: 10, day: 8, zhiIdx: 10 },
    { month: 11, day: 7, zhiIdx: 11 },
    { month: 12, day: 7, zhiIdx: 0 },
  ]
  for (let i = boundaries.length - 1; i >= 0; i--) {
    const b = boundaries[i]
    if (month > b.month || (month === b.month && day >= b.day)) {
      return b.zhiIdx
    }
  }
  return 0
}

function getMonthGanZhi(year: number, month: number, day: number): [string, string] {
  const yearGan = ((year - 4) % 10 + 10) % 10
  const monthGanStart = ((yearGan % 5) * 2 + 2) % 10
  const zhiIdx = getBaziMonthZhiIdx(month, day)
  const baziMonthOffset = (zhiIdx - 2 + 12) % 12
  const ganIdx = ((monthGanStart + baziMonthOffset) % 10 + 10) % 10
  return [TIAN_GAN[ganIdx], DI_ZHI[zhiIdx]]
}

function getDayGanZhi(year: number, month: number, day: number): [string, string] {
  const refDate = Date.UTC(2024, 0, 1)
  const targetDate = Date.UTC(year, month - 1, day)
  const diffDays = Math.round((targetDate - refDate) / (24 * 60 * 60 * 1000))
  const ganIdx = ((diffDays % 10) + 10) % 10
  const zhiIdx = ((diffDays % 12) + 12) % 12
  return [TIAN_GAN[ganIdx], DI_ZHI[zhiIdx]]
}

function getHourGanZhi(dayGan: string, hour: number): [string, string] {
  const dayGanIdx = TIAN_GAN.indexOf(dayGan)
  const zhiIdx = Math.floor((hour + 1) / 2) % 12
  const ganIdx = ((dayGanIdx % 5) * 2 + zhiIdx) % 10
  return [TIAN_GAN[ganIdx], DI_ZHI[zhiIdx]]
}

function getLikesAndDislikes(wuxing: string): { likes: string[], dislikes: string[] } {
  const relations: Record<string, { likes: string[], dislikes: string[] }> = {
    '木': { likes: ['水', '火'], dislikes: ['金', '土'] },
    '火': { likes: ['木', '土'], dislikes: ['水', '金'] },
    '土': { likes: ['火', '金'], dislikes: ['木', '水'] },
    '金': { likes: ['土', '水'], dislikes: ['火', '木'] },
    '水': { likes: ['金', '木'], dislikes: ['土', '火'] },
  }
  return relations[wuxing] || { likes: ['土'], dislikes: ['水'] }
}

function getCouplePalace(dayBranch: string): string {
  const palaceMap: Record<string, string> = {
    '子': '子水玄武，主智慧灵动，配偶聪慧善变',
    '丑': '丑土勾陈，主稳重踏实，配偶可靠务实',
    '寅': '寅木青龙，主志向远大，配偶积极进取',
    '卯': '卯木朱雀，主温和有礼，配偶善解人意',
    '辰': '辰土青龙，主才华横溢，配偶独立自主',
    '巳': '巳火螣蛇，主热情奔放，配偶魅力四射',
    '午': '午火朱雀，主光明磊落，配偶热情开朗',
    '未': '未土太常，主温和敦厚，配偶包容体贴',
    '申': '申金白虎，主果断干练，配偶独立要强',
    '酉': '酉金太阴，主精致优雅，配偶品味出众',
    '戌': '戌土天空，主豪爽大方，配偶重情重义',
    '亥': '亥水天后，主浪漫多情，配偶温柔体贴',
  }
  return palaceMap[dayBranch] || '未知'
}

function getPillarInterpretation(stem: string, branch: string, pillarIndex: number): string {
  const stemWuxing = WU_XING[TIAN_GAN.indexOf(stem)]
  const branchWuxing = ZHI_WUXING[branch] || '土'
  const zangGans = ZANG_GAN[branch] || []
  const zangWuxing = zangGans.map(g => WU_XING[TIAN_GAN.indexOf(g)])

  const pillarType = PILLAR_NAMES[pillarIndex]
  const stemEmoji = WUXING_EMOJI[stemWuxing] || '✨'
  const branchEmoji = WUXING_EMOJI[branchWuxing] || '✨'

  let interp = `${pillarType}：天干 ${stem}（${stemWuxing}${stemEmoji}），地支 ${branch}（${branchWuxing}${branchEmoji}）`
  if (zangGans.length > 0) {
    interp += `，藏干 ${zangGans.join('、')}（${zangWuxing.join('、')}）`
  }
  return interp
}

function getElementDistribution(fiveElements: string[]): Record<string, number> {
  const dist: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 }
  fiveElements.forEach(e => { if (dist[e] !== undefined) dist[e]++ })
  return dist
}

function getWuxingRelationForElements(elements: string[]): { shengCycles: string[], keCycles: string[], summary: string } {
  const shengCycles: string[] = []
  const keCycles: string[] = []

  for (let i = 0; i < elements.length - 1; i++) {
    const current = elements[i]
    const next = elements[i + 1]
    if (WUXING_SHENG[current] === next) {
      shengCycles.push(`${current}生${next}`)
    }
    if (WUXING_KE[current] === next) {
      keCycles.push(`${current}克${next}`)
    }
  }

  const dist = getElementDistribution(elements)
  const dominant = Object.entries(dist).filter(([, v]) => v > 0).map(([k]) => k)

  let summary = ''
  if (dominant.length >= 3) {
    summary = `你的八字五行分布较为均衡，拥有${dominant.join('、')}等多种元素，性格多元而富有弹性。`
  } else if (dominant.length === 2) {
    summary = `你的八字以${dominant.join('、')}为主，性格特质鲜明，专注而深刻。`
  } else {
    summary = `你的八字${dominant[0]}元素极旺，性格中${dominant[0]}的特质非常突出，纯粹而强大。`
  }

  return { shengCycles, keCycles, summary }
}

function getDetailedCouplePalace(dayBranch: string): { summary: string, detailed: string } {
  const base = getCouplePalace(dayBranch)

  const details: Record<string, string> = {
    '子': '你的另一半很可能聪明机灵、反应快，但情绪多变，需要你更多的包容和理解。你们的关系像水一样灵活多变，充满新鲜感。',
    '丑': '你的另一半踏实稳重、勤劳肯干，是典型的实干家。你们的关系基础牢固，虽然缺少一些浪漫，但胜在稳定长久。',
    '寅': '你的另一半有理想、有抱负，事业心强，可能会是一个领导者类型。你们的关系充满活力，彼此激励共同成长。',
    '卯': '你的另一半温文尔雅、待人友善，是典型的好好先生/小姐。你们的关系和谐温馨，像春风一样舒适自然。',
    '辰': '你的另一半才华横溢、独立自主，有自己的事业和追求。你们的关系是强强联合，彼此欣赏、互相成就。',
    '巳': '你的另一半热情似火、魅力四射，在人群中总是焦点。你们的关系热烈而充满激情，但也需要学会给彼此空间。',
    '午': '你的另一半光明磊落、热情开朗，是阳光型人格。你们的关系明亮温暖，像正午的阳光一样充满正能量。',
    '未': '你的另一半温和敦厚、包容体贴，是治愈系伴侣。你们的关系像大地一样包容，给你满满的安全感。',
    '申': '你的另一半果断干练、独立要强，是行动派代表。你们的关系相互独立又彼此依赖，是现代伴侣的典范。',
    '酉': '你的另一半精致优雅、品味出众，对生活品质有很高要求。你们的关系讲究情调和仪式感，生活精致美好。',
    '戌': '你的另一半豪爽大方、重情重义，是讲义气的人。你们的关系坦诚直接，肝胆相照，是令人羡慕的一对。',
    '亥': '你的另一半浪漫多情、温柔体贴，是理想中的完美伴侣。你们的关系如沐春风，温柔而深刻。',
  }

  return {
    summary: base,
    detailed: details[dayBranch] || '你的感情世界丰富多彩，充满了未知和可能。',
  }
}

export interface EnhancedBaziInfo extends BaziInfo {
  pillarInterpretations: string[]
  elementDistribution: Record<string, number>
  wuxingRelation: { shengCycles: string[], keCycles: string[], summary: string }
  dayMasterPersonality: string
  detailedCouplePalace: { summary: string, detailed: string }
  wuxingBalanceScore: number
}

export function calculateBazi(year: number, month: number, day: number, hour: number | null): BaziInfo {
  const [yGan, yZhi] = getYearGanZhi(year)
  const [mGan, mZhi] = getMonthGanZhi(year, month, day)
  const [dGan, dZhi] = getDayGanZhi(year, month, day)

  const effectiveHour = hour !== null ? hour : 12
  const [hGan, hZhi] = getHourGanZhi(dGan, effectiveHour)

  const stems = [yGan, mGan, dGan, hGan]
  const branches = [yZhi, mZhi, dZhi, hZhi]

  const wuxingElements = stems.map((s) => WU_XING[TIAN_GAN.indexOf(s)])
  const dayMaster = wuxingElements[2]

  const dayMasterWuxing = dayMaster
  const { likes, dislikes } = getLikesAndDislikes(dayMasterWuxing)

  const couplePalace = getCouplePalace(dZhi)

  return {
    heavenlyStems: stems,
    earthlyBranches: branches,
    fiveElements: wuxingElements,
    dayMaster: dayMasterWuxing,
    likes,
    dislikes,
    couplePalace,
  }
}

export function getEnhancedBaziInfo(bazi: BaziInfo): EnhancedBaziInfo {
  const pillarInterpretations = bazi.heavenlyStems.map((stem, i) =>
    getPillarInterpretation(stem, bazi.earthlyBranches[i], i)
  )

  const elementDistribution = getElementDistribution(bazi.fiveElements)
  const wuxingRelation = getWuxingRelationForElements(bazi.fiveElements)
  const dayMasterPersonality = DAY_MASTER_PERSONALITY[bazi.dayMaster] || '你的性格独特而多元，难以用单一标签定义。'
  const detailedCouplePalace = getDetailedCouplePalace(bazi.earthlyBranches[2])

  const uniqueElements = Object.values(elementDistribution).filter(v => v > 0).length
  const wuxingBalanceScore = Math.round((uniqueElements / 5) * 100)

  return {
    ...bazi,
    pillarInterpretations,
    elementDistribution,
    wuxingRelation,
    dayMasterPersonality,
    detailedCouplePalace,
    wuxingBalanceScore,
  }
}

export { WUXING_COLORS, WUXING_EMOJI }
