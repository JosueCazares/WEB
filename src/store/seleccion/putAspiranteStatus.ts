import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Aspirante } from '@/lib/types';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';


export const useAspirantePutStatusStore = defineStore('aspirantePutStatus', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const status = ref('')
   

    const putAspiranteStatus = async (id,newStatus) => {
        try{
            let body={};
            if(newStatus == 'RECHAZADO'){
                 body={
                    id:id,
                    status:"ACEPTADO"
                 }
                 
            }else{
                 body={
                    id:id,
                    status:"RECHAZADO"
                 }
            
            }
            
              const response = await httpAPI<APIResponse<Aspirante>>('/aspirante/status', 'PUT', body,undefined,import.meta.env.VITE_API_URL_SELECCION); 
             if (response.status != 'success') {
                console.error('Error en Actualizacion  =>', error)
                error.value = response.error;
                return;
            } 
            if( response.data){ 
                toast.success('Actualizacion Exitosa',{
                    timeout:2000
                })
            } 
        } catch (e) {
            console.log('Error =>', e);
            error.value = e;
            toast.error('Envio  Fallido.',{
                timeout:2000
            });
        }
    }

    return {
        putAspiranteStatus,
        error,
        status,
        

    }

})