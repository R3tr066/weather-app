<script lang="ts">
import {defineComponent, ref} from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import {getWeatherByCity} from '@/services/weatherService';
import type {WeatherData} from '@/types';

export default defineComponent({
  name: 'WeatherView',
  components: {WeatherCard},
  setup() {
    const city = ref();
    const weather = ref<WeatherData | null>(null); // Specify WeatherData type

    const fetchWeather = async () => {
      try {
        weather.value = await getWeatherByCity(city.value);
      } catch (error) {
        alert('Could not fetch weather data. Please try again.');
      }
    };

    return {city, weather, fetchWeather};
  },
});
</script>

<template>
<!--!!!!Spravit niaky flex alebo box na usporiadanie!!!!-->
  <div class="mt-20">
    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="city" placeholder="Enter city">

    <button @click="fetchWeather" class="mt-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-white dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-500 dark:hover:bg-gradient-to-bl dark:focus:ring-4 dark:focus:outline-none dark:focus:ring-blue-800 dark:font-medium dark:rounded-lg dark:text-sm dark:px-5 dark:py-2.5 dark:text-center dark:me-2 dark:mb-2">
      Get Weather
    </button>
  </div>
  <div class="">
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
