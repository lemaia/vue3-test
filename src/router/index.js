import { createRouter, createWebHistory } from 'vue-router'
import ListUsers from '../components/ListUsers.vue'
import User from '../components/User.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'list',
            path: '/',
            component: ListUsers
        },
        {
            name: 'user',
            path: '/user/:login',
            component: User
        }

    ]
})

export default router