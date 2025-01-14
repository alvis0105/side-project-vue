import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import App from './App.vue'
import Plugins from './plugins'

const app = createApp(App)

setupStore(app)
setupRouter(app)
app.use(Plugins)

app.mount('#app')
