<script lang="ts">
import {defineComponent} from 'vue';
import {getWeatherByCoordinates} from '@/services/weatherService';
import { getCustomWeatherIcon } from '@/utils/iconHelper';
import type {WeatherData} from '@/types/weatherTypes';

export default defineComponent({
  name: 'CurrentLocationWeather',
  data() {
    return {
      weather: null as WeatherData | null,
      errorMessage: '',
    };
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) {
        this.errorMessage = 'Geolocation is not supported by your browser.';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            this.weather = await getWeatherByCoordinates(lat, lon);
          } catch (error) {
            this.errorMessage = 'Failed to fetch weather data.';
            console.error(error);
          }
        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location.';
          console.error(error);
        }
      );
    },
    getCustomWeatherIcon
  },

  mounted() {
    this.fetchCurrentLocationWeather();
  },
});
</script>

<template>

  <div v-if="weather"
       class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300">

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white transition-all duration-300">{{weather.name}}</h5>
    <br>

    <div class="flex justify-center">
      <img
        :src="getCustomWeatherIcon(
          weather.weather[0].main
        )"
        alt="Weather Icon"
        class="w-32 h-15"
      />
    </div>

    <div class="flex flex-col ">
      <h2 class="text-center text-4xl font-semibold text-black dark:text-gray-200 capitalize transition-all duration-300">{{ weather.main.temp }}°C</h2>
      <p class="text-center text-sm text-gray-600 dark:text-gray-200 capitalize transition-all duration-300">{{ weather.weather[0].description }}</p>
    </div>

    <br>

    <div class="grid grid-cols-2 text-l text-black dark:text-gray-200  transition-all duration-300">
      <p>wind speed: <strong>{{ weather.wind.speed }} km/h</strong></p>
      <p class="pl-2">Humidity: <strong>{{ weather.main.humidity }}%</strong></p>
      <p>Feels Like: <strong>{{ weather.main.feels_like }}°C</strong></p>
      <p class="pl-2">Pressure: <strong>{{ weather.main.pressure }} hPa</strong></p>
    </div>

  </div>


  <!-- Error Message -->
  <div v-else-if="errorMessage" class="text-red-500 p-4">
    {{ errorMessage }}
  </div>

  <!-- Loading Message -->
  <div v-else class="p-4">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #0071e2;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
}

.loader::before {
  content: "";
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 1s ease-in-out infinite;;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
</style>
