import { createRouter,createWebHistory } from 'vue-router'
import About from '../views/about.vue'
import News from '../views/news.vue'
import Home from '../views/home.vue'
const router = createRouter({
    history:  createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
         {
            path: '/news',
            name: 'news',
            component: News
        }
    ]
})

export default router