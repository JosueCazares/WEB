<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title class="tw-font-Roboto text-h5">
                LIBROS
            </v-toolbar-title>
            <!-- Botón para agregar nuevo usuario -->
            <v-dialog v-model="dialogo" max-width="800px">
                <template v-slot:activator="{ props }">
                    <v-btn class="mb-2 tw-font-Roboto" color="primary" dark v-bind="props">
                        <span class="text-h5">Agregar Libro</span>
                        <v-icon left>mdi-plus</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                        {{ tituloFormulario }}
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-form ref="form">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localTitulo" label="TItulo " maxlength="70" :counter="70"
                                            :rules="tituloRules" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localAutor" label="Autor" maxlength="70" :counter="70"
                                            :rules="autorRules" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localGenero" label="Genero" maxlength="70" :counter="70"
                                            :rules="generoRules" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="localEstatus" label="Estatus" :items="['ACTIVO', 'INACTIVO']"
                                            item-value="value"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-file-input clearable label="PDF" v-model="localPdf"
                                            item-value="value"></v-file-input>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localUni" label="Universidad" maxlength="70"
                                            :counter="70" clearable></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="cerrar">Cancelar</v-btn>
                        <v-btn color="#00C853" variant="text" @click="guardarLibro">
                            <v-icon left icon="mdi-content-save" class="tw-mr-1"></v-icon>
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogoPdf">
                <v-card>
                    <v-card-text width="auto" height="auto">
                        <iframe :src="pdfUrl" width="100%" height="1000" type="application/pdf"></iframe>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card flat>
            <v-sheet>
                <v-data-table :items="libros" :headers="headers">
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                            @click="editar(item)"></v-icon>
                        <v-icon class="tw-me-2" color="red" icon="mdi-file-pdf-box" size="x-large"
                            @click="abrirPdf(item)"></v-icon>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLibroStore } from '@/store/libreria/getLibros'
import { useLibroPostStore } from '@/store/libreria/postLibro'
import { useLibroPutStore } from '@/store/libreria/putLibro'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'

const libroStore = useLibroStore()
const libroPutStore = useLibroPutStore()
const libroPostStore = useLibroPostStore()
const toast = useToast()
const rol = sessionStorage.getItem('rol')

const { libros } = storeToRefs(libroStore)

const headers = [
    { title: 'LIBRO', value: 'nombreLibro' },
    { title: 'AUTOR', value: 'autor' },
    { title: 'GENERO', value: 'genero' },
    { title: 'UNIVERSIDAD', value: 'universidad' },
    { title: 'ACCIONES', key: 'actions', sortable: false },

]
const editedIndex = ref(-1);
const dialogo = ref(false)
const dialogoPdf = ref(false)
const localTitulo = ref('')
const localAutor = ref('')
const localGenero = ref('')
const localUni = ref('')
const localEstatus = ref('')
const localPdf = ref('')
const form = ref(null)
const pdfUrl = ref('')

const tituloRules = [
    (v) => !!v || 'El titulo es requerido',
    (v) => (v && v.length >= 3) || 'El titulo debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El titulo debe tener menos de 70 caracteres',
]
const autorRules = [
    (v) => !!v || 'El autor es requerido',
    (v) => (v && v.length >= 3) || 'El autor debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El autor debe tener menos de 70 caracteres',
]
const estatusRules = [
    (v) => !!v || 'El genero es requerido',
    (v) => (v && v.length >= 3) || 'El autor debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El autor debe tener menos de 70 caracteres',
]
const generoRules = [
    (v) => !!v || 'El estatus es requerido',
    (v) => (v && v.length >= 3) || 'El autor debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El autor debe tener menos de 70 caracteres',
]

const tituloFormulario = computed(() => {
    return editedIndex.value === -1 ? "Nuevo Libro" : "Editar Libro";
});

onMounted(() => {
    libroStore.getLibro()
})

const editar = (item) => {
    dialogo.value = true
    editedIndex.value = item.id
    localTitulo.value = item.titulo
    localAutor.value = item.autor
    localGenero.value = item.genero
    localEstatus.value = item.estatus

}

function cerrar() {
    dialogo.value = false
    localAutor.value = ''
    localTitulo.value = ''
    localGenero.value = ''
    localEstatus.value = ''
}

const validarFormulario = async () => {
    if (!localAutor.value || !localEstatus.value || !localGenero.value || !localTitulo.value || !localPdf.value || !localUni.value) {
        toast.error('Todos los campos son requeridos', { timeout: 2000 })
        return false
    }

    return true
}

const guardarLibro = async () => {
    try {
        const isValid = await form.value.validate();

        if (!isValid) {
            toast.error('Todos los campos son requeridos', { timeout: 2000 });
            return;
        }

        if (!await validarFormulario()) return;
        if (editedIndex.value !== -1) {

            await libroPutStore.setData({
                id: editedIndex.value,
                autor: localAutor.value,
                titulo: localTitulo.value,
                genero: localGenero.value,
                estatus: localEstatus.value,
                universidad: localUni.value
            })
            libroPutStore.archivo = localPdf.value
            await libroPutStore.putLibro()
            await libroStore.getLibro()
            cerrar();
            //console.log('editar');
        } else {
            libroPostStore.autor = localAutor.value
            libroPostStore.titulo = localTitulo.value
            libroPostStore.genero = localGenero.value
            libroPostStore.estatus = localEstatus.value
            libroPostStore.universidad = localUni.value
            libroPostStore.archivo = localPdf.value
            await libroPostStore.postLibro()
            //console.log('guardar');
            localAutor.value = ''
            localTitulo.value = ''
            localGenero.value = ''
            localUni.value = ''
            await libroStore.getLibro()
            cerrar();
        }
    } catch (error) {
        console.error('Error al validar el formulario:', error);
        toast.error('Ocurrió un error al validar el formulario', { timeout: 2000 });
    }
}

const esPdf = (url) => {
    return url.toLowerCase().endsWith('.pdf')
}
const urlServe = import.meta.env.VITE_URLSERVER
const abrirPdf = (item) => {
    //console.log(item);
    //console.log('abrir pdf', item.url)
    //console.log("url" + urlServe);
    pdfUrl.value = `data:application/pdf;base64,${item.pdf_file}`;
    //console.log(pdfUrl.value);
    dialogoPdf.value = true
}

</script>