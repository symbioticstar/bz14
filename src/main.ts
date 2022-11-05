import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)


router.afterEach(to => {
  const _ = nextTick(() => {
    document.title = to.meta.title as string || 'default title'
  })
})


app.mount('#app')
