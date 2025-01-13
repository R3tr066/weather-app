<script lang="ts">
import { defineComponent } from "vue"
import CurrentLocationWeather from "@/components/CurrentLocationWeather.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    // CurrentLocationWeather

  },
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-black dark:text-white text-2xl font-bold mb-4 transition-all duration-300">Current Location Weather</h1>
<!--    <CurrentLocationWeather />-->
  </div>
</template>


<style scoped>
body {
  transition: background-color 0.5s ease;
}
</style>
