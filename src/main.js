import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {Progress, Button, Popup} from 'vant'
import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App)

app.use(router)
app.use(Progress)
app.use(Button)
app.use(Popup)

app.mount('#app')
