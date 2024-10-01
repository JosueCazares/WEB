import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Rol } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useRolPostStore = defineStore('rolPost', () => {
    
    const error = ref<unknown>();
    const nombre = ref('')
    const descripcion = ref('')
    const toast = useToast()
    const postRol = async () => {
        try{
            const body={
               nombre: nombre.value,
               descripcion: descripcion.value,
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Rol>>('/rol/', 'POST', body,undefined); 
             if (response.status != 'success') {
                console.error('Error al envio  =>', error)
                error.value = response.error;
                return;
            } 
            if( response.data){ 
                toast.success('Envio Exitoso',{
                    timeout:2000
                })
            }
        } catch (e) {
            console.log('Error =>', e);
            error.value = e;
            toast.error('Envio  Falllido.',{
                timeout:2000
            });
        }
    }

    return {
        postRol,
        error,
        nombre,
        descripcion,
        
    }

})