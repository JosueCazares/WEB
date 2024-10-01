import { defineStore } from 'pinia'
import { ref } from 'vue';
import { httpAPI } from "@/lib/api";
import type { APIResponse, Aspirante } from '@/lib/types';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';


export const useAspiranteStore = defineStore('aspirante', () => {
    
    const error = ref<unknown>();
    const toast = useToast()
    const nombre = ref('')
    const email = ref('')
    const telefono = ref('')
    const username = ref('')
    const curp = ref('')
    const carrera_deseada = ref('')
    const router = useRouter();

    const postAspirante = async () => {
        try{
            const body={
               nombre: nombre.value,
               email: email.value,
               telefono: telefono.value,
               username: username.value,
               curp: curp.value,
               carrera_deseada: carrera_deseada.value,
               status:"RECHAZADO"
            }
            console.log(body);
             const response = await httpAPI<APIResponse<Aspirante>>('/aspirante/', 'POST', body,undefined,import.meta.env.VITE_API_URL_SELECCION); 
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
        postAspirante,
        error,
        nombre,
        email,
        telefono,
        username,
        curp,
        carrera_deseada

    }

})