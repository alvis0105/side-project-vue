import './styles/index.css'
import './styles/element-variables.scss'
import { createApp } from 'vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import ElementPlus from 'element-plus'
import App from './App.vue'
import Plugins from './plugins'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

setupStore(app)
setupRouter(app)
app.use(Plugins)
app.use(ElementPlus, {
  locale: zhCn, // 傳入語系物件
})

app.mount('#app')
