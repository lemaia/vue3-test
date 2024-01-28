import { createPinia } from 'pinia'
import router from './router'
import { createApp } from 'vue'

import './styles/styles.scss'

import App from './App.vue'


const app = createApp(App)
app.use(createPinia())
app.use(router)



app.mount('#app')
