<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import WeatherCard from "@/components/WeatherCard.vue";
</script>

<template>
  <WeatherCard
    location="New York"
    :temperature="26"
    condition="Sunny"
    :windSpeed="10"
    :humidity="65"
    :feelsLike="28"
    :pressure="1012"
    iconCode="01d"
  />
</template>

<style scoped>

</style>
