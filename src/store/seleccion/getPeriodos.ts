import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Periodo } from '@/lib/types';

export const usePeriodoStore = defineStore('periodo', () => {
    const periodo = ref<Periodo[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getPeriodo = async () => {
        loading.value = true;

        try {
           

            const response = await httpAPI<APIResponse<Periodo[]>>('/periodo', 'GET',undefined,undefined,import.meta.env.VITE_API_URL_SELECCION);
            if (response.status !== 'success') {
                console.error('Error en get =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }

            if (!response.data) {
                console.error('Error en get =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }
            periodo.value = response.data;
            /* console.log(periodo.value);  */
           
        } catch (e) {
            console.error('Error en getUsuarios =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        periodo,
        error,
        loading,
        getPeriodo
    };
});
