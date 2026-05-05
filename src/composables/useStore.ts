import { reactive } from 'vue'
import type { UserInfo, Answer } from '../types'
import type { Results } from './useMatching'

interface AppState {
  step: 'home' | 'info' | 'quiz' | 'result'
  userInfo: UserInfo | null
  currentQuestionIndex: number
  answers: Answer[]
  results: Results | null
}

const state = reactive<AppState>({
  step: 'home',
  userInfo: null,
  currentQuestionIndex: 0,
  answers: [],
  results: null,
})

export function useStore() {
  function goToInfo() {
    state.step = 'info'
  }

  function goToQuiz() {
    state.step = 'quiz'
    state.currentQuestionIndex = 0
    state.answers = []
  }

  function goToResult() {
    state.step = 'result'
  }

  function goHome() {
    state.step = 'home'
    state.userInfo = null
    state.currentQuestionIndex = 0
    state.answers = []
    state.results = null
  }

  function setUserInfo(info: UserInfo) {
    state.userInfo = info
  }

  function addAnswer(answer: Answer) {
    const existing = state.answers.findIndex((a) => a.questionId === answer.questionId)
    if (existing >= 0) {
      state.answers[existing] = answer
    } else {
      state.answers.push(answer)
    }
  }

  function nextQuestion() {
    state.currentQuestionIndex++
  }

  function setResults(results: Results) {
    state.results = results
  }

  return {
    state,
    goToInfo,
    goToQuiz,
    goToResult,
    goHome,
    setUserInfo,
    addAnswer,
    nextQuestion,
    setResults,
  }
}
