export interface UserInfo {
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour: number | null
  birthMinute: number | null
  birthTimeKnown: boolean
  gender: 'male' | 'female'
}

export interface Question {
  id: number
  text: string
  options: QuestionOption[]
  category: 'material' | 'spiritual' | 'xuanxue'
}

export interface QuestionOption {
  label: string
  value: string
  scores: Record<string, number>
}

export interface Answer {
  questionId: number
  selectedValue: string
}

export interface City {
  id: string
  name: string
  province: string
  emoji: string
  coordinates: [number, number]
  tags: string[]
  description: string
  personalities: string[]
  material: number
  spiritual: number
  xuanxue: number
  baziPreference: string[]
}

export interface CityResult {
  city: City
  matchPercentage: number
  reason: string
}

export interface BaziInfo {
  heavenlyStems: string[]
  earthlyBranches: string[]
  fiveElements: string[]
  dayMaster: string
  likes: string[]
  dislikes: string[]
  couplePalace: string
}

export interface FriendRecommendation {
  name: string
  cityName: string
  avatar: string
  color: string
}
