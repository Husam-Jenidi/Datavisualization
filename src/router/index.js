import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import assignment1 from '../views/assignment1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/assignment1',
      name: 'assignment1',
      component: assignment1
    },
  ]
})

export default router
