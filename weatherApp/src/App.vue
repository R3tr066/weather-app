<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";

import {onMounted} from 'vue';
import {useThemeStore} from './stores/ThemeStore';
import Footer from "@/components/Footer.vue";

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
  <NavBar/>
  <body>
    <div class="mt-20">
      <router-view/>
    </div>
  </body>
  <Footer/>
</template>

<style scoped>

</style>
