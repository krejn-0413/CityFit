import { describe, it, expect } from 'vitest'
import { calculateResults } from '../composables/useMatching'
import type { Answer, BaziInfo } from '../types'
import { cities } from '../data/cities'
import { questions } from '../data/questions'

// 模拟真实答题：每个问题的选项按倾向选择
function answerAll(cityBias: string): Answer[] {
  return questions.map((q) => {
    // 选对该城市得分最高的选项，若无则选第一个
    let bestOption = q.options[0]
    let bestScore = -1
    for (const opt of q.options) {
      const s = opt.scores[cityBias] ?? 0
      if (s > bestScore) {
        bestScore = s
        bestOption = opt
      }
    }
    return { questionId: q.id, selectedValue: bestOption.value }
  })
}

const nullBazi: BaziInfo | null = null

describe('calculateResults 匹配算法', () => {
  it('所有 32 个城市都在 scores 中出现（无死城）', () => {
    // 构造一份混合各种倾向的答卷，确保所有城市都能得到分
    const mixedAnswers: Answer[] = questions.map((q) => {
      // 选一个覆盖最多不同城市的选项
      let best = q.options[0]
      let most = Object.keys(best.scores).length
      for (const opt of q.options) {
        const count = Object.keys(opt.scores).length
        if (count > most) {
          most = count
          best = opt
        }
      }
      return { questionId: q.id, selectedValue: best.value }
    })
    const result = calculateResults(mixedAnswers, nullBazi, 'male')
    const allCityIds = cities.map((c) => c.id)
    for (const id of allCityIds) {
      expect(result.allScores[id]).toBeDefined()
    }
  })

  it('所有匹配分在 0-100 范围内', () => {
    const answers = answerAll('chengdu')
    const result = calculateResults(answers, nullBazi, 'male')
    for (const score of Object.values(result.allScores)) {
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    }
  })

  it('topResults 返回 3 个结果', () => {
    const answers = answerAll('beijing')
    const result = calculateResults(answers, nullBazi, 'male')
    expect(result.topResults).toHaveLength(3)
  })

  it('topResults 每项都包含 city, matchPercentage, reason', () => {
    const answers = answerAll('shanghai')
    const result = calculateResults(answers, nullBazi, 'male')
    for (const r of result.topResults) {
      expect(r.city).toBeDefined()
      expect(r.city.name).toBeDefined()
      expect(typeof r.matchPercentage).toBe('number')
      expect(typeof r.reason).toBe('string')
    }
  })

  it('成都和重庆可以独立排第一（解耦验证）', () => {
    // 选成都倾向的答案
    const chengduAnswers = answerAll('chengdu')
    const chengduResult = calculateResults(chengduAnswers, nullBazi, 'male')
    const chengduTop = chengduResult.topResults[0]
    expect(chengduTop.city.id).toBe('chengdu')

    // 选重庆倾向的答案
    const chongqingAnswers = answerAll('chongqing')
    const chongqingResult = calculateResults(chongqingAnswers, nullBazi, 'male')
    const chongqingTop = chongqingResult.topResults[0]
    expect(chongqingTop.city.id).toBe('chongqing')
  })

  it('大理和昆明可以独立排第一（解耦验证）', () => {
    const daliAnswers = answerAll('dali')
    const daliResult = calculateResults(daliAnswers, nullBazi, 'male')
    expect(daliResult.topResults[0].city.id).toBe('dali')

    const kunmingAnswers = answerAll('kunming')
    const kunmingResult = calculateResults(kunmingAnswers, nullBazi, 'male')
    expect(kunmingResult.topResults[0].city.id).toBe('kunming')
  })

  it('八字加成为乘性（不超过合理上限）', () => {
    const baziInfo: BaziInfo = {
      heavenlyStems: ['甲', '丙', '戊', '庚'],
      earthlyBranches: ['子', '寅', '辰', '午'],
      fiveElements: ['木', '火', '土', '金'],
      dayMaster: '甲',
      likes: ['木', '火', '土', '金', '水'],
      dislikes: [],
      couplePalace: '申',
    }
    const answers = answerAll('beijing')
    const result = calculateResults(answers, baziInfo, 'male')
    // 即使八字全部匹配，乘性加成也应控制在合理范围
    for (const score of Object.values(result.allScores)) {
      expect(score).toBeLessThanOrEqual(100)
    }
  })

  it('无八字信息时也能正常匹配', () => {
    const answers = answerAll('shenzhen')
    const result = calculateResults(answers, nullBazi, 'male')
    expect(result.topResults).toHaveLength(3)
  })

  it('无答题时返回 fallback 结果', () => {
    const result = calculateResults([], nullBazi, 'male')
    expect(result.topResults).toHaveLength(3)
    expect(result.personalityTag).toBe('城市探索家')
    for (const r of result.topResults) {
      expect(r.matchPercentage).toBe(0)
      expect(r.reason).toBe('')
    }
  })

  it('去性别偏差后男女答题结果一致', () => {
    const answers = answerAll('nanjing')
    const maleResult = calculateResults(answers, nullBazi, 'male')
    const femaleResult = calculateResults(answers, nullBazi, 'female')
    // 无八字的纯问答，男女结果应相同
    for (let i = 0; i < 3; i++) {
      expect(maleResult.topResults[i].city.id).toBe(femaleResult.topResults[i].city.id)
      expect(maleResult.topResults[i].matchPercentage).toBe(femaleResult.topResults[i].matchPercentage)
    }
  })
})
