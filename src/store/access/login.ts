import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, LoginResponseData } from '@/lib/types';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';


export const useLoginStore = defineStore('login', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const email = ref('')
    const password = ref('')
    const router = useRouter();

    const login = async () => {
        try{
            const body={
                correo:email.value,
                contrasena:password.value
            }
            //console.log(body);
            const response = await httpAPI<APIResponse<LoginResponseData>>('/access/login', 'POST', body);
            if (response.status != 'success') {
                console.error('Error al iniciar Sesion =>', error)
                error.value = response.error;
                return;
            } 
            if(response.jwt && response.data){
                sessionStorage.setItem('token',response.jwt) 
                sessionStorage.setItem('rol',response.data.rol)
                sessionStorage.setItem('idUsuario',response.data.id)
                sessionStorage.setItem('nombre',response.data.nombre)
                //console.log('Inicio de sesion exitoso =>', response);
                console.log('Token:', sessionStorage.getItem('token'));
                console.log('Rol:', sessionStorage.getItem('rol'));
                console.log('ID Usuario:', sessionStorage.getItem('idUsuario'));
                console.log('nombre:', sessionStorage.getItem('nombre'));

                router.push('/home')
                toast.success('Bienvenido',{
                    timeout:2000
                })
            }
        } catch (e) {
            console.log('Error =>', e);
            error.value = e;
            toast.error('Acceso  denegado.',{
                timeout:2000
            });
        }
    }

    return {
        login,
        error,
        password,
        email
    }

})