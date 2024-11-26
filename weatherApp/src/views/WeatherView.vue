<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { getWeatherByCity } from '@/services/weatherService';
import type { WeatherData } from '@/types/weatherTypes';

export default defineComponent({
  name: 'WeatherView',
  components: { WeatherCard },
  data() {
    return {
      city: '',
      weather: null as WeatherData | null,
    };
  },
  methods: {
    async fetchWeather() {
      try {
        if (!this.city) {
          alert('Please enter a city name.');
          return;
        }
        this.weather = await getWeatherByCity(this.city);
      } catch (error) {
        alert('Could not fetch weather data. Please try again.');
      }
    },
  },
});
</script>

<template>
  <div class="flex flex-row justify-start">
    <input
      class="ml-2 max-h-10 basis-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300 ease-in-out"
      v-model="city"
      placeholder="Enter city"
    />
    <button
      @click="fetchWeather"
      class="ml-2 basis-1/8 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-white dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-500 dark:hover:bg-gradient-to-bl dark:focus:ring-4 dark:focus:outline-none dark:focus:ring-blue-800 dark:font-medium dark:rounded-lg dark:text-sm dark:px-5 dark:py-2.5 dark:text-center dark:me-2 dark:mb-2 transition-colors duration-300 ease-in-out"
    >
      Get Weather
    </button>
  </div>

  <div>
    <WeatherCard
      v-if="weather"
      :location="weather.name"
      :temperature="weather.main.temp"
      :condition="weather.weather[0].description"
      :windSpeed="weather.wind.speed"
      :humidity="weather.main.humidity"
      :feelsLike="weather.main.feels_like"
      :pressure="weather.main.pressure"
      :iconCode="weather.weather[0].icon"
    />
  </div>
</template>

<style scoped>
</style>
