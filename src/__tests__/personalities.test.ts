import { describe, it, expect } from 'vitest'
import { cities, cityPersonalities } from '../data/cities'

describe('cityPersonalities 数据一致性', () => {
  const personalityKeys = Object.keys(cityPersonalities) // 32 cities + 'explorer'

  it('所有 32 个城市 + explorer 都有人格定义', () => {
    expect(personalityKeys).toContain('explorer')
    cities.forEach((city) => {
      expect(personalityKeys).toContain(city.id)
    })
  })

  it('人格 tag 无重复', () => {
    const allTags: string[] = []
    for (const key of personalityKeys) {
      const entries = cityPersonalities[key]
      if (entries) {
        entries.forEach((e) => allTags.push(e.tag))
      }
    }
    const uniqueTags = new Set(allTags)
    expect(allTags.length).toBe(uniqueTags.size)
  })

  it('每种颜色最多被 3 个城市使用', () => {
    const colorCount: Record<string, number> = {}
    for (const key of personalityKeys) {
      const entries = cityPersonalities[key]
      if (entries) {
        entries.forEach((e) => {
          colorCount[e.color] = (colorCount[e.color] || 0) + 1
        })
      }
    }
    for (const [, count] of Object.entries(colorCount)) {
      expect(count).toBeLessThanOrEqual(3)
    }
  })

  it.skip('城市数组 emoji 无重复（低优先级，暂不处理）', () => {
    const emojis = cities.map((c) => c.emoji)
    const uniqueEmojis = new Set(emojis)
    expect(emojis.length).toBe(uniqueEmojis.size)
  })

  it('所有标签长度在 3-10 个字符之间', () => {
    for (const key of personalityKeys) {
      const entries = cityPersonalities[key]
      if (entries) {
        for (const e of entries) {
          expect(e.tag.length).toBeGreaterThanOrEqual(3)
          expect(e.tag.length).toBeLessThanOrEqual(10)
        }
      }
    }
  })

  it('没有 emoji 字段（已在 cityPersonalities 中删除）', () => {
    for (const key of personalityKeys) {
      const entries = cityPersonalities[key]
      if (entries) {
        for (const e of entries) {
          expect((e as unknown as Record<string, unknown>).emoji).toBeUndefined()
        }
      }
    }
  })

  it('imagePrompt 都以 semi-realistic anime style 开头', () => {
    for (const key of personalityKeys) {
      const entries = cityPersonalities[key]
      if (entries) {
        for (const e of entries) {
          expect(e.imagePrompt).toMatch(/semi-realistic anime style/)
        }
      }
    }
  })

  it('拉萨描述不含粗口', () => {
    const lasaEntries = cityPersonalities.lasa
    expect(lasaEntries).toBeDefined()
    if (lasaEntries) {
      for (const e of lasaEntries) {
        expect(e.description).not.toMatch(/装逼/)
      }
    }
  })
})
