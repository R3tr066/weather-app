<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { useRoute, RouterLink } from 'vue-router';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const themeStore = useThemeStore();
    const route = useRoute();

    const isDarkMode = computed(() => themeStore.isDarkMode);
    const toggleTheme = themeStore.toggleTheme;

    // Check active route to apply active styling
    const isActiveRoute = (path: string) => route.path === path;

    return {
      isDarkMode,
      toggleTheme,
      isActiveRoute,
    };
  },
});
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300 ease-in-out">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse mr-auto">
        <img src="/img/siteLogo.png" class="h-8" alt="weather app logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white transition-colors duration-300 ease-in-out">
          Weather App
        </span>
      </RouterLink>

      <!-- Navbar Links -->
      <div class="hidden md:flex flex-grow justify-center space-x-8 rtl:space-x-reverse">
        <RouterLink
          to="/"
          :class="[
            'text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out',
            isActiveRoute('/') ? 'text-blue-700 dark:text-blue-500 font-bold' : ''
          ]"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/weather"
          :class="[
            'text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out',
            isActiveRoute('/weather') ? 'text-blue-700 dark:text-blue-500 font-bold' : ''
          ]"
        >
          weather
        </RouterLink>
      </div>

      <!-- Theme Toggle Button -->
      <div class="ml-auto">
        <button @click="toggleTheme" class="theme-toggle-btn">
          <img
            :src="isDarkMode ? '/img/light-mode.png' : '/img/dark-mode.png'"
            alt="Theme Toggle"
            class="w-6 h-6 transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
