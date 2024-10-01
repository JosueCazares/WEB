import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import {useToast} from 'vue-toastification'

const toas = useToast()


const routes: RouteRecordRaw[] = [
    {path: '/', component: () => import('@/components/Home.vue'),meta: {requiresAuth: true},},
    {path: '/login', component: () => import('@/components/access/login.vue')},
    {path: '/forms', component: () => import('@/components/seleccion/Formulario.vue')},
    {path: '/resultados', component: () => import('@/components/seleccion/Formulario.vue')},
    {path: '/home', component: () => import('@/components/Home.vue'),
        meta: {requiresAuth: true },
        children: [
            {path: '/rol', component: () => import('@/components/rol/rol.vue')},
            {path: '/usuario', component: () => import('@/components/usuario/Usuario.vue')},
            {path: '/becas', component: () => import('@/components/becas/Becas.vue')},
            {path: '/seleccion', component: () => import('@/components/seleccion/Seleccion.vue')},
            {path: '/grupos', component: () => import('@/components/grupos/Grupos.vue')},
            {path: '/aspirantes', component: () => import('@/components/seleccion/Aspirante.vue')},
            {path: '/personal', component: () => import('@/components/personal/Personal.vue')},
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
        return next('/login');
      }
      if(!rol){
        toas.error('Acceso denegado inicia sesion',{
          timeout:2000
        })
        return next('/login');
      }
      if (rol !== '2' && (to.path === '/usuario' || to.path ==='/rol')) {
        toas.error('Acceso denegado', {
          timeout: 2000
        });
        return next('/home');
      }
      if (rol !== '3' && (to.path === '/seleccion' || to.path === '/becas' || to.path === '/grupos')) {
        toas.error('Acceso denegado', {
          timeout: 2000
        });
        return next('/home');
      }
      if (rol !== '4' && to.path === '/personal') {
        toas.error('Acceso denegado', {
          timeout: 2000
        });
        return next('/home');
      }
    }
    next();
  });