import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse, Rol } from '@/lib/types';

export const useRolStore = defineStore('rol', () => {
    const roles = ref<Rol[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();

    const getRoles = async () => {
        loading.value = true;

        try {
            const response = await httpAPI<APIResponse<Rol[]>>('/rol', 'GET');
            if (response.status !== 'success') {
                console.error('Error en getRoles =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }

            if (!response.data) {
                console.error('Error en getRoles =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }
            roles.value = response.data;
           // console.log(roles.value);
            loading.value = false;
        } catch (e) {
            console.error('Error en getRoles =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        roles,
        error,
        loading,
        getRoles
    };
});
