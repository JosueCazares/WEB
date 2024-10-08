import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Periodo } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const usePeriodoPutStatusStore = defineStore('periodoPutStatus', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const status = ref('')
    const nombre = ref('')
    const id = ref('')
    const descripcion = ref('')
   
    const setData = (data: any) => {
        id.value = data.id;
        nombre.value = data.nombre;
        descripcion.value = data.descripcion;
        status.value = data.status;
    }
    const putPeriodo = async () => {
        try{
            let body={
                id: id.value,
                nombre: nombre.value,
                status: status.value,
                descripcion: descripcion.value
            };
            
            console.log(body);
              const response = await httpAPI<APIResponse<Periodo>>('/periodo/', 'PUT', body,undefined,import.meta.env.VITE_API_URL_SELECCION); 
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
        putPeriodo,
        error,
        status,
        id,
        nombre,
        descripcion,
        setData

    }

})