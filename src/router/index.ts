import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {path: '/', component: () => import('@/components/Home.vue')},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})