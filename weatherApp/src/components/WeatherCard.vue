<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'WeatherCard',
  props: {
    location: { type: String, required: true },
    temperature: { type: Number, required: true },
    condition: { type: String, required: true },
    windSpeed: { type: Number, required: true },
    humidity: { type: Number, required: true },
    feelsLike: { type: Number, required: true },
    pressure: { type: Number, required: true },
    iconCode: { type: String, required: true },
  },
  emits: ['remove'], // Declare the 'remove' event

  data() {
    return {
      isRemoving: false, // New flag to manage removal animation
    };
  },

  methods: {
    confirmRemoveCity() {
      // Show a confirmation dialog before removing the city
      const confirmRemove = window.confirm(`Are you sure you want to remove ${this.location} from your favorite cities?`);

      if (confirmRemove) {
        // Add a small delay to allow for animation
        this.isRemoving = true;
        setTimeout(() => {
          this.$emit('remove', this.location);
        }, 300); // Match this with the transition duration
      }
    },
  },
  computed: {
    date() {
      return new Date().toLocaleDateString();
    },
    iconUrl() {
      return `https://openweathermap.org/img/wn/${this.iconCode}@2x.png`;
    },
  },
});
</script>

<template>
  <div
    class="weather-card bg-[#F7E7CE] rounded dark:bg-gray-900 p-4 shadow-md transition-all duration-300">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ location }}</h2>
      <span class="text-gray-500 dark:text-gray-400 text-sm">{{ date }}</span>

      <!-- Remove Button with Confirmation -->
      <button @click="confirmRemoveCity" title="Remove city">
        <img src="/img/close.png" alt="close button" class="w-5 h-5">
      </button>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between my-4">
      <img :src="iconUrl" :alt="condition" class="w-16 h-16 sm:w-24 sm:h-24 mx-auto" />
      <div class="text-center sm:text-left">
        <p class="text-4xl font-bold text-blue-500">{{ temperature }}°C</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ condition }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 290px;
  margin: 10px;
}

</style>
