import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GitHubUserView from '../views/GitHubUserView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:username',
    name: 'user',
    component: GitHubUserView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router