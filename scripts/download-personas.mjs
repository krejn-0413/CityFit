import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

const cities = [
  { id: 'chengdu', name: '成都', tag: '躺平熊猫人', prompt: 'Anime character sitting in bamboo tea house, holding tea cup, panda plush toy, relaxed happy expression, warm cozy lighting, soft colors' },
  { id: 'shanghai', name: '上海', tag: '精致卷王', prompt: 'Anime young professional at the Bund, city skyline at dusk, business casual outfit, windblown hair, confident pose' },
  { id: 'beijing', name: '北京', tag: '局气老炮儿', prompt: 'Anime character in Beijing hutong, red lanterns, confident smile, casual traditional wear, warm golden light' },
  { id: 'hangzhou', name: '杭州', tag: '西湖划水大师', prompt: 'Anime person by West Lake, holding umbrella, willow trees, misty lake, hanfu-inspired clothes, soft green palette' },
  { id: 'shenzhen', name: '深圳', tag: '搞钱特种兵', prompt: 'Anime young entrepreneur in tech park, holographic device, sneakers and hoodie, neon blue accents, energetic pose' },
  { id: 'chongqing', name: '重庆', tag: '火锅喷射战士', prompt: 'Anime character on monorail through building, holding spicy hotpot, neon signs, bold red colors, dynamic view' },
  { id: 'xian', name: '西安', tag: '大唐摸鱼王', prompt: 'Anime character biking on ancient city wall, pagoda in sunset, scarf flowing, warm earthy tones, relaxed vibe' },
  { id: 'kunming', name: '昆明', tag: '春城花心大少', prompt: 'Anime person with flowers, feeding seagulls by lake, cherry blossoms, flowy pastel clothes, soft sunlight' },
  { id: 'guangzhou', name: '广州', tag: '早茶专业户', prompt: 'Anime character at dim sum restaurant, bamboo steamers, drinking tea, happy expression, warm morning light' },
  { id: 'sanya', name: '三亚', tag: '沙滩咸鱼王', prompt: 'Anime person on sunny beach, holding coconut, casual beachwear, palm trees, ocean waves, bright colors' },
  { id: 'nanjing', name: '南京', tag: '梧桐树下文艺混子', prompt: 'Anime person walking under sycamore trees, holding book, autumn leaves falling, vintage style, poetic mood' },
  { id: 'dali', name: '大理', tag: '辞职专业户', prompt: 'Anime person on grassy hill overlooking lake, mountains in mist, bohemian dress, guitar, golden sunset' },
  { id: 'changsha', name: '长沙', tag: '夜宵战神', prompt: 'Anime person at night market, holding crayfish skewers, neon signs, laughing, steam from food, warm night' },
  { id: 'suzhou', name: '苏州', tag: '园林躺平学博士', prompt: 'Anime character in classical garden, pavilion, drinking tea, koi pond, elegant dress, bamboo, peaceful vibe' },
  { id: 'qingdao', name: '青岛', tag: '哈啤酒肚腩潜力股', prompt: 'Anime person on pier, holding bag of beer, ocean breeze, European buildings, relaxed happy, seaside' },
  { id: 'lasa', name: '拉萨', tag: '缺氧文艺青年', prompt: 'Anime character before Potala Palace, Tibetan clothing, prayer flags, snow mountains, golden sunset, spiritual vibe' },
  { id: 'wuhan', name: '武汉', tag: '过早碳水狂魔', prompt: 'Anime character by Yangtze River bridge, holding bowl of hot dry noodles, heroic pose, misty river, warm light' },
  { id: 'xiamen', name: '厦门', tag: '文艺青年', prompt: 'Anime person cycling on coastal road, island in distance, sunset, summer dress, straw hat, seabirds' },
  { id: 'dalian', name: '大连', tag: '海蛎子味老铁', prompt: 'Anime character on coastal boardwalk, Russian architecture, waves, autumn coat, windblown hair, cinematic mood' },
  { id: 'harbin', name: '哈尔滨', tag: '冰雪大冤种', prompt: 'Anime person in ice world, glowing ice sculptures, thick winter coat, fur hat, snowflakes, magical blue lighting' },
  { id: 'tianjin', name: '天津', tag: '相声气氛组', prompt: 'Anime person laughing in tea house, watching crosstalk, holding jianbing, traditional interior, warm cozy' },
  { id: 'guiyang', name: '贵阳', tag: '山里蹲代码仔', prompt: 'Anime character in green mountain city, laptop surrounded by nature, misty hills, modern meets nature vibe' },
  { id: 'lanzhou', name: '兰州', tag: '牛大碳水杀手', prompt: 'Anime person at noodle shop, holding big bowl of beef noodles, Yellow River view, hearty expression' },
  { id: 'shenyang', name: '沈阳', tag: '东北纯爷们', prompt: 'Anime character at imperial palace in snow, red walls, winter coat, confident stance, dramatic sky' },
  { id: 'jinan', name: '济南', tag: '泉水泡jio达人', prompt: 'Anime person by spring, clear water bubbling, lotus lake, traditional summer outfit, fan, fresh green tones' },
  { id: 'luoyang', name: '洛阳', tag: '牡丹花下酒鬼', prompt: 'Anime character in peony garden, Longmen Grottoes in distance, hanfu robe, holding flower, imperial aesthetic' },
  { id: 'guilin', name: '桂林', tag: '甲天下摸鱼圣手', prompt: 'Anime person on bamboo raft, karst mountains, misty river, bamboo hat, traditional clothes, ink painting style' },
  { id: 'zhuhai', name: '珠海', tag: '养老预备军', prompt: 'Anime person cycling on Lovers Road, ocean view, palm trees, summer dress, sunshine, relaxed happy vibe' },
  { id: 'hohhot', name: '呼和浩特', tag: '草原烤肉王子', prompt: 'Anime character on grassland, Mongolian robe, holding milk tea, horses and yurt, blue sky, epic landscape' },
  { id: 'zhengzhou', name: '郑州', tag: '中原跑腿小哥', prompt: 'Anime person at Shaolin Temple, martial arts pose, autumn leaves, sporty outfit, energetic, golden colors' },
  { id: 'nanchang', name: '南昌', tag: '瓦罐汤干饭王', prompt: 'Anime character at Pavilion of Prince Teng, overlook river sunset, holding brush, traditional scholar robe' },
  { id: 'hefei', name: '合肥', tag: '科创死宅技术宅', prompt: 'Anime person on Science Island, lake sunset, holding beaker, glasses, lab coat, intellectual thoughtful look' },
]

const OUTPUT_DIR = path.resolve('public/assets/personas')
const CONCURRENCY = 1
const TIMEOUT_MS = 120000
const DELAY_BETWEEN_MS = 5000

function buildUrl(city) {
  const fullPrompt = `anime portrait ${city.prompt}, cute style, high quality, bright colors, clean background`
  const seed = hashCode(city.tag + city.name)
  const base = 'https://image.pollinations.ai/prompt/'
  const encoded = encodeURIComponent(fullPrompt)
  return `${base}${encoded}?width=512&height=512&seed=${seed}&nologo=true`
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const protocol = url.startsWith('https') ? https : http

    const options = {
      timeout: TIMEOUT_MS,
      rejectUnauthorized: false,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }
    const req = protocol.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        const stats = fs.statSync(dest)
        if (stats.size === 0) {
          fs.unlinkSync(dest)
          reject(new Error('Empty file'))
        } else {
          resolve()
        }
      })
    })

    req.on('timeout', () => {
      req.destroy()
      file.close()
      try { if (fs.existsSync(dest)) fs.unlinkSync(dest) } catch {}
      reject(new Error('Timeout'))
    })

    req.on('error', (err) => {
      file.close()
      try { if (fs.existsSync(dest)) fs.unlinkSync(dest) } catch {}
      reject(err)
    })

    req.on('close', () => {
      try { if (fs.existsSync(dest) && fs.statSync(dest).size === 0) fs.unlinkSync(dest) } catch {}
    })
  })
}

async function downloadWithRetry(city, retries = 3) {
  const dest = path.join(OUTPUT_DIR, `${city.id}.png`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { city: city.id, status: 'skipped (exists)' }
  }

  const url = buildUrl(city)
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await download(url, dest)
      return { city: city.id, status: 'ok' }
    } catch (err) {
      const isRateLimit = err.message === 'HTTP 429'
      const delay = isRateLimit ? 10000 * (attempt + 1) : 3000 * (attempt + 1)
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, delay))
      } else {
        return { city: city.id, status: `failed: ${err.message}` }
      }
    }
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║  CityFit - 预生成城市人格画像                     ║')
  console.log(`║  总共 ${cities.length} 座城市 · 并发 ${CONCURRENCY} 线程            ║`)
  console.log('╚══════════════════════════════════════════════╝')
  console.log()

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const results = []
  const queue = [...cities]

  async function worker() {
    while (queue.length > 0) {
      const city = queue.shift()
      process.stdout.write(`  [${cities.length - queue.length}/${cities.length}] ${city.name} (${city.tag})... `)
      const result = await downloadWithRetry(city)
      process.stdout.write(result.status === 'ok' ? '✅\n' : result.status.startsWith('skipped') ? '⏭️\n' : `❌ ${result.status}\n`)
      results.push(result)
      if (queue.length > 0) {
        await new Promise(r => setTimeout(r, DELAY_BETWEEN_MS))
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker())
  await Promise.all(workers)

  const ok = results.filter(r => r.status === 'ok').length
  const skipped = results.filter(r => r.status.startsWith('skipped')).length
  const failed = results.filter(r => !r.status.startsWith('ok') && !r.status.startsWith('skipped')).length

  console.log()
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║  完成！                                       ║')
  console.log(`║  ✅ 成功: ${ok}   ⏭️ 已存在: ${skipped}   ❌ 失败: ${failed}       ║`)
  console.log('╚══════════════════════════════════════════════╝')

  if (failed > 0) {
    console.log('\n失败的城市:')
    results.filter(r => !r.status.startsWith('ok') && !r.status.startsWith('skipped')).forEach(r => {
      console.log(`  ❌ ${r.city}: ${r.status}`)
    })
    process.exit(1)
  }
}

main()
