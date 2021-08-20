import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElInputNumber, ElForm, ElFormItem, ElSelect, ElOption, ElSwitch } from 'element-plus'

import 'element-plus/packages/theme-chalk/src/base.scss'

const app = createApp(App).use(store).use(router)
app.use(ElButton)
app.use(ElInputNumber)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElSelect)
app.use(ElOption)
app.use(ElSwitch)
app.mount('#app')
