import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useThemeStore } from './stores/ThemeStore';
import './assets/main.css';



const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Load theme before mounting the app
const themeStore = useThemeStore();
themeStore.loadTheme();

app.mount('#app');
