import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Libro } from '@/lib/types';

export const useLibroStore = defineStore('libro', () => {
    const libros = ref<Libro[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getLibro = async () => {
        loading.value = true;

        try {


            const response = await httpAPI<APIResponse<Libro[]>>('/libros/AllPublic', 'GET',undefined,undefined);
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
            libros.value = response.data;
            console.log(libros.value); 
            loading.value = false;
        } catch (e) {
            console.error('Error en getUsuarios =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        libros,
        error,
        loading,
        getLibro
    };
});
