import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, NewPass } from '@/lib/types';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';


export const usenewPassStore = defineStore('newpass', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const newPass = ref('')
    const router = useRouter();

    const sentNewPass = async () => {
        try{

            const token = sessionStorage.getItem('token');

            const body={
                token:token,
                nuevaPass:newPass.value
            }
            console.log(body);
            const response = await httpAPI<APIResponse<NewPass>>('/usuario/newPass', 'PUT', body);
            if (response.status != 'success') {
                console.error('Error al iniciar Sesion =>', error)
                error.value = response.error;
                return;
            } 
            if(response.jwt && response.data){

               
                toast.success('Contraseña Cambiada',{
                    timeout:2000
                })
            }
            router.push('/home')
            console.log(response);
        } catch (e) {
            console.log('Error =>', e);
            error.value = e;
            toast.error('Acceso  denegado.',{
                timeout:2000
            });
        }
    }

    return {
        sentNewPass,
        error,
        newPass,
        
    }

})