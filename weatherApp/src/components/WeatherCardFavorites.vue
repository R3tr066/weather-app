<script lang="ts">
import { defineComponent } from 'vue';
import { getWeatherByCity } from '@/services/weatherService';
import WeatherCard from '../components/WeatherCard.vue';
import type { WeatherData } from '@/types/weatherTypes';

export default defineComponent({
  name: 'FavoriteCitiesWeather',
  components: { WeatherCard },
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
      <input v-model="newCity" class="ml-2 rounded-lg" type="text" placeholder="Enter city name"/>

      <button
        type="submit"
        class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ml-2">Add City</button>

    </form>

    <!-- Weather Cards for Favorite Cities -->
    <div class="mt-2 flex flex-wrap justify-start gap-4" v-if="favoriteCitiesWeather.length">
      <WeatherCard
        v-for="(weather, index) in favoriteCitiesWeather"
        :key="index"
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
</template>
