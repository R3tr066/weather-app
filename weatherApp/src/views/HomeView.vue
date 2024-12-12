<script lang="ts">
import { defineComponent } from "vue";
import WeatherCardFavorites from "@/components/WeatherCardFavorites.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    WeatherCardFavorites,
  },
});
</script>

<template>
  <div class="text-black dark:text-white">
    <weather-card-favorites />
  </div>
</template>

<style scoped>
body {
  transition: background-color 0.5s ease;
}
</style>
