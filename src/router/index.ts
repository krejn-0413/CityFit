import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import InfoPage from '../views/InfoPage.vue'
import QuizPage from '../views/QuizPage.vue'
import ResultPage from '../views/ResultPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/info', name: 'info', component: InfoPage },
    { path: '/quiz', name: 'quiz', component: QuizPage },
    { path: '/result', name: 'result', component: ResultPage },
  ],
})

export default router
