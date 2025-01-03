import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DailyForecast from '@/views/DailyForecastView.vue'
import FavouriteCitiesWeather from "@/views/FavoriteCitiesWeatherView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorite-cities',
      name: 'favorite cities',
      component: FavouriteCitiesWeather,
    },
    {
      path: '/daily-forecast',
      name: 'daily forecast',
      component: DailyForecast,
    },
  ],
})

export default router
