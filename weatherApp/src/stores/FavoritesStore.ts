import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteCities = ref<string[]>(JSON.parse(localStorage.getItem('favoriteCities') || '[]'));

  const addCity = (city: string) => {
    if (!favoriteCities.value.includes(city)) {
      favoriteCities.value.push(city);
      updateLocalStorage();
    }
  };

  const removeCity = (city: string) => {
    favoriteCities.value = favoriteCities.value.filter((c) => c !== city);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
  };

  return {
    favoriteCities: computed(() => favoriteCities.value),
    addCity,
    removeCity,
  };
});
