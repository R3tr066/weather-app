import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    cityName: localStorage.getItem('cityName') || '', // Load from localStorage if available
  }),
  actions: {
    setCity(city: string) {
      this.cityName = city;
      localStorage.setItem('cityName', city); // Save to localStorage when city changes
    },
  },
});
