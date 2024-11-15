import './assets/main.css'
import './styles/index.css'
import './styles/element-variables.scss'
import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)

setupStore(app)
await setupRouter(app)
app.use(ElementPlus)

app.mount('#app')
