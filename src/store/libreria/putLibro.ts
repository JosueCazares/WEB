import { httpAPI } from '@/lib/api'; 
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse,Libro,Estatus } from '@/lib/types';
import { useToast } from 'vue-toastification'

export const useLibroPutStore = defineStore('libroPut', () => {
    const titulo = ref('');
    const id = ref('');
    const autor = ref('');
    const genero = ref('');
    const universidad = ref('');
    const estatus = ref<Estatus | string>('');
    const archivo = ref<File | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<unknown>();
    const toast = useToast();

    const setData = (libro:Libro) => {
        id.value = libro.id.toString();
        titulo.value = libro.titulo;
        autor.value = libro.autor;
        genero.value = libro.genero;
        universidad.value = libro.universidad;
        estatus.value = libro.estatus;
    }

    const putLibro = async () => {
        loading.value = true;

        try {

            const body ={
                id:parseInt(id.value),
                titulo:titulo.value,
                autor:autor.value,
                genero:genero.value,
                estatus:estatus.value,
                universidad:universidad.value,
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
           /*  console.log(body);
            console.log(archivo.value); */
            const response = await httpAPI<APIResponse<Libro>>('/libros', 'PUT',formData,undefined,undefined,true);
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
            toast.success('Edicion Exitosa',{timeout:2000});
            loading.value = false;
        } catch (e) {
            console.error('Error en put =>', e);
            error.value = e;
            loading.value = false;
        }
    };

    return {
        id,
        archivo,
        autor,
        titulo,
        genero,
        estatus,
        error,
        universidad,
        loading,
        putLibro,
        setData
    };
});
