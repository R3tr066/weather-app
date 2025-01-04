import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    cityName: localStorage.getItem('cityName') || '',
  }),
  actions: {
    setCity(city: string) {
      this.cityName = city;
      localStorage.setItem('cityName', city);
    },
  },
});
