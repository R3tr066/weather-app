<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useThemeStore } from '../stores/theme';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const themeStore = useThemeStore();

    const isDarkMode = computed(() => themeStore.isDarkMode);
    const toggleTheme = themeStore.toggleTheme;

    return {
      isDarkMode,
      toggleTheme,
    };
  },
});
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300 ease-in-out">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">

      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse mr-auto">
        <img src="/img/siteLogo.png" class="h-8" alt="weather app logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white transition-colors duration-300 ease-in-out">
          Weather App
        </span>
      </a>

      <div class="hidden md:flex flex-grow justify-center space-x-8 rtl:space-x-reverse">
        <a href="/" class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out">Home</a>
        <a href="/about" class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out">About</a>
        <a href="/services" class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out">Services</a>
        <a href="/contact" class="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out">Contact</a>
      </div>

      <div class="ml-auto">
        <button @click="toggleTheme" class="theme-toggle-btn">
          <img
            :src="isDarkMode ? `/img/light-mode.png?v=${Date.now()}` : `/img/dark-mode.png?v=${Date.now()}`"
            alt="Theme Toggle"
            class="w-6 h-6 transition-opacity duration-300 ease-in-out"
          />
        </button>
      </div>
    </div>
  </nav>
</template>


<style scoped>
/* Add any specific styles for the navbar here */
</style>
