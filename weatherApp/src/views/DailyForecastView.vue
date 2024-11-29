<script lang="ts">
import {defineComponent} from 'vue'
import DailyForecast from "@/components/DailyForecast.vue";

export default defineComponent({
name: "5DayWeatherView",
  components: {DailyForecast}
})
</script>

<template>
  <daily-forecast/>
</template>

<style scoped>

</style>
