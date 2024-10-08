import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Periodo } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const usePeriodoPostStore = defineStore('periodoPost', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const nombre = ref('')
    const descripcion = ref('')
    const status = ref('')
    

    const postPeriodo = async () => {
        try{
            const body={
               nombre: nombre.value,
               descripcion: descripcion.value,
               status: status.value,
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Periodo>>('/periodo/', 'POST', body,undefined,import.meta.env.VITE_API_URL_SELECCION); 
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
        postPeriodo,
        error,
        nombre,
        descripcion,
        status,

    }

})