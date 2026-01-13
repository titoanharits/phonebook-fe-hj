import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './style.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  position: 'top-right',
  theme: 'colored',
} as ToastContainerOptions);

app.mount('#app');
