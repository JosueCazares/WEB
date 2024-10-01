import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Usuario } from '@/lib/types';
import { useToast } from 'vue-toastification'


export const useUsuarioPutStore = defineStore('usuarioPut', () => {
    
    const error = ref<unknown>();
    const id = ref('')
    const nombre = ref('')
    const correo = ref('')
    const contrasena = ref('')
    const rol = ref('')
    const estatus = ref('')
    const toast = useToast()

    function setData(usuario: any){
        id.value = usuario.id;
        nombre.value = usuario.nombre;
        correo.value = usuario.correo;
        contrasena.value = usuario.contrasena;
        rol.value = usuario.rol;
        estatus.value = usuario.estatus;
    }

    const putUsuario = async () => {
        try{
            const body={
                id: id.value,
               nombre: nombre.value,
               correo: correo.value,
               contrasena: contrasena.value,
               rol: parseInt(rol.value),
               estatus: estatus.value,
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Usuario>>('/usuario/', 'PUT', body,undefined); 
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
        putUsuario,
        setData,
        id,
        error,
        nombre,
        correo,
        contrasena,
        rol,
        estatus,

        
    }

})