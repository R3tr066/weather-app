<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";

import {onMounted} from 'vue';
import {useThemeStore} from './stores/theme.js';

const themeStore = useThemeStore();

onMounted(() => {
  if (themeStore.isDarkMode) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
});
</script>

<template>
  <body class="bg-white dark:bg-gray-900">
    <div id="app" class="bg-white dark:bg-gray-900">
      <router-view/>
    </div>
  </body>
</template>

<style scoped>

</style>
