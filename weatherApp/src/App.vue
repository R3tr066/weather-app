<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";

import {onMounted} from 'vue';
import {useThemeStore} from './stores/theme';
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
    <div class="mt-16">
      <router-view/>
    </div>
  </body>
  <Footer/>
</template>

<style scoped>

</style>
