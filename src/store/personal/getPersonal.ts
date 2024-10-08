import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Catalogo_personal } from '@/lib/types';

export const usePersonalStore = defineStore('personal', () => {
    const personal = ref<Catalogo_personal[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getPersonal = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Catalogo_personal[]>>('/personal', 'GET', undefined, undefined, import.meta.env.VITE_API_URL_PERSONAL);
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
            personal.value = response.data;
            console.log(personal.value);
            loading.value = false;
        } catch (e) {
            console.error('Error en get =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        personal,
        error,
        loading,
        getPersonal
    };
});
