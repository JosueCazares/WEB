import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse,Libro } from '@/lib/types';
import { useToast } from 'vue-toastification'

export const useLibroPostStore = defineStore('libroPost', () => {
    const titulo = ref('');
    const autor = ref('');
    const archivo = ref<File>(null);
    const universidad = ref('');
    const genero = ref('');
    const estatus = ref('');
    const loading = ref<boolean>(false);
    const error = ref<unknown>();
    const toast = useToast();

    const postLibro = async () => {
        loading.value = true;

        try {

            const body ={
                titulo:titulo.value,
                autor:autor.value,
                genero:genero.value,
                universidad:universidad.value,
                estatus:estatus.value,
            }
            const formData = new FormData();
            for(const key in body){
                formData.append(key,body[key]);
            }
            if(archivo.value){
              formData.append('pdf',archivo.value);
            }else{
                throw new Error('No se ha seleccionado un archivo');
            }
            console.log(body);
            console.log(archivo.value);
            const response = await httpAPI<APIResponse<Libro>>('/libros', 'POST',formData,undefined,undefined,true);
            if (response.status !== 'success') {
                console.error('Error en post =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }

            if (!response.data) {
                console.error('Error en post =>', response.error);
                error.value = response.error;
                loading.value = false;
                return;
            }
            toast.success('Creacion Exitosa',{timeout:2000});
            loading.value = false;
        } catch (e) {
            console.error('Error en getUsuarios =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        autor,
        titulo,
        genero,
        archivo,
        estatus,
        error,
        loading,
        universidad,
        postLibro
    };
});
