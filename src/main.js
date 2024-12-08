import './styles/index.css'
import './styles/element-variables.scss'
import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import ElementPlus from 'element-plus'
import App from './App.vue'
import Plugins from './plugins'

const app = createApp(App)

setupStore(app)
setupRouter(app)
app.use(ElementPlus)
app.use(Plugins)

app.mount('#app')
