import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import VideoView from '../views/VideoView.vue'
import UploadVideoView from '../views/UploadVideoView.vue'

const routes = [
  { path: '/about', component: AboutView },
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },
  { path: '/video', component: VideoView },
  { path: '/uploadvideo', component: UploadVideoView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
