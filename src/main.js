import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router);
app.use(pinia);

app.mount('#app');
