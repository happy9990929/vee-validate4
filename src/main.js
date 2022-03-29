import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

import { schema } from '@/utils/validate.js';
app.provide('schema', schema);
import FormInput from '@/components/FormInput.vue';
app.component('FormInput', FormInput);

app.use(router).mount('#app')
