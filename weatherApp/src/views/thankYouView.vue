<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "thankYouView",
  methods: {
    returnButton(event: Event) {
      event.preventDefault();
      this.$router.push('/')
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center mt-40 ">
    <h1 class="text-4xl font-bold text-black dark:text-white transition-all duration-300">Thank you for contacting
      us</h1>
    <h3 class="font-300 text-black dark:text-white transition-all duration-300">your message has been sent to us</h3>
    <button @click="returnButton" type="button"
            class="mt-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Return home
    </button>
  </div>
</template>

<style scoped>

</style>
