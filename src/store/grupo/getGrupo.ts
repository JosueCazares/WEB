import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Grupo } from '@/lib/types';

export const useGrupoStore = defineStore('grupo', () => {
    const grupo = ref<Grupo[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getGrupo = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Grupo[]>>('/grupo', 'GET', undefined, undefined, import.meta.env.VITE_API_URL_GRUPOS);
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
            grupo.value = response.data;
             console.log(grupo.value); 
            loading.value = false;
        } catch (e) {
            console.error('Error en get =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        grupo,
        error,
        loading,
        getGrupo
    };
});
