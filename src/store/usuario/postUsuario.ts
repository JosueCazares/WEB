import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Usuario } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useUsuarioPostStore = defineStore('usuarioPost', () => {
    
    const error = ref<unknown>();
    const nombre = ref('')
    const correo = ref('')
    const contrasena = ref('')
    const rol = ref('')
    const estatus = ref('')
    const toast = useToast()
    const postUsuario = async () => {
        try{
            const body={
               nombre: nombre.value,
               correo: correo.value,
               contrasena: contrasena.value,
               rol: parseInt(rol.value),
               estatus: estatus.value,
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Usuario>>('/usuario/', 'POST', body,undefined); 
             if (response.status != 'success') {
                console.error('Error al envio  =>', error)
                error.value = response.error;
                return;
            } 
            if(response.error){
                console.log(response.error);
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
        postUsuario,
        error,
        nombre,
        correo,
        contrasena,
        rol,
        estatus,

        
    }

})