import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/reset.css"
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import router from "./router/index";
createApp(App).use(router).mount('#app')
