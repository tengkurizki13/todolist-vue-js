import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let authentication = localStorage.getItem('access_token')
//   if (!authentication && to.name == 'home') next('login')
//   else if (authentication && (to.name == 'login' || to.name == 'register')) next('/')
//   else next()
// })

export default router
