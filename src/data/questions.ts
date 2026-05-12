import type { Question } from '../types'

export const questions: Question[] = [
  {
    id: 1,
    text: '周末早上醒来，你第一反应是？',
    category: 'spiritual',
    options: [
      { label: '🥱 再睡五分钟...然后就中午了', value: 'sleep', scores: { chengdu: 2, dali: 2, kunming: 2, suzhou: 1, jinan: 1, zhuhai: 1 } },
      { label: '☕ 起来喝杯咖啡，开启精致一天', value: 'coffee', scores: { shanghai: 3, hangzhou: 2, nanjing: 1, shenzhen: 1, xiamen: 1, tianjin: 1 } },
      { label: '🏃 起来运动！生命在于折腾', value: 'sport', scores: { shenzhen: 3, beijing: 2, qingdao: 2, guangzhou: 1, dalian: 1, hefei: 1 } },
      { label: '📱 躺着刷手机，这才是人生', value: 'phone', scores: { changsha: 2, chengdu: 2, chongqing: 2, xian: 1, shenyang: 1, guiyang: 1 } },
    ],
  },
  {
    id: 2,
    text: '朋友约饭，你首选什么类型？',
    category: 'material',
    options: [
      { label: '🔥 麻辣火锅！没有什么是一顿火锅解决不了的', value: 'hotpot', scores: { chongqing: 3, chengdu: 2, changsha: 2, xian: 1, wuhan: 2, guiyang: 1 } },
      { label: '🥟 地道本地菜，讲究！', value: 'local', scores: { guangzhou: 3, beijing: 2, nanjing: 2, suzhou: 2, lanzhou: 2, dali: 2 } },
      { label: '🌮 异国料理，探索新口味', value: 'foreign', scores: { shanghai: 3, shenzhen: 2, hangzhou: 1, qingdao: 1, dalian: 1, xiamen: 1 } },
      { label: '🥗 轻食健康餐，我得管理身材', value: 'healthy', scores: { kunming: 3, shenzhen: 2, hangzhou: 2, dali: 1, jinan: 1, zhuhai: 1 } },
    ],
  },
  {
    id: 3,
    text: '你对工作的态度是？',
    category: 'material',
    options: [
      { label: '💪 搞钱第一！我要奋斗我要暴富', value: 'money', scores: { shenzhen: 3, shanghai: 2, beijing: 2, guangzhou: 2, hefei: 2, zhengzhou: 1 } },
      { label: '⚖️ 工作生活平衡，拒绝内卷', value: 'balance', scores: { chengdu: 3, kunming: 2, hangzhou: 2, nanjing: 2, jinan: 1, zhuhai: 1 } },
      { label: '🎨 做自己喜欢的事，钱不钱的无所谓', value: 'passion', scores: { dali: 3, lasa: 2, suzhou: 2, xian: 1, kunming: 1, guilin: 1 } },
      { label: '🏠 躺平就是我的终极目标', value: 'lieflat', scores: { chengdu: 2, dali: 2, chongqing: 1, kunming: 2, sanya: 1, guiyang: 1 } },
    ],
  },
  {
    id: 4,
    text: '如果有一笔闲钱，你会？',
    category: 'material',
    options: [
      { label: '🏠 买房！安全感是第一位的', value: 'house', scores: { beijing: 3, shanghai: 2, nanjing: 2, suzhou: 1, tianjin: 1, shenyang: 1 } },
      { label: '✈️ 环游世界！及时行乐', value: 'travel', scores: { dali: 2, sanya: 3, kunming: 3, lasa: 2, guilin: 2, hohhot: 1 } },
      { label: '📈 投资理财，钱生钱', value: 'invest', scores: { shenzhen: 3, shanghai: 3, hangzhou: 2, guangzhou: 1, hefei: 2, zhengzhou: 1 } },
      { label: '🍜 全部拿来吃！人生苦短', value: 'food', scores: { chengdu: 3, chongqing: 2, changsha: 2, guangzhou: 2, wuhan: 2, lanzhou: 1 } },
    ],
  },
  {
    id: 5,
    text: '你理想的社交状态是？',
    category: 'spiritual',
    options: [
      { label: '🎉 派对动物！人多才热闹', value: 'party', scores: { shanghai: 3, changsha: 3, shenzhen: 2, beijing: 2, tianjin: 1, xiamen: 1 } },
      { label: '👥 三五好友，小聚怡情', value: 'smallgroup', scores: { chengdu: 2, hangzhou: 2, nanjing: 2, suzhou: 1, dalian: 1, guiyang: 1 } },
      { label: '☕ 一对一深度聊天最舒服', value: 'deepchat', scores: { dali: 2, kunming: 2, suzhou: 2, xian: 1, jinan: 1, zhuhai: 1 } },
      { label: '🐱 独处使我快乐，社交耗电', value: 'alone', scores: { lasa: 3, dali: 2, kunming: 2, nanjing: 1, guilin: 1, hohhot: 1 } },
    ],
  },
  {
    id: 6,
    text: '你相信玄学吗？',
    category: 'xuanxue',
    options: [
      { label: '🔮 深信不疑！每周都要看运势', value: 'believe', scores: { lasa: 3, xian: 2, chengdu: 2, chongqing: 1, luoyang: 2, guiyang: 1 } },
      { label: '🤔 半信半疑，但会看星座', value: 'half', scores: { hangzhou: 2, nanjing: 2, shanghai: 1, beijing: 1, jinan: 1, tianjin: 1 } },
      { label: '😅 宁可信其有，偶尔看看', value: 'casual', scores: { guangzhou: 2, chongqing: 2, shenzhen: 1, suzhou: 1, nanchang: 1, lanzhou: 1 } },
      { label: '🔬 我只相信科学！', value: 'science', scores: { shenzhen: 3, shanghai: 2, beijing: 2, hangzhou: 1, hefei: 2, zhengzhou: 1 } },
    ],
  },
  {
    id: 7,
    text: '什么样的天气让你最舒服？',
    category: 'spiritual',
    options: [
      { label: '☀️ 大晴天！心情瞬间变好', value: 'sunny', scores: { sanya: 3, kunming: 3, qingdao: 2, shenzhen: 2, lanzhou: 1, zhengzhou: 1 } },
      { label: '🌧️ 下雨天，窝在家里最有安全感', value: 'rainy', scores: { hangzhou: 3, chengdu: 2, suzhou: 2, nanjing: 2, guilin: 2, guiyang: 1 } },
      { label: '❄️ 下雪天！浪漫又唯美', value: 'snowy', scores: { beijing: 2, xian: 2, lasa: 2, harbin: 3, shenyang: 2, qingdao: 1 } },
      { label: '🍂 秋高气爽，不冷不热', value: 'cool', scores: { nanjing: 2, suzhou: 2, kunming: 2, dali: 2, hangzhou: 1, jinan: 1, wuhan: 1 } },
    ],
  },
  {
    id: 8,
    text: '你更向往哪种生活方式？',
    category: 'spiritual',
    options: [
      { label: '🏙️ 都市繁华，灯火璀璨', value: 'urban', scores: { shanghai: 3, shenzhen: 3, beijing: 2, guangzhou: 2, dalian: 1, tianjin: 1 } },
      { label: '🏘️ 小城故事，岁月静好', value: 'smalltown', scores: { dali: 2, suzhou: 2, kunming: 2, nanjing: 1, zhuhai: 2, xiamen: 1 } },
      { label: '🏔️ 自然山水，田园牧歌', value: 'nature', scores: { dali: 2, lasa: 2, guilin: 3, kunming: 2, guiyang: 1, hohhot: 1 } },
      { label: '🌊 海滨城市，面朝大海', value: 'seaside', scores: { sanya: 3, qingdao: 3, shanghai: 1, guangzhou: 1, dalian: 2, xiamen: 2 } },
    ],
  },
  {
    id: 9,
    text: '旅游时你更喜欢？',
    category: 'spiritual',
    options: [
      { label: '📸 网红景点打卡，拍照发朋友圈', value: 'checkin', scores: { changsha: 3, shanghai: 2, chengdu: 2, chongqing: 2, luoyang: 1, nanchang: 1 } },
      { label: '🚶 随意漫步，发现惊喜', value: 'wander', scores: { dali: 3, suzhou: 2, nanjing: 2, kunming: 1, guilin: 2, jinan: 1 } },
      { label: '📚 博物馆美术馆，文化之旅', value: 'culture', scores: { xian: 3, beijing: 3, nanjing: 2, kunming: 2, hangzhou: 1, luoyang: 2 } },
      { label: '🏄 户外运动，冒险刺激', value: 'adventure', scores: { sanya: 2, qingdao: 2, shenzhen: 1, lasa: 1, harbin: 2, wuhan: 1 } },
    ],
  },
  {
    id: 10,
    text: '你的衣柜里最多的颜色是？',
    category: 'xuanxue',
    options: [
      { label: '⬛ 黑白灰，经典永不过时', value: 'mono', scores: { shanghai: 3, shenzhen: 2, beijing: 2, hangzhou: 1, hefei: 1, tianjin: 1 } },
      { label: '🌈 彩色！我要做最靓的仔', value: 'colorful', scores: { changsha: 3, chongqing: 2, chengdu: 2, sanya: 2, xiamen: 1, nanchang: 1 } },
      { label: '💚 大地色系，自然舒适', value: 'earth', scores: { kunming: 3, dali: 2, suzhou: 2, nanjing: 1, guilin: 1, hohhot: 1 } },
      { label: '💙 蓝色系，忧郁又高级', value: 'blue', scores: { qingdao: 3, hangzhou: 2, xian: 1, guangzhou: 1, dalian: 2, harbin: 1 } },
    ],
  },
  {
    id: 11,
    text: '你觉得自己上辈子是？',
    category: 'xuanxue',
    options: [
      { label: '👑 皇宫里的贵人', value: 'noble', scores: { beijing: 3, xian: 3, nanjing: 2, luoyang: 2, shenyang: 1, zhengzhou: 1 } },
      { label: '🎋 山水间的隐士', value: 'hermit', scores: { dali: 2, kunming: 3, suzhou: 2, hangzhou: 1, guilin: 2, hohhot: 1 } },
      { label: '🚢 走南闯北的商人', value: 'merchant', scores: { shanghai: 3, guangzhou: 3, shenzhen: 2, chengdu: 1, tianjin: 1, wuhan: 1 } },
      { label: '🍜 快乐的小吃货', value: 'foodie', scores: { chengdu: 3, chongqing: 2, changsha: 2, guangzhou: 2, lanzhou: 2, nanchang: 1 } },
    ],
  },
  {
    id: 12,
    text: '你走路的速度通常是？',
    category: 'material',
    options: [
      { label: '🏃 带风！我赶时间', value: 'fast', scores: { shenzhen: 3, shanghai: 2, beijing: 2, guangzhou: 2, zhengzhou: 1, hefei: 1 } },
      { label: '🚶 正常速度，不急不躁', value: 'normal', scores: { hangzhou: 2, nanjing: 2, chengdu: 1, suzhou: 1, tianjin: 1, xiamen: 1 } },
      { label: '🌿 慢悠悠，边看风景边走', value: 'slow', scores: { dali: 2, kunming: 3, chengdu: 2, suzhou: 2, shenyang: 1, hohhot: 1 } },
      { label: '💃 走两步跳三步，开心最重要', value: 'dance', scores: { changsha: 3, chongqing: 2, chengdu: 2, sanya: 1, wuhan: 1, nanchang: 1 } },
    ],
  },
  {
    id: 13,
    text: '遇到压力时你会？',
    category: 'xuanxue',
    options: [
      { label: '🥘 大吃一顿！没有什么比美食更治愈', value: 'eat', scores: { chongqing: 3, chengdu: 2, changsha: 2, guangzhou: 2, wuhan: 2, lanzhou: 1 } },
      { label: '🧘 冥想/瑜伽/运动', value: 'meditate', scores: { dali: 2, kunming: 2, lasa: 3, suzhou: 1, guilin: 1, jinan: 1 } },
      { label: '🛍️ 购物！消费使我快乐', value: 'shop', scores: { shanghai: 3, shenzhen: 2, hangzhou: 1, guangzhou: 2, dalian: 1, tianjin: 1 } },
      { label: '🎮 打游戏/刷剧/放空', value: 'game', scores: { chengdu: 2, changsha: 2, chongqing: 1, shenzhen: 1, hefei: 2, nanchang: 1 } },
    ],
  },
  {
    id: 14,
    text: '你最喜欢的交通方式？',
    category: 'material',
    options: [
      { label: '🚇 地铁，方便快捷', value: 'metro', scores: { shanghai: 3, beijing: 3, shenzhen: 2, guangzhou: 2, zhengzhou: 2, hefei: 1 } },
      { label: '🚲 骑自行车/电动车，自由', value: 'bike', scores: { hangzhou: 3, kunming: 3, chengdu: 2, suzhou: 1, tianjin: 1, wuhan: 1 } },
      { label: '🚶 走路，绿色健康', value: 'walk', scores: { dali: 2, suzhou: 2, nanjing: 2, xian: 1, jinan: 1, guilin: 1 } },
      { label: '🚗 开车，我的地盘我做主', value: 'car', scores: { chengdu: 2, chongqing: 2, shenzhen: 1, qingdao: 1, shenyang: 1, hohhot: 1 } },
    ],
  },
  {
    id: 15,
    text: '你觉得自己的性格更像？',
    category: 'spiritual',
    options: [
      { label: '☀️ 外向开朗，社交充电型', value: 'extrovert', scores: { changsha: 3, chongqing: 3, chengdu: 1, guangzhou: 2, wuhan: 1, shenyang: 1 } },
      { label: '🌙 内向安静，独处充电型', value: 'introvert', scores: { dali: 3, kunming: 1, suzhou: 2, nanjing: 1, xiamen: 1, zhuhai: 1 } },
      { label: '🔄 看心情，可i可e', value: 'ambi', scores: { kunming: 3, hangzhou: 2, shanghai: 2, beijing: 1, shenzhen: 1, tianjin: 1 } },
      { label: '🎭 对不同人展现不同面', value: 'chameleon', scores: { shanghai: 2, shenzhen: 2, guangzhou: 2, chengdu: 1, hohhot: 1, zhengzhou: 1 } },
    ],
  },
  {
    id: 16,
    text: '你相信一见钟情还是日久生情？',
    category: 'xuanxue',
    options: [
      { label: '💘 一见钟情！感觉对了就对了', value: 'lovefirst', scores: { chongqing: 3, changsha: 2, sanya: 2, chengdu: 1, nanchang: 1, luoyang: 1 } },
      { label: '🌱 日久生情，慢慢了解才是真', value: 'lovegrow', scores: { nanjing: 3, suzhou: 3, hangzhou: 2, kunming: 2, beijing: 1, xiamen: 1 } },
      { label: '🤷 随缘吧，看命运安排', value: 'fate', scores: { lasa: 3, dali: 3, kunming: 1, xian: 2, luoyang: 2, guilin: 1 } },
      { label: '💼 我只想搞钱，感情随缘', value: 'moneyfirst', scores: { shenzhen: 3, shanghai: 2, beijing: 2, guangzhou: 1, hefei: 1, zhengzhou: 1 } },
    ],
  },
  {
    id: 17,
    text: '你希望你的住所在？',
    category: 'spiritual',
    options: [
      { label: '🏢 市中心高层，俯瞰城市天际线', value: 'center', scores: { shanghai: 3, shenzhen: 2, beijing: 2, guangzhou: 2, dalian: 1, tianjin: 1 } },
      { label: '🏡 郊区小院，有花园有阳光', value: 'suburb', scores: { dali: 2, kunming: 2, suzhou: 2, nanjing: 1, guiyang: 1, zhuhai: 1 } },
      { label: '🌊 海边/湖边，水景房', value: 'waterfront', scores: { sanya: 3, qingdao: 3, hangzhou: 2, kunming: 1, xiamen: 2, jinan: 1 } },
      { label: '🏘️ 老城区有烟火气的地方', value: 'oldtown', scores: { chengdu: 2, xian: 2, chongqing: 2, guangzhou: 1, wuhan: 1, harbin: 1 } },
    ],
  },
  {
    id: 18,
    text: '最后！你相信这个测试的结果吗？',
    category: 'xuanxue',
    options: [
      { label: '🤩 信！这就是我命中注定的城市', value: 'trust', scores: { lasa: 3, xian: 2, dali: 2, chengdu: 2, guilin: 1, lanzhou: 1 } },
      { label: '😏 有点意思，供参考', value: 'interesting', scores: { hangzhou: 2, nanjing: 2, suzhou: 2, shanghai: 1, jinan: 1, luoyang: 1 } },
      { label: '🧐 我要看看到底有多准', value: 'doubt', scores: { shenzhen: 2, beijing: 2, guangzhou: 1, qingdao: 1, hefei: 1, nanchang: 1 } },
      { label: '😄 纯属娱乐，开心就好！', value: 'fun', scores: { changsha: 3, chongqing: 2, chengdu: 2, sanya: 2, wuhan: 1, hohhot: 1 } },
    ],
  },
]
