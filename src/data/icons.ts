export interface IconDefinition {
  svgPath: string
  viewBox?: string
}

export const ICON_PATHS: Record<string, IconDefinition> = {
  // ── WUXING ELEMENTS ────────────────────────────────────
  'wuxing-mu': {
    svgPath: 'M12 22V8 M8 12a3 3 0 1 1 0-6 M16 14a3 3 0 1 1 0-6',
    viewBox: '0 0 24 24',
  },
  'wuxing-huo': {
    svgPath: 'M12 2 C8 5 5 9 5 13 C5 17 8 20 12 22 C16 20 19 17 19 13 C19 9 16 5 12 2 Z',
    viewBox: '0 0 24 24',
  },
  'wuxing-tu': {
    svgPath: 'M2 22 L12 5 L22 22 Z M7 22 L12 14 L17 22',
    viewBox: '0 0 24 24',
  },
  'wuxing-jin': {
    svgPath: 'M12 2 L22 12 L12 22 L2 12 Z M12 8 L12 16 M8 12 L16 12',
    viewBox: '0 0 24 24',
  },
  'wuxing-shui': {
    svgPath: 'M3 7 Q7 3 12 7 Q17 11 21 7 M3 12 Q7 8 12 12 Q17 16 21 12 M3 17 Q7 13 12 17 Q17 21 21 17',
    viewBox: '0 0 24 24',
  },

  // ── CITY ICONS ──────────────────────────────────────────
  'city-chengdu': {
    svgPath: 'M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16 M9 7a1.5 1.5 0 1 0 0-3 M15 7a1.5 1.5 0 1 0 0-3 M10 14l1-1l2 2l-1 1 M12 14v2',
    viewBox: '0 0 24 24',
  },
  'city-shanghai': {
    svgPath: 'M3 20V6h3v14 M6 20V10h3v10 M9 20V4h3v16 M12 20V8h3v12 M15 20V3h3v17 M18 20V7h3v13',
    viewBox: '0 0 24 24',
  },
  'city-beijing': {
    svgPath: 'M12 2L20 10H4Z M8 10v8h2v-4h4v4h2v-8 M10 14h4',
    viewBox: '0 0 24 24',
  },
  'city-hangzhou': {
    svgPath: 'M3 8 Q7 3 12 8 Q17 13 21 8 M3 14 Q7 9 12 14 Q17 19 21 14',
    viewBox: '0 0 24 24',
  },
  'city-shenzhen': {
    svgPath: 'M12 3 L15 10 H18 L14 15 V21 H10 V15 L6 10 H9 Z M12 3 M10 8 L14 8',
    viewBox: '0 0 24 24',
  },
  'city-chongqing': {
    svgPath: 'M12 2 C8 6 6 10 6 14 C6 18 9 21 12 22 C15 21 18 18 18 14 C18 10 16 6 12 2 Z',
    viewBox: '0 0 24 24',
  },
  'city-xian': {
    svgPath: 'M4 20 V13 L12 3 L20 13 V20 H14 V14 H10 V20 Z',
    viewBox: '0 0 24 24',
  },
  'city-kunming': {
    svgPath: 'M12 12 M12 3V12 M12 12L8 8 M12 12L16 8 M12 12L8 16 M12 12L16 16 M12 12a2 2 0 1 0 0-4a2 2 0 1 0 0 4',
    viewBox: '0 0 24 24',
  },
  'city-guangzhou': {
    svgPath: 'M12 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14 M9 10q1.5-2 3-2t3 2 M8 7q2-1.5 4-1.5t4 1.5',
    viewBox: '0 0 24 24',
  },
  'city-sanya': {
    svgPath: 'M6 22 L12 8 L18 22 M12 8v-4 M10 4h4 M4 13h16 M12 13 M6 18h12',
    viewBox: '0 0 24 24',
  },
  'city-nanjing': {
    svgPath: 'M4 4h16v16H4z M4 14h16 M9 4v16 M12 8l3-3l3 3',
    viewBox: '0 0 24 24',
  },
  'city-dali': {
    svgPath: 'M2 20 L12 4 L22 20 Z M7 20 L11 12 L14 20',
    viewBox: '0 0 24 24',
  },
  'city-changsha': {
    svgPath: 'M12 4 L12 20 M8 7l1-1 M8 11l1-1 M8 15l1-1',
    viewBox: '0 0 24 24',
  },
  'city-suzhou': {
    svgPath: 'M9 22V6 M9 10h3 M15 22V8 M15 12h3 M6 14l3 2 M18 16l-3 2',
    viewBox: '0 0 24 24',
  },
  'city-qingdao': {
    svgPath: 'M8 8h8v10l-4 3l-4-3z M8 8v-4 M8 4h2v4 M16 8v-4 M14 4h2v4',
    viewBox: '0 0 24 24',
  },
  'city-lasa': {
    svgPath: 'M8 22 L12 12 L16 22 M12 12 M12 3a4 4 0 1 0 0 8 M8 8l2-2 M16 8l-2-2 M12 0v3 M7 5l-2 2 M17 5l2 2',
    viewBox: '0 0 24 24',
  },
  'city-wuhan': {
    svgPath: 'M12 2v18 M12 20a2 2 0 0 1 2 2 M8 8h8 M9 8l-3 5h4l-2 4l6-6h-4l3-3',
    viewBox: '0 0 24 24',
  },
  'city-xiamen': {
    svgPath: 'M12 4v14 M12 6l-4 4h8z M8 4l4-2l4 2 M12 18q-3-2-3-4q0-2 3-2t3 2q0 2-3 4',
    viewBox: '0 0 24 24',
  },
  'city-dalian': {
    svgPath: 'M5 20V8l7-4l7 4v12h-5v-5h-4v5z',
    viewBox: '0 0 24 24',
  },
  'city-harbin': {
    svgPath: 'M12 2v20 M12 6l-4 4M12 6l4 4 M12 10l-4 4M12 10l4 4 M12 14l-4 4M12 14l4 4',
    viewBox: '0 0 24 24',
  },
  'city-tianjin': {
    svgPath: 'M8 8a4 4 0 1 0 0 8 M16 8a4 4 0 1 0 0 8 M8 10q2-1 4 0q2 1 4 0 M8 16q2 1 4 0q2-1 4 0',
    viewBox: '0 0 24 24',
  },
  'city-guiyang': {
    svgPath: 'M12 22 L6 12 L12 4 L18 12 Z M12 16 L10 12 L12 10 L14 12 Z',
    viewBox: '0 0 24 24',
  },
  'city-lanzhou': {
    svgPath: 'M4 10Q8 6 12 10Q16 14 20 10 M4 15Q8 11 12 15Q16 19 20 15',
    viewBox: '0 0 24 24',
  },
  'city-shenyang': {
    svgPath: 'M5 20V8l7-4l7 4v12h-5v-4h-4v4z M12 8v8',
    viewBox: '0 0 24 24',
  },
  'city-jinan': {
    svgPath: 'M12 22V10 M8 10q4-3 8 0 M10 14q2-1.5 4 0 M9 17q2-1 4 0',
    viewBox: '0 0 24 24',
  },
  'city-luoyang': {
    svgPath: 'M12 5a7 7 0 1 0 0 14a7 7 0 0 0 0-14 M12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4 M12 12v2 M9 15l3 3l3-3',
    viewBox: '0 0 24 24',
  },
  'city-guilin': {
    svgPath: 'M4 22 L8 10 L12 22 M12 22 L16 5 L20 22 M8 22l4-6l4 6',
    viewBox: '0 0 24 24',
  },
  'city-zhuhai': {
    svgPath: 'M12 4V18 M12 8l-3 4h6z M10 4l2-2l2 2 M12 18a3 3 0 1 0 0 6',
    viewBox: '0 0 24 24',
  },
  'city-hohhot': {
    svgPath: 'M12 12a6 6 0 1 0 0-12a6 6 0 0 0 0 12 M6 8l12 6 M6 12l12-2 M12 12v10 M9 22h6',
    viewBox: '0 0 24 24',
  },
  'city-zhengzhou': {
    svgPath: 'M8 22V4h8v18 M8 8h8 M8 14h8',
    viewBox: '0 0 24 24',
  },
  'city-nanchang': {
    svgPath: 'M6 22V4l6-2l6 2v18 M12 6v10 M9 12l3 3l3-3',
    viewBox: '0 0 24 24',
  },
  'city-hefei': {
    svgPath: 'M12 22V6 M8 10a4 4 0 1 1 8 0 M12 6l-2-2h4z M8 16h8 M12 16v2',
    viewBox: '0 0 24 24',
  },

  // ── UI / TROPHY ICONS ──────────────────────────────────
  'trophy-gold': {
    svgPath: 'M6 4h12v2a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V4z M8 10v2a4 4 0 0 0 4 4a4 4 0 0 0 4-4v-2 M10 18v2h4v-2',
    viewBox: '0 0 24 24',
  },
  'medal-silver': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M9 9l3 3l3-3 M9 14l3-3l3 3 M12 10v8',
    viewBox: '0 0 24 24',
  },
  'medal-bronze': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M12 7v6 M9 10h6',
    viewBox: '0 0 24 24',
  },

  // ── UI GENERAL ICONS ───────────────────────────────────
  'sparkles': {
    svgPath: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z M5 5l.5 1.5L7 7l-1.5.5L5 9l-.5-1.5L3 7l1.5-.5z M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5z',
    viewBox: '0 0 24 24',
  },
  'wave-hand': {
    svgPath: 'M8 12V6a3 3 0 0 1 6 0v8 M14 10v-4a2 2 0 0 1 4 0v9 M10 13c-3-2-6-2-8 0v4c0 3 4 5 8 5h4c5 0 8-3 8-7v-4',
    viewBox: '0 0 24 24',
  },
  'check-circle': {
    svgPath: 'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20 M8 12l3 3l5-5',
    viewBox: '0 0 24 24',
  },
  'map': {
    svgPath: 'M1 6v16l7-4l8 4l7-4V2l-7 4l-8-4z M9 2v16 M15 6v16',
    viewBox: '0 0 24 24',
  },
  'cityscape': {
    svgPath: 'M2 20V8h4v12 M6 20V10h3v10 M9 20V4h4v16 M13 20V6h3v14 M16 20V9h3v11 M19 20V5h3v15',
    viewBox: '0 0 24 24',
  },
  'heart-double': {
    svgPath: 'M12 21a9 9 0 0 1-8-4c-3-4 0-8 3-9c2-1 5 0 5 3c0-3 3-4 5-3c3 1 6 5 3 9a9 9 0 0 1-8 4z',
    viewBox: '0 0 24 24',
  },
  'leaf': {
    svgPath: 'M12 2C8 6 4 10 4 14a5 5 0 0 0 10 0c0-2-2-4-2-6c4 2 8 4 8 8a8 8 0 0 1-8 8c-4 0-8-4-8-8c0-4 4-8 8-14z',
    viewBox: '0 0 24 24',
  },
  'crystal-ball': {
    svgPath: 'M12 2a8 8 0 0 0-8 8c0 5 3 8 4 9h8c1-1 4-4 4-9a8 8 0 0 0-8-8 M8 19v1a2 2 0 0 0 4 0v-1 M10 7l2 5l2-5',
    viewBox: '0 0 24 24',
  },

  // ── QUIZ OPTION ICONS ──────────────────────────────────
  'icon-coffee': {
    svgPath: 'M6 4h12v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V4z M18 8h2a2 2 0 0 1 0 4h-2 M10 4v2 M14 4v2',
    viewBox: '0 0 24 24',
  },
  'icon-run': {
    svgPath: 'M16 4l-2 4l-4-2l-3 5h3l1 3h4l2-4h3l-2 6h-3l-1 2h5l3 4 M8 16l-4 5',
    viewBox: '0 0 24 24',
  },
  'icon-phone': {
    svgPath: 'M5 4h14v16H5z M9 2h6v1H9z M12 17v1 M8 7h8 M8 10h8 M8 13h5',
    viewBox: '0 0 24 24',
  },
  'icon-fire': {
    svgPath: 'M12 2 C8 5 5 9 5 13 C5 17 8 20 12 22 C16 20 19 17 19 13 C19 9 16 5 12 2 Z',
    viewBox: '0 0 24 24',
  },
  'icon-food-dumpling': {
    svgPath: 'M12 3L18 8v2 M6 8v2l6 5l6-5V8z M12 10v12 M4 10l16 5 M4 15l16-5',
    viewBox: '0 0 24 24',
  },
  'icon-food-taco': {
    svgPath: 'M4 8 L20 8 L18 18a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z M12 8V6 M9 6l3-3l3 3',
    viewBox: '0 0 24 24',
  },
  'icon-food-salad': {
    svgPath: 'M6 18V8a6 6 0 0 1 12 0v10 M12 2v6 M8 8l-2 2 M16 8l2 2 M12 6l1-3 M10 3l-1 3',
    viewBox: '0 0 24 24',
  },
  'icon-muscle': {
    svgPath: 'M6 12v-3a3 3 0 0 1 6 0v3 M12 12v-3a3 3 0 0 1 6 0v3 M8 12v7l-3 3 M16 12v7l3 3 M10 6h4',
    viewBox: '0 0 24 24',
  },
  'icon-balance': {
    svgPath: 'M12 2v20 M4 8h16 M6 8l-4 6h6z M18 8l4 6h-6z',
    viewBox: '0 0 24 24',
  },
  'icon-palette': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a1.5 1.5 0 0 0 0-3a5 5 0 1 1 0-10a1.5 1.5 0 0 0 0-3z M8 7v1 M16 7v1 M7 11h2 M15 11h2',
    viewBox: '0 0 24 24',
  },
  'icon-house': {
    svgPath: 'M3 12L12 3l9 9 M6 10v10h12V10 M10 20v-6h4v6',
    viewBox: '0 0 24 24',
  },
  'icon-plane': {
    svgPath: 'M22 2L11 11 M22 2l-7 20l-4-9l-9-4z M14 14l6 6',
    viewBox: '0 0 24 24',
  },
  'icon-chart': {
    svgPath: 'M3 20V14l4-4l4 4l4-8l4 4l4-6 M3 20h18',
    viewBox: '0 0 24 24',
  },
  'icon-food-noodles': {
    svgPath: 'M4 10Q8 6 12 10Q16 14 20 10 M4 15Q8 11 12 15Q16 19 20 15 M10 20v-5 M14 20v-5',
    viewBox: '0 0 24 24',
  },
  'icon-party': {
    svgPath: 'M12 3l1 4h5l-4 3l2 4l-4-3l-4 3l2-4l-4-3h5z M6 2l.5 1.5L8 4l-1.5.5L6 6l-.5-1.5L4 4l1.5-.5z M18 1l.5 1.5L20 3l-1.5.5L18 5l-.5-1.5L16 3l1.5-.5z',
    viewBox: '0 0 24 24',
  },
  'icon-people': {
    svgPath: 'M8 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8 M2 22v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2 M22 22v-2a4 4 0 0 0-4-4h-1 M16 8a4 4 0 1 1-6.5-3.2',
    viewBox: '0 0 24 24',
  },
  'icon-cat': {
    svgPath: 'M12 4a6 6 0 0 0-6 6v2c0 3 3 6 6 7c3-1 6-4 6-7v-2a6 6 0 0 0-6-6 M9 8l-3-2 M15 8l3-2 M9 14v1 M15 14v1 M12 16v3 M10 19h4',
    viewBox: '0 0 24 24',
  },
  'icon-think': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M9 9h.01 M15 9h.01 M9 13c.5-1 1.5-2 3-2s2.5 1 3 2',
    viewBox: '0 0 24 24',
  },
  'icon-sweat': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 8l1 1 M16 8l-1 1 M8 12h.01 M16 12h.01 M8 14q2-1.5 4-1.5t4 1.5 M9 19l1-2 M12 20v-3',
    viewBox: '0 0 24 24',
  },
  'icon-science': {
    svgPath: 'M9 22V12l-4-6h14l-4 6v10 M12 22v-4 M8 6h8',
    viewBox: '0 0 24 24',
  },
  'icon-sun': {
    svgPath: 'M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41 M12 6a6 6 0 1 0 0 12a6 6 0 0 0 0-12',
    viewBox: '0 0 24 24',
  },
  'icon-rain': {
    svgPath: 'M6 4a4 4 0 0 1 4 4M6 4a6 6 0 0 0 0 6 M14 2a4 4 0 0 1 4 4M14 2a6 6 0 0 0 0 7 M8 12v6 M12 11v7 M16 12v6',
    viewBox: '0 0 24 24',
  },
  'icon-snow': {
    svgPath: 'M12 2v20 M12 6l-4 4M12 6l4 4 M12 10l-4 4M12 10l4 4 M12 14l-4 4M12 14l4 4',
    viewBox: '0 0 24 24',
  },
  'icon-leaf-fall': {
    svgPath: 'M12 2C8 8 4 12 4 16a4 4 0 0 0 8 0c0-2-2-4-2-6c3 2 6 3 8 6M16 14l4 4 M20 14v4h-4',
    viewBox: '0 0 24 24',
  },
  'icon-town': {
    svgPath: 'M3 20V10l4-4l4 4v10h-3v-4H6v4z M11 20V10l4-4l4 4v10h-3v-4h-2v4z',
    viewBox: '0 0 24 24',
  },
  'icon-wave': {
    svgPath: 'M3 8 Q7 3 12 8 Q17 13 21 8 M3 14 Q7 9 12 14 Q17 19 21 14',
    viewBox: '0 0 24 24',
  },
  'icon-camera': {
    svgPath: 'M4 18V7h4l2-3h4l2 3h4v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M12 11a3 3 0 1 0 0 6a3 3 0 0 0 0-6',
    viewBox: '0 0 24 24',
  },
  'icon-walk': {
    svgPath: 'M8 4l2 4l4-2l2 5h-3l-1 4h-4l-1-4H4l2-3z M12 22v-3 M12 19l-2 3 M12 19l2 3',
    viewBox: '0 0 24 24',
  },
  'icon-books': {
    svgPath: 'M4 4h16v16H4z M4 4h8v16H4z M7 7h2v10H7z M14 7h2v10h-2z M4 13h16',
    viewBox: '0 0 24 24',
  },
  'icon-surf': {
    svgPath: 'M6 20L18 4 M6 20l12-8 M6 20l12-12 M12 22l4-2l4 2l-4-2z',
    viewBox: '0 0 24 24',
  },
  'icon-black-square': {
    svgPath: 'M4 4h16v16H4z',
    viewBox: '0 0 24 24',
  },
  'icon-rainbow': {
    svgPath: 'M12 22a8 8 0 1 1 0-16a8 8 0 0 1 0 16 M12 18a4 4 0 1 1 0-8 M12 14a1 1 0 1 1 0-2',
    viewBox: '0 0 24 24',
  },
  'icon-heart-green': {
    svgPath: 'M12 21a9 9 0 0 1-8-4c-3-4 0-8 3-9c2-1 5 0 5 3c0-3 3-4 5-3c3 1 6 5 3 9a9 9 0 0 1-8 4z',
    viewBox: '0 0 24 24',
  },
  'icon-heart-blue': {
    svgPath: 'M12 21a9 9 0 0 1-8-4c-3-4 0-8 3-9c2-1 5 0 5 3c0-3 3-4 5-3c3 1 6 5 3 9a9 9 0 0 1-8 4z',
    viewBox: '0 0 24 24',
  },
  'icon-crown': {
    svgPath: 'M3 18v-2h18v2z M3 6l4 7l5-5l5 5l4-7l-4 7l-5-5l-5 5z',
    viewBox: '0 0 24 24',
  },
  'icon-bamboo': {
    svgPath: 'M9 22V6 M9 10h3 M15 22V8 M15 12h3 M6 14l3 2 M18 16l-3 2',
    viewBox: '0 0 24 24',
  },
  'icon-ship': {
    svgPath: 'M3 20v-2 M21 20v-2 M5 14l14-4v6l-14 4z M12 18v4 M12 18l-2 4 M12 18l2 4',
    viewBox: '0 0 24 24',
  },
  'icon-dance': {
    svgPath: 'M8 4l2 6l5-2 M12 12l3 3l-2 5 M9 10l-4 3l3 4',
    viewBox: '0 0 24 24',
  },
  'icon-food-paella': {
    svgPath: 'M6 16V8a6 6 0 0 1 12 0v8 M4 16h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 4l8 2 M10 2l6 3 M12 6v2',
    viewBox: '0 0 24 24',
  },
  'icon-meditate': {
    svgPath: 'M12 4a2 2 0 1 0 0-4a2 2 0 0 0 0 4 M12 6v8 M8 22l4-8l4 8 M6 14l6 8 M18 14l-6 8',
    viewBox: '0 0 24 24',
  },
  'icon-shopping': {
    svgPath: 'M6 6h16l-2 12H8z M8 6L6 2H2 M10 11v.01 M14 11v.01 M10 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4 M18 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4',
    viewBox: '0 0 24 24',
  },
  'icon-gamepad': {
    svgPath: 'M6 12h4v4H6z M14 12h4v4h-4z M8 10V8h2v2z M14 10V8h2v2z M4 8h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z',
    viewBox: '0 0 24 24',
  },
  'icon-metro': {
    svgPath: 'M4 8h16v8H4z M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2 M8 16v4 M16 16v4 M12 20v-4 M8 11h1 M15 11h1 M4 16v2',
    viewBox: '0 0 24 24',
  },
  'icon-bike': {
    svgPath: 'M5 18a5 5 0 1 0 0-10a5 5 0 0 0 0 10 M19 18a5 5 0 1 0 0-10a5 5 0 0 0 0 10 M12 8l3-3 M11 5h5 M11 13l7-5 M5 13l3 5',
    viewBox: '0 0 24 24',
  },
  'icon-car': {
    svgPath: 'M5 14h14v4H5z M7 18v2 M17 18v2 M3 14l2-6h14l2 6 M5 14v-2 M19 14v-2 M9 12h6 M8 5h8l1 3H7z',
    viewBox: '0 0 24 24',
  },
  'icon-moon': {
    svgPath: 'M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z',
    viewBox: '0 0 24 24',
  },
  'icon-cycle': {
    svgPath: 'M3 12a9 9 0 1 0 18 0h-3l4-4l4 4h-3a9 9 0 1 1-18 0 M9 8l3 4l-3 4',
    viewBox: '0 0 24 24',
  },
  'icon-theater': {
    svgPath: 'M8 8a4 4 0 1 0 0 8 M16 8a4 4 0 1 0 0 8 M8 10q2-1 4 0q2 1 4 0 M8 16q2 1 4 0q2-1 4 0',
    viewBox: '0 0 24 24',
  },
  'icon-heart-arrow': {
    svgPath: 'M12 20a8 8 0 0 1-7-3.5c-3-3.5 0-7 2.5-8c1.5-.7 3.5 0 4.5 2c1-2 3-2.7 4.5-2c2.5 1 5.5 4.5 2.5 8a8 8 0 0 1-7 3.5z M22 2l-5 5 M17 2h5v5',
    viewBox: '0 0 24 24',
  },
  'icon-seedling': {
    svgPath: 'M12 22V10 M8 10c-1-3 1-6 4-8c3 2 5 5 4 8 M12 10c-2 0-4-2-4-4s2-4 4-4s4 2 4 4s-2 4-4 4',
    viewBox: '0 0 24 24',
  },
  'icon-shrug': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 14s3 2 8 0 M8 9l2-2 M16 9l-2-2',
    viewBox: '0 0 24 24',
  },
  'icon-briefcase': {
    svgPath: 'M4 7h16v12H4z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M12 12v4 M10 14h4',
    viewBox: '0 0 24 24',
  },
  'icon-office': {
    svgPath: 'M4 21V5h6v4h4V5h6v16H4z M7 8v2 M9 8v2 M11 8v2 M7 13v2 M9 13v2 M11 13v2 M13 13v2 M15 13v2 M17 13v2 M7 17v2 M9 17v2 M11 17v2',
    viewBox: '0 0 24 24',
  },
  'icon-garden': {
    svgPath: 'M3 20V12l9-9l9 9v8h-5v-5H8v5z M12 6l2 4h-4z M12 6v4',
    viewBox: '0 0 24 24',
  },
  'icon-star-struck': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 8a1 1 0 1 0 0-2 M16 8a1 1 0 1 0 0-2 M9 12l3 3l3-3 M12 15 M12 7l1 3l-1 3l-1-3z',
    viewBox: '0 0 24 24',
  },
  'icon-smirk': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 14s3 2 8 0 M10 9l1 1 M14 9l-1 1',
    viewBox: '0 0 24 24',
  },
  'icon-monocle': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 8h.01 M16 9l-1-1 M9 13c.5 1 1.5 2 3 2 M10 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4 M14 2v2',
    viewBox: '0 0 24 24',
  },
  'icon-grin': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 8h.01 M16 8h.01 M9 13q2 2 6 0',
    viewBox: '0 0 24 24',
  },
  'icon-yawn': {
    svgPath: 'M12 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16 M8 12h.01 M16 12h.01 M8 9a4 4 0 0 1 8 0 M11 2v4',
    viewBox: '0 0 24 24',
  },
  'icon-mountain': {
    svgPath: 'M2 20 L10 6 L14 13 L18 5 L22 20 Z',
    viewBox: '0 0 24 24',
  },
}
