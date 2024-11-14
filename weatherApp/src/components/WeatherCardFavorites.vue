<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getWeatherByCity } from '@/services/weatherService'; // Import weather service
import WeatherCard from '../components/WeatherCard.vue';
import type { WeatherData } from '@/types/weatherTypes';

export default {
  components: { WeatherCard },

  setup() {
    const newCity = ref('');
    const favoriteCities = ref<string[]>([]);
    const favoriteCitiesWeather = ref<WeatherData[]>([]);

    // Fetch weather data for favorite cities
    const fetchWeatherForFavorites = async () => {
      favoriteCitiesWeather.value = await Promise.all(
        favoriteCities.value.map(async (city) => {
          try {
            const weather = await getWeatherByCity(city);
            return weather; // Return weather data for this city
          } catch (error) {
            console.error(`Failed to fetch weather for ${city}`, error);
            return null; // Return null in case of an error
          }
        })
      );
    };

    // Load saved cities from localStorage on mount
    onMounted(() => {
      const savedCities = localStorage.getItem('favoriteCities');
      if (savedCities) favoriteCities.value = JSON.parse(savedCities);
      fetchWeatherForFavorites(); // Initial fetch for favorite cities
    });

    // Watch for changes in favorite cities to fetch weather data
    watch(favoriteCities, fetchWeatherForFavorites);

    // Add a new city to the favorites
    const addCity = () => {
      if (newCity.value && !favoriteCities.value.includes(newCity.value)) {
        favoriteCities.value.push(newCity.value);
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
        newCity.value = ''; // Clear input
      }
    };

    // Remove a city from the favorites
    const removeCity = (city: string) => {
      favoriteCities.value = favoriteCities.value.filter((c) => c !== city);
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
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
    <h1>Favorite Cities Weather</h1>

    <!-- Form to Add a New City -->
    <form @submit.prevent="addCity">
      <input v-model="newCity" placeholder="Enter city name" />
      <button type="submit">Add City</button>
    </form>

    <!-- Weather Cards for Favorite Cities -->
    <div v-if="favoriteCitiesWeather.length">
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
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>

<!--!!!!Pridat remove button a ulozit to niako nech to vyzera ako tak k svtu diki!!!!-->
