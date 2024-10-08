import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Beca } from '@/lib/types';

export const useBecaStore = defineStore('beca', () => {
    const beca = ref<Beca[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getBecas = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Beca[]>>('/catalagoBeca', 'GET', undefined, undefined, import.meta.env.VITE_API_URL_BECA);
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
            beca.value = response.data;
           /*  console.log(beca.value); */
            loading.value = false;
        } catch (e) {
            console.error('Error en get =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        beca,
        error,
        loading,
        getBecas
    };
});
