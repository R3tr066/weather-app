<script lang="ts">
import {defineComponent} from 'vue';
import {getWeatherByCoordinates} from '@/services/weatherService';
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

    getWeatherIcon(condition: string, isDay: boolean) {
      // Map the condition to GIFs for day and night
      const iconMap: Record<string, { day: string; night: string }> = {
        Clear: {day: '/icons/sun.gif', night: '/icons/clearNight.png'},
        Clouds: {day: '/icons/cloudyDay.gif', night: '/icons/cloudyNight.gif'},
        Rain: {day: '/icons/rain.gif', night: '/icons/rain.gif'},
        Thunderstorm: {day: '/icons/thunderStorm.gif', night: '/icons/thunderStorm.gif'},
        Snow: {day: '/icons/snow.gif', night: '/icons/snow.gif'},
        Fog: {day: '/icons/fog.gif', night: '/icons/fog.gif'},
      };

      // Return the appropriate icon based on day or night
      return iconMap[condition]
        ? isDay
          ? iconMap[condition].day
          : iconMap[condition].night
        : '/icons/default.gif'; // Fallback icon
    },

    isDayTime(sunrise: number, sunset: number, currentTime: number) {
      return currentTime >= sunrise && currentTime <= sunset;
    }
  },

    mounted() {
      this.fetchCurrentLocationWeather();
    },
  });
</script>

<template>
  <!-- Weather Data -->
  <div v-if="weather" class="bg-[#FFFAEC] dark:bg-[#3A3960] text-black dark:text-white p-4 rounded shadow-md flex">

    <h1 class="text-lg font-bold">{{ weather.name }}</h1>

    <div>
      <!-- Weather Info -->
      <p class="text-2xl font-semibold">{{ weather.main.temp }}°C</p>
      <p class="text-sm text-gray-600 dark:text-gray-200 capitalize">{{ weather.weather[0].description }}</p>

      <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
        <p>Wind: <strong>{{ weather.wind.speed }} km/h</strong></p>
        <p>Humidity: <strong>{{ weather.main.humidity }}%</strong></p>
        <p>Feels Like: <strong>{{ weather.main.feels_like }}°C</strong></p>
        <p>Pressure: <strong>{{ weather.main.pressure }} hPa</strong></p>
      </div>
    </div>
    <!-- Weather Icon -->
    <img
      :src="getWeatherIcon(
          weather.weather[0].main,
          isDayTime(weather.sys.sunrise * 1000, weather.sys.sunset * 1000, weather.dt * 1000)
        )"
      alt="Weather Icon"
      class="w-32 h-32"
    />
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
