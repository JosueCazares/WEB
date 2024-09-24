import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import {useToast} from 'vue-toastification'

const toas = useToast()


const routes: RouteRecordRaw[] = [
    {path: '/', component: () => import('@/components/Home.vue')},
    {path: '/login', component: () => import('@/components/access/login.vue')},
    {path: '/home', component: () => import('@/components/Home.vue'),
        meta: {requiresAuth: true},
        children: [
            {path: '/rol', component: () => import('@/components/rol/rol.vue')},
        ]
    },

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token');
    const rol = sessionStorage.getItem('rol');  
  
    if (to.meta.requiresAuth) {
      if (!token) {
        toas.error('Acceso denegado inicia sesion',{
          timeout:2000
        })
        return next('/');
      }
      if(!rol){
        toas.error('Acceso denegado inicia sesion',{
          timeout:2000
        })
        return next('/');
      }
      if (rol === 'OPERATIVO' && to.path === '/usuario') {
        toas.error('Acceso denegado', {
          timeout: 2000
        });
        return next('/home');
      }
    }
    next();
  });