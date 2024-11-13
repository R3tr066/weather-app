<script lang="ts">
import {defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'WeatherCard',
  props: {
    location: {type: String, required: true},
    temperature: {type: Number, required: true},
    condition: {type: String, required: true},
    windSpeed: {type: Number, required: true},
    humidity: {type: Number, required: true},
    feelsLike: {type: Number, required: true},
    pressure: {type: Number, required: true},
    iconCode: {type: String, required: true},
  },
  computed: {
    date() {
      return new Date().toLocaleDateString();
    },
    iconUrl() {
      // Use the `iconCode` to get the URL of the weather icon
      return `https://openweathermap.org/img/wn/${this.iconCode}@2x.png`;
    },
  },
});
</script>

<template>
  <div class="ml-2 weather-card bg-white rounded dark:bg-gray-800 p-4 shadow-md transition-colors duration-300">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ location }}</h2>
      <span class="text-gray-500 dark:text-gray-400 text-sm">{{ date }}</span>
    </div>

    <div class="flex items-center justify-between my-4">
      <!-- Weather Icon -->
      <img :src="iconUrl" :alt="condition" class="w-16 h-16"/>

      <!-- Temperature -->
      <div class="text-center">
        <p class="text-4xl font-bold text-blue-500">{{ temperature }}°</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ condition }}</p>
      </div>
    </div>

    <!-- Additional Details -->
    <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
      <div>
        <p>Wind: <span class="font-semibold">{{ windSpeed }} km/h</span></p>
      </div>
      <div>
        <p>Humidity: <span class="font-semibold">{{ humidity }}%</span></p>
      </div>
      <div>
        <p>Feels like: <span class="font-semibold">{{ feelsLike }}°</span></p>
      </div>
      <div>
        <p>Pressure: <span class="font-semibold">{{ pressure }} hPa</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  max-width: 300px;
}
</style>
