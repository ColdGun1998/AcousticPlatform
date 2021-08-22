import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElInputNumber, ElDialog, ElUpload, ElForm, ElFormItem, ElSelect, ElOption, ElSwitch, ElCard, ElTable, ElTableColumn, ElContainer, ElAside } from 'element-plus'
import './style/index.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'normalize.css'

const app = createApp(App).use(store).use(router)
app.use(ElButton)
app.use(ElInputNumber)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElSelect)
app.use(ElOption)
app.use(ElSwitch)
app.use(ElCard)
app.use(ElTableColumn)
app.use(ElContainer)
app.use(ElAside)
app.use(ElTable)
app.use(ElDialog)
app.use(ElUpload)
app.mount('#app')
