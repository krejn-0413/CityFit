import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import InfoPage from '../views/InfoPage.vue'
import QuizPage from '../views/QuizPage.vue'
import ResultPage from '../views/ResultPage.vue'
import PortraitPreview from '../views/PortraitPreview.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/info', name: 'info', component: InfoPage },
    { path: '/quiz', name: 'quiz', component: QuizPage },
    { path: '/result', name: 'result', component: ResultPage },
    { path: '/preview', name: 'preview', component: PortraitPreview },
  ],
})

export default router
