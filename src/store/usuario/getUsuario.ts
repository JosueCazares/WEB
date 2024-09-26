import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Usuario } from '@/lib/types';

export const useUsuarioStore = defineStore('usuario', () => {
    const usuarios = ref<Usuario[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getUsuarios = async () => {
        loading.value = true;

        try {
            const token = sessionStorage.getItem('token');

            const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

            const response = await httpAPI<APIResponse<Usuario[]>>('/usuario', 'GET',undefined,headers);
            if (response.status !== 'success') {
                console.error('Error en getUsuarios =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }

            if (!response.data) {
                console.error('Error en getUsuarios =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }
            usuarios.value = response.data;
           /*  console.log(usuarios.value); */
            loading.value = false;
        } catch (e) {
            console.error('Error en getUsuarios =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        usuarios,
        error,
        loading,
        getUsuarios
    };
});
