import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Aspirante } from '@/lib/types';

export const useAspiranteStore = defineStore('aspirante', () => {
    const aspirante = ref<Aspirante[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getAspirante = async () => {
        loading.value = true;

        try {
           

            const response = await httpAPI<APIResponse<Aspirante[]>>('/aspirante', 'GET',undefined,undefined,import.meta.env.VITE_API_URL_SELECCION);
            if (response.status !== 'success') {
                console.error('Error en getAspirante =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }

            if (!response.data) {
                console.error('Error en getAspirante =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }
            aspirante.value = response.data;
           /*  console.log(usuarios.value); */
            loading.value = false;
        } catch (e) {
            console.error('Error en getUsuarios =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        aspirante,
        error,
        loading,
        getAspirante
    };
});
