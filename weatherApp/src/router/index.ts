import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from "@/views/WeatherView.vue";
import weatherJsonView from "@/components/WeatherJsonView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView,
    },
    {
      path: '/weather-json',
      name: 'weather-json',
      component: weatherJsonView,
    }
  ],
})

export default router
