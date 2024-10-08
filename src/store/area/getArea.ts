import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Area } from '@/lib/types';

export const useAreaStore = defineStore('area', () => {
    const area = ref<Area[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getArea = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Area[]>>('/areas', 'GET', undefined, undefined, import.meta.env.VITE_API_URL_PERSONAL);
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
            area.value = response.data;
            console.log(area.value);
            loading.value = false;
        } catch (e) {
            console.error('Error en get =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        area,
        error,
        loading,
        getArea
    };
});
