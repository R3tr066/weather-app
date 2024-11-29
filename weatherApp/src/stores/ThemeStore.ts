import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: ref<boolean>(localStorage.getItem('darkMode') === 'true'),
  }),

  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', String(this.isDarkMode));

      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    loadTheme() {
      const savedTheme = localStorage.getItem('darkMode');
      this.isDarkMode = savedTheme === 'true';

      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
