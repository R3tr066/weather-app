// theme.js (Pinia store)
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false,
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
  },
});
