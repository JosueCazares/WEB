import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Carrera } from '@/lib/types';

export const useCarreraStore = defineStore('carrera', () => {
    const carrera = ref<Carrera[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getCarrera = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Carrera[]>>('/carrera', 'GET', undefined, undefined, import.meta.env.VITE_API_URL_GRUPOS);
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
            carrera.value = response.data;
            console.log(carrera.value);
            loading.value = false;
        } catch (e) {
            console.error('Error en get =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        carrera,
        error,
        loading,
        getCarrera
    };
});
