import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import "vuetify/dist/vuetify.min.css";
import 'vuetify/styles'; 

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify(
    {
        components,
        directives,
    }
); 

// !!!!![Vue warn]: Failed to resolve component: 
// Solve it using https://stackoverflow.com/questions/70719044/vue-warn-failed-to-resolve-component-v-toolbar-title-issue-vue3-and-vuetify 

const app = createApp(App);
app.use(vuetify); // Use the Vuetify instance
app.use(router);
app.mount('#app');
