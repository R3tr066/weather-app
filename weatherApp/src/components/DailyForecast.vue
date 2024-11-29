<template>
  <div>
    <!-- Input field for city name -->
    <div class="ml-2">
      <input v-model="cityInput" type="text" placeholder="Enter city name"/>
      <button @click="saveCity">Get Forecast</button>
    </div>

    <!-- Display the forecast data -->
    <div v-if="forecastData.length" class="flex flex-wrap md:gap-6 mt-2 ml-5">
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
            <img :src="`https://openweathermap.org/img/wn/${forecast.icon}.png`" alt="weather icon" width="64px" height="64px"/>
          </div>

        </div>
        <div class="flex justify-end">
          <p>{{ forecast.description }}</p>
        </div>


      </div>
    </div>

    <!-- Loading indicator or error message -->
    <div v-else-if="loading">Loading forecast...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import {get5DayForecast} from '@/services/weatherService'; // Assuming weatherService is here

export default {
  data() {
    return {
      cityInput: '', // Local variable to hold input city name
      forecastData: [], // To store the 5-day forecast data
      loading: false, // To show loading state
      errorMessage: '', // To show error messages
    };
  },
  methods: {
    // Function to format the date
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    },

    // Fetch the weather forecast when the user submits a city name
    async fetchForecast() {
      if (this.cityInput.trim() === '') {
        return; // Do nothing if the city name is empty
      }

      this.loading = true;
      this.errorMessage = ''; // Clear any previous errors

      try {
        this.forecastData = await get5DayForecast(this.cityInput); // This returns a promise
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMessage = 'Error fetching forecast data. Please try again.';
      }
    },

    // Save city and fetch forecast
    saveCity() {
      if (this.cityInput.trim() === '') {
        alert('Input field can\'t be empty!'); // Show alert if input is empty
        return; // Don't proceed with saving or fetching
      }

      // Save city name to localStorage
      localStorage.setItem('cityName', this.cityInput);

      // Fetch the weather forecast
      this.fetchForecast();
    },
  },
  mounted() {
    // Automatically fetch the weather when the component is mounted if a city is in localStorage
    const savedCity = localStorage.getItem('cityName');
    if (savedCity) {
      this.cityInput = savedCity; // Pre-fill input field with saved city
      this.fetchForecast(); // Fetch the weather for that city
    }
  },
};
</script>

<style scoped>
.weather-card {
  max-width: 300px;
  transition: all 0.3s ease;
}
</style>
