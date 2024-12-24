import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Popup from './Popup.vue'

const app = createApp(Popup)
const pinia = createPinia()

app.use(pinia)
app.mount('#app') 
