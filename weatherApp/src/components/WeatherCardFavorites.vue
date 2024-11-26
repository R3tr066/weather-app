<script lang="ts">
import {defineComponent} from 'vue';
import {getWeatherByCity} from '@/services/weatherService';
import WeatherCard from '../components/WeatherCard.vue';
import type {WeatherData} from '@/types/weatherTypes';

export default defineComponent({
  name: 'FavoriteCitiesWeather',
  components: {WeatherCard},
  data() {
    return {
      newCity: '',
      favoriteCities: [] as string[],
      favoriteCitiesWeather: [] as WeatherData[],
    };
  },
  methods: {
    async fetchWeatherForFavorites() {
      try {
        const weatherData = await Promise.all(
          this.favoriteCities.map(async (city) => {
            try {
              return await getWeatherByCity(city);
            } catch (error) {
              console.error(`Failed to fetch weather for ${city}:`, error);
              return null;
            }
          })
        );

        // Filter out null results (failed fetches)
        this.favoriteCitiesWeather = weatherData.filter(
          (weather) => weather !== null
        ) as WeatherData[];
      } catch (error) {
        console.error('Error fetching weather for favorites:', error);
      }
    },
    addCity() {
      const trimmedCity = this.newCity.trim();

      // Check if the city already exists (case-insensitive)
      if (
        trimmedCity &&
        !this.favoriteCities.some(
          (c) => c.toLowerCase() === trimmedCity.toLowerCase()
        )
      ) {
        // Add the city with its original casing
        this.favoriteCities.push(trimmedCity);
        this.saveToLocalStorage();
        this.newCity = '';
        this.fetchWeatherForFavorites();
      }
    },

    removeCity(city: string) {
      // Remove the city from the favoriteCities array using case-insensitive comparison
      this.favoriteCities = this.favoriteCities.filter((c) =>
        c.toLowerCase() !== city.toLowerCase()
      );

      // Remove the corresponding weather data using case-insensitive comparison
      this.favoriteCitiesWeather = this.favoriteCitiesWeather.filter(
        (weather) => weather.name.toLowerCase() !== city.toLowerCase()
      );

      // Update localStorage
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem(
        'favoriteCities',
        JSON.stringify(this.favoriteCities)
      );
    },
    loadFromLocalStorage() {
      const savedCities = localStorage.getItem('favoriteCities');
      if (savedCities) {
        this.favoriteCities = JSON.parse(savedCities);
      }
    },
  },
  mounted() {
    this.loadFromLocalStorage();
    this.fetchWeatherForFavorites();
  },
});
</script>

<template>
  <div>
    <!-- Form to Add a New City -->
    <form @submit.prevent="addCity" class="flex flex-row">
      <input
        v-model="newCity"
        placeholder="Enter city name"
        class="ml-2 max-h-10 basis-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300 ease-in-out"
      />
      <button
        type="submit"
        class="ml-2 basis-1/8 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-white dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-500 dark:hover:bg-gradient-to-bl dark:focus:ring-4 dark:focus:outline-none dark:focus:ring-blue-800 dark:font-medium dark:rounded-lg dark:text-sm dark:px-5 dark:py-2.5 dark:text-center dark:me-2 dark:mb-2 transition-colors duration-300 ease-in-out"
      >
        Add City
      </button>
    </form>

    <!-- Weather Cards for Favorite Cities -->
    <div class="mt-2 flex flex-wrap" v-if="favoriteCitiesWeather.length">
      <div
        v-for="(weather, index) in favoriteCitiesWeather"
        :key="index"
        class="flex flex-col items-center justify-center p-4 w-1/6"
      >
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
