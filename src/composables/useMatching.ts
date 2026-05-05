import type { CityResult, Answer, BaziInfo } from '../types'
import { cities, cityPersonalities } from '../data/cities'
import { questions } from '../data/questions'

function getPersonalityTag(scores: Record<string, number>): string {
  const topCityId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  const personalities = cityPersonalities[topCityId]
  if (personalities && personalities.length > 0) {
    return personalities[0].tag
  }
  return '城市探索家'
}

export function calculateResults(answers: Answer[], baziInfo: BaziInfo | null, gender: string) {
  const scores: Record<string, number> = {}

  cities.forEach((city) => {
    scores[city.id] = 0
  })

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId)
    if (!question) return

    const option = question.options.find((o) => o.value === answer.selectedValue)
    if (!option) return

    Object.entries(option.scores).forEach(([cityId, score]) => {
      if (scores[cityId] !== undefined) {
        scores[cityId] += score
      }
    })
  })

  const maxScore = Math.max(...Object.values(scores))
  const normalizedScores: Record<string, number> = {}
  Object.entries(scores).forEach(([cityId, score]) => {
    normalizedScores[cityId] = Math.round((score / maxScore) * 100)
  })

  if (baziInfo) {
    cities.forEach((city) => {
      const matchCount = city.baziPreference.filter((elem) =>
        baziInfo.likes.includes(elem)
      ).length
      normalizedScores[city.id] = Math.min(100, normalizedScores[city.id] + matchCount * 5)
    })
  }

  if (gender === 'female') {
    const feminineCities = ['suzhou', 'hangzhou', 'kunming', 'nanjing', 'chengdu']
    feminineCities.forEach((id) => {
      if (normalizedScores[id]) {
        normalizedScores[id] += 3
      }
    })
  } else {
    const masculineCities = ['beijing', 'shenzhen', 'chongqing', 'xian']
    masculineCities.forEach((id) => {
      if (normalizedScores[id]) {
        normalizedScores[id] += 3
      }
    })
  }

  const sorted = Object.entries(normalizedScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  const topResults: CityResult[] = sorted.map(([cityId, score], idx) => {
    const city = cities.find((c) => c.id === cityId)!
    const reasons = [
      `你和${city.name}的灵魂契合度高达 ${score}%！${city.emoji} 你的生活方式和价值观与这座城市的气质不谋而合～`,
      `${city.emoji} ${city.name}的节奏和你的性格简直是天生一对！在这里你一定能找到属于自己的小确幸💕`,
      `根据你的测评结果，${city.name}就是你的本命城市！${city.emoji} 在这里你会感觉像回家一样自在～`,
    ]
    return {
      city,
      matchPercentage: score,
      reason: reasons[idx] || reasons[0],
    }
  })

  const personalityTag = getPersonalityTag(normalizedScores)

  return {
    topResults,
    personalityTag,
    allScores: normalizedScores,
    baziInfo,
  }
}

export type Results = ReturnType<typeof calculateResults>
