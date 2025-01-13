<script lang="ts">
import {defineComponent, computed} from 'vue';
import {getCustomWeatherIcon} from "@/utils/iconHelper";

export default defineComponent({
  name: 'WeatherCard',
  props: {
    location: {type: String, required: true},
    temperature: {type: Number, required: true},
    condition: {type: String, required: true},
    description: {type: String, required: true},
    windSpeed: {type: Number, required: true},
    humidity: {type: Number, required: true},
    feelsLike: {type: Number, required: true},
    pressure: {type: Number, required: true},
  },
  emits: ['remove'],

  data() {
    return {
      isRemoving: false,
    };
  },

  methods: {
    getCustomWeatherIcon,
    confirmRemoveCity() {
      const confirmRemove = window.confirm(`Are you sure you want to remove ${this.location} from your favorite cities?`);

      if (confirmRemove) {
        this.isRemoving = true;
        setTimeout(() => {
          this.$emit('remove', this.location);
        }, 300);
      }
    },
  },
  computed: {
    date() {
      return new Date().toLocaleDateString();
    },
  },
});
</script>

<template>
  <div
    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 ml-4 transition">
    <div class="flex justify-between">
      <h2 class="text-xl font-semibold text-black dark:text-white transition">{{ location }}</h2>
      <span class="text-gray-500 dark:text-gray-400 text-sm transition">{{ date }}</span>

      <!-- Remove Button -->
      <button @click="confirmRemoveCity" title="Remove city">
        <img src="/img/close.png"
             alt="close button"
             class="w-5 h-5">
      </button>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between my-4 transition">
      <img :src="getCustomWeatherIcon(condition,)"
           :alt="condition"
           class="w-32 h-15"/>
      <div class="text-center sm:text-left">
        <p class="text-4xl font-bold text-black dark:text-white transition">{{ temperature }}°C</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 transition">{{ description }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 transition">
      <div>
        <p>Wind: <span class="font-semibold text-black dark:text-white transition">{{ windSpeed }} km/h</span></p>
      </div>
      <div>
        <p>Humidity: <span class="font-semibold text-black dark:text-white transition">{{ humidity }}%</span></p>
      </div>
      <div>
        <p>Feels like: <span class="font-semibold text-black dark:text-white transition">{{ feelsLike }}°</span></p>
      </div>
      <div>
        <p>Pressure: <span class="font-semibold text-black dark:text-white transition">{{ pressure }} hPa</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
