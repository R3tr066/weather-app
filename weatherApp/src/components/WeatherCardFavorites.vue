<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getWeatherByCity } from '@/services/weatherService';
import WeatherCard from '../components/WeatherCard.vue';
import type { WeatherData } from '@/types/weatherTypes';

export default {
  components: { WeatherCard },

  setup() {
    const newCity = ref('');
    const favoriteCities = ref<string[]>([]);
    const favoriteCitiesWeather = ref<WeatherData[]>([]);

    // Fetch weather data for each city in the favorites list
    const fetchWeatherForFavorites = async () => {
      favoriteCitiesWeather.value = await Promise.all(
        favoriteCities.value.map(async (city) => {
          try {
            return await getWeatherByCity(city);
          } catch (error) {
            console.error(`Failed to fetch weather for ${city}:`, error);
            return null;
          }
        })
      ).then((results) => results.filter((weather) => weather !== null)); // Filter out null results
    };

    // Load saved cities from localStorage on mount
    onMounted(() => {
      const savedCities = localStorage.getItem('favoriteCities');
      if (savedCities) favoriteCities.value = JSON.parse(savedCities);
      fetchWeatherForFavorites(); // Initial weather fetch
    });

    // Watch for changes in favorite cities to fetch weather data
    watch(favoriteCities, fetchWeatherForFavorites);

    const addCity = () => {
      if (newCity.value && !favoriteCities.value.includes(newCity.value)) {
        favoriteCities.value.push(newCity.value);
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
        newCity.value = ''; // Clear input
        fetchWeatherForFavorites(); // Fetch weather for updated list
      }
    };

    const removeCity = (city: string) => {
      favoriteCities.value = favoriteCities.value.filter((c) => c !== city);
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
      fetchWeatherForFavorites(); // Fetch weather for updated list
    };

    return {
      newCity,
      favoriteCitiesWeather,
      addCity,
      removeCity,
    };
  },
};
</script>


<template>
  <div>
    <!-- Form to Add a New City -->
    <form @submit.prevent="addCity" class="flex flex-row">
      <input v-model="newCity" placeholder="Enter city name"class="ml-2 max-h-10 basis-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300 ease-in-out" />
      <button type="submit" class="ml-2 basis-1/8 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-white dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-500 dark:hover:bg-gradient-to-bl dark:focus:ring-4 dark:focus:outline-none dark:focus:ring-blue-800 dark:font-medium dark:rounded-lg dark:text-sm dark:px-5 dark:py-2.5 dark:text-center dark:me-2 dark:mb-2 transition-colors duration-300 ease-in-out">Add City</button>
    </form>

    <!-- Weather Cards for Favorite Cities -->
    <div class="mt-2 flex flex-wrap" v-if="favoriteCitiesWeather.length">
      <!-- Loop through the favoriteCitiesWeather and pass weather data to WeatherCard component -->
      <div v-for="(weather, index) in favoriteCitiesWeather" :key="index">
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
          @remove="removeCity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>

<!--!!!!Pridat remove button a ulozit to niako nech to vyzera ako tak k svtu diki!!!!-->
