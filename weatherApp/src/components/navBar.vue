<script lang="ts">
import { defineComponent } from 'vue';
import { useThemeStore } from '../stores/theme.js'; // Import Pinia store

export default defineComponent({
  name: "NavBar",
  setup() {
    const themeStore = useThemeStore(); // Use Pinia store inside setup

    const isDarkMode = themeStore.isDarkMode;  // Access the current theme state
    const toggleTheme = themeStore.toggleTheme;  // Get the function to toggle the theme

    return {
      isDarkMode,
      toggleTheme
    };
  },
});
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/img/siteLogo.png" class="h-8" alt="weather app logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Weather app</span>
      </a>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
          </li>
        </ul>
      </div>
      <!-- Dark/Light Mode Toggle -->
      <button @click="toggleTheme" class="theme-toggle-btn">
        <img :src="isDarkMode ? '/img/dark-mode.png' : '/img/light-mode.png'" alt="Theme Toggle" class="w-6 h-6" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* Add any specific styles for the navbar here */
</style>
