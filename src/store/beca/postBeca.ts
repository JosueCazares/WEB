import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Beca } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useBecaPostStore = defineStore('becaPost', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const postBeca = async (nombre:string,descripcion:string,estatus:string) => {
        try{
            const body={
               nombre: nombre,
               descripcion: descripcion,
               estatus: estatus,
               
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Beca>>('/catalagoBeca/', 'POST', body,undefined,import.meta.env.VITE_API_URL_BECA); 
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
        postBeca,
        error,        
    }

})