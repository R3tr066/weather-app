<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherCardFavorites from "@/components/WeatherCardFavorites.vue";
</script>

<template>
  <div class="mt-20 text-black dark:text-white">
    Toto je HomeView
    <weather-card-favorites/>
  </div>
</template>

<style scoped>
body {
  transition: background-color 0.5s ease;
}

</style>
