<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useRoute, RouterLink } from 'vue-router';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const themeStore = useThemeStore();
    const route = useRoute();

    const isDarkMode = computed(() => themeStore.isDarkMode);
    const toggleTheme = themeStore.toggleTheme;

    const isActiveRoute = (path: string) => route.path === path;

    const getLinkClass = (path: string) => {
      return [
        'transition-colors duration-300 ease-in-out',
        isActiveRoute(path)
          ? 'text-blue-700 dark:text-blue-500 font-bold'
          : 'text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500',
      ];
    };

    return {
      isDarkMode,
      toggleTheme,
      isActiveRoute,
      getLinkClass,
    };
  },
});
</script>


<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300 ease-in-out">
    <div class="flex flex-wrap items-center justify-between p-4 transition-colors duration-300 ease-in-out">

      <!--Logo-->
      <RouterLink to="/" class="flex items-center  rtl:space-x-reverse">
        <img src="/img/siteLogo.png" class="h-8" alt="weather app logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white transition-colors duration-300 ease-in-out">
          Weather App
        </span>
      </RouterLink>

      <!--Theme toggle-->
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button @click="toggleTheme" class="theme-toggle-btn px-4 py-2">
          <img
            :src="isDarkMode ? '/img/light-mode.png' : '/img/dark-mode.png'"
            alt="Theme Toggle"
            class="w-6 h-6 transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </button>

        <button data-collapse-toggle="navbar-sticky" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky" aria-expanded="false">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      <!--Nav links-->
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 transition-colors duration-300 ease-in-out" id="navbar-sticky">
        <ul class="flex justify-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300 ease-in-out">
          <li>
            <RouterLink :to="'/'" :class="getLinkClass('/')">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="'/daily-forecast'" :class="getLinkClass('/daily-forecast')">Daily forecast</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>



<style scoped>
/* Scoped styles if needed */
</style>
