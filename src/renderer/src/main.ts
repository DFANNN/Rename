import './assets/main.css'
import 'element-plus/dist/index.css'
import {createApp} from 'vue'
import router from '@renderer/routers/index'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
