<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title class="tw-font-Roboto text-h5">
                Area
            </v-toolbar-title>
            <!-- Botón para agregar nuevo usuario -->
            <v-dialog v-model="dialogo" max-width="800px">
                <template v-slot:activator="{ props }">
                    <v-btn class="mb-2 tw-font-Roboto" color="primary" dark v-bind="props">
                        <span class="text-h5">Agregar Area</span>
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
                                        <v-text-field v-model="localNombre" label="Nombre" maxlength="70" :counter="70"
                                            :rules="nombreRules" clearable></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="cerrar">Cancelar</v-btn>
                        <v-btn color="#00C853" variant="text" @click="guardarArea">
                            <v-icon left icon="mdi-content-save" class="tw-mr-1"></v-icon>
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card flat>
            <v-sheet>
                <v-data-table :items="area" :headers="headers">
                    <template v-slot:item.catalogo_personal="{ item }">
                        <span v-if="item.catalogo_personal.length > 0">
                            {{ item.catalogo_personal.map(catalogo => catalogo.nombre).join(', ') }}
                        </span>
                        <span v-else>
                            Sin personal
                        </span>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { onMounted } from 'vue'
import { useAreaStore } from '@/store/area/getArea'
import { useAreaPostStore } from '@/store/area/postArea'
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification';

const areaStore = useAreaStore()
const areaPostStore = useAreaPostStore()
const { area } = storeToRefs(areaStore)
const dialogo = ref(false)
const editedIndex = ref(-1);
const localNombre = ref('')
const toast = useToast()
const form = ref(null)


const tituloFormulario = computed(() => {
    return editedIndex.value === -1 ? "Nueva Area" : "Editar Area";
});
const nombreRules = [
    (v) => !!v || 'El nombre es requerido',
    (v) => (v && v.length >= 3) || 'El nombre debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]

onMounted(() => {
    areaStore.getArea();
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Catalogo', key: 'catalogo_personal' },
]
function cerrar() {
    dialogo.value = false
    localNombre.value = ''

}
const validarFormulario = async () => {
    if (!localNombre.value) {
        toast.error('Todos los campos son requeridos aaaa', { timeout: 2000 })
        return false
    }

    return true
}
const guardarArea = async () => {
    try {
        const isValid = await form.value.validate();

        if (!isValid) {
            toast.error('Todos los campos son requeridos ', { timeout: 2000 });
            return;
        }

        if (!await validarFormulario()) {
            return;
        }

        await areaPostStore.postArea(localNombre.value);
        cerrar();
        await areaStore.getArea();
    } catch (error) {
        console.error('Error al validar el formulario:', error);
        toast.error('Ocurrió un error al validar el formulario', { timeout: 2000 });
    }
}

</script>
