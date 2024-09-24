/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

//global styles
import './main.css'

// Composables
import { createApp } from 'vue'

//pinia state mangement
import { createPinia } from 'pinia'

//router
import { router } from './router'

//toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';

const pinia = createPinia()

const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)

registerPlugins(app)

app.mount('#app')
