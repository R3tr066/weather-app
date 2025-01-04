<script>
import {get5DayForecast} from '@/services/weatherService';

export default {
  data() {
    return {
      cityInput: '',
      forecastData: [],
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    },

    async fetchForecast() {
      if (this.cityInput.trim() === '') {
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        this.forecastData = await get5DayForecast(this.cityInput);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMessage = 'Error fetching forecast data. Please try again.';
      }
    },

    saveCity() {
      if (this.cityInput.trim() === '') {
        alert('Input field can\'t be empty!');
        return;
      }

      localStorage.setItem('cityName', this.cityInput);

      this.fetchForecast();
    },
  },
  mounted() {
    const savedCity = localStorage.getItem('cityName');
    if (savedCity) {
      this.cityInput = savedCity;
      this.fetchForecast();
    }
  },
};
</script>

<template>
  <div>
    <!-- Input field for city name -->
    <div class="flex flex-row">
      <input v-model="cityInput" class="ml-2 rounded-lg" type="text" placeholder="Enter city name"/>
      <button @click="saveCity"
              class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ml-2">
        Get Forecast
      </button>
    </div>

    <!-- Display the forecast data -->
    <div v-if="forecastData.length" class="flex flex-wrap justify-center md:gap-6 mt-2 ml-5">
      <div v-for="forecast in forecastData" :key="forecast.date"
           class="weather-card mt-2 ml-2 bg-[#F7E7CE] rounded dark:bg-gray-900 p-4 shadow-md">

        <div class="transition-all duration-300 text-black dark:text-white">
          <h3>{{ formatDate(forecast.date) }}</h3>
        </div>

        <div class="flex items-center justify-between">
          <div class="font-semibold text-blue-700 text-center">
            <p class="text-3xl">{{ forecast.temp }}°C</p>
          </div>

          <div class="transition-all duration-300 text-black dark:text-white">
            <img :src="`https://openweathermap.org/img/wn/${forecast.icon}.png`" alt="weather icon" width="64px"
                 height="64px"/>
          </div>

        </div>
        <div class="flex justify-end text-black dark:text-white">
          <p>{{ forecast.description }}</p>
        </div>


      </div>
    </div>

    <!-- Loading indicator or error message -->
    <div v-else-if="loading">
      <div class="loader"></div>
    </div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.weather-card {
  max-width: 300px;
  transition: all 0.3s ease;
}

.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #0071e2;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0,0,0,0.2);
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
  animation: moving 1s ease-in-out infinite;
;
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
