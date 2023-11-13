import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssignmentOne from '../views/AssignmentOne.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/AssignmentOne',
      name: 'AssignmentOne',
      component: AssignmentOne
    },
  ]
})

export default router
