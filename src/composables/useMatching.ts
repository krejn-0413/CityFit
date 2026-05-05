import type { CityResult, Answer, BaziInfo } from '../types'
import { cities } from '../data/cities'
import { questions } from '../data/questions'

function getPersonalityTag(scores: Record<string, number>): string {
  const tagMap: Record<string, string[]> = {
    chengdu: ['温暖奶茶社牛 🧋', '佛系养生达人 🧘', '巴适生活家 😌'],
    shanghai: ['精致都市丽人 💅', '野心勃勃打工人 💼', '魔都潮流先锋 🕶️'],
    beijing: ['大气豪爽北漂 💪', '文化深度爱好者 📚', '事业单位香饽饽 🏛️'],
    hangzhou: ['文艺码农 👨‍💻', '西湖边散步家 🚶', '茶系青年 🍵'],
    shenzhen: ['拼命三郎创业者 🦾', '搞钱先锋 💰', '科技极客 🤖'],
    chongqing: ['火辣热情山城人 🌶️', '魔幻现实主义爱好者 🏙️', '火锅终极信徒 🍲'],
    xian: ['历史考古迷 🏛️', '碳水爱好者 🥟', '古风达人 🎭'],
    kunming: ['花系治愈青年 🌸', '慢生活倡导者 🐢', '自然爱好者 🌿'],
    guangzhou: ['早茶品鉴大师 🥟', '务实生活家 🏠', '烟火气满满 🔥'],
    sanya: ['阳光沙滩爱好者 ☀️', '度假模式常开 🏖️', '热带岛屿灵魂 🌴'],
    nanjing: ['温润如玉书生 📖', '梧桐树下漫步者 🍂', '历史温柔乡 🏯'],
    dali: ['文艺治愈系 🎨', '逃离城市派 🏔️', '自由灵魂 🕊️'],
    changsha: ['夜宵战神 🍢', '娱乐至上快乐星人 🎉', '网红打卡先锋 📸'],
    suzhou: ['精致江南雅士 🎋', '园林艺术家 🎨', '水乡温柔乡 💧'],
    qingdao: ['啤酒社交达人 🍺', '海边漫步者 🌊', '欧式风情爱好者 🏰'],
    lasa: ['心灵修行者 🙏', '纯净灵魂 💎', '雪山朝圣者 ⛰️'],
  }
  const topCity = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const tags = tagMap[topCity[0]]
  return tags ? tags[Math.floor(Math.random() * tags.length)] : '城市探索家 🗺️'
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
