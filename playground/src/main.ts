import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { TextExpansionAnimation } from '../../src'
// import { TextExpansionAnimation } from 'text-expansion-animation'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import '../../src/index.css'
// import 'text-expansion-animation/style.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.component('TextExpansionAnimation', TextExpansionAnimation)
app.use(router)
app.mount('#app')
