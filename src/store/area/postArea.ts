import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Area } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useAreaPostStore = defineStore('areaPost', () => {
    
    const error = ref<unknown>();
   
    const descripcion = ref('')
    const toast = useToast()
    const postArea = async (nombre:string) => {
        try{
            const body={
               nombre: nombre,
               
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Area>>('/areas/', 'POST', body,undefined,import.meta.env.VITE_API_URL_PERSONAL); 
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
        postArea,
        error,
        
        descripcion,
        
    }

})