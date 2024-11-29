import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DailyForecast from '@/views/DailyForecastView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/daily-forecast',
      name: 'daily forecast',
      component: DailyForecast,
    },
  ],
})

export default router
