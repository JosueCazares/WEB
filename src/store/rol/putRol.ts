import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Rol } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useRolPutStore = defineStore('rolPut', () => {
    
    const error = ref<unknown>();
    const id = ref('')
    const nombre = ref('')
    const descripcion = ref('')
    const toast = useToast()

    function setData(rol:any){
        id.value = rol.id;
        nombre.value = rol.nombre;
        descripcion.value = rol.descripcion;
    }

    const putRol = async () => {
        try{
            const body={
                id: id.value,
               nombre: nombre.value,
               descripcion: descripcion.value,
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Rol>>('/rol/', 'PUT', body,undefined); 
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
        putRol,
        setData,
        error,
        id,
        nombre,
        descripcion,
        
    }

})