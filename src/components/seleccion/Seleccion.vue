<template>
    <v-container>
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title class="tw-font-Roboto text-h5">
                    PERIODOS DE INSCRIPCION
                </v-toolbar-title>
                <!-- Botón para agregar nuevo  -->
                <v-dialog v-model="dialogo" max-width="800px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2 tw-font-Roboto" color="primary" dark v-bind="props">
                            <span class="text-h5">Agregar Periodo</span>
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
                                            <v-text-field v-model="localNombre" label="Nombre " maxlength="70"
                                                :counter="70" :rules="nombreRules" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="localDescripcion" label="Descripcion" maxlength="30"
                                                :rules="descripcionRules" counter clearable
                                                ref="descripcionField"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-select v-model="localStatus" label="Estatus"
                                                :items="['ABIERTA', 'INACTIVO']" item-value="value"></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="cerrar">Cancelar</v-btn>
                            <v-btn color="#00C853" variant="text" @click="guardarPerido">
                                <v-icon left icon="mdi-content-save" class="tw-mr-1"></v-icon>
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-card></v-card>
            <v-data-table :items="periodo" :headers="headers">
                <template v-slot:item.actions="{ item }">
                    <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                        @click="editar(item)"></v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script setup>
import { usePeriodoStore } from '@/store/seleccion/getPeriodos'
import { usePeriodoPostStore } from '@/store/seleccion/postPeriodo'
import { usePeriodoPutStatusStore } from '@/store/seleccion/putPeriodo'
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';

const periodoStore = usePeriodoStore();
const periodoPostStore = usePeriodoPostStore();
const periodoPutStore = usePeriodoPutStatusStore();

const { periodo } = storeToRefs(periodoStore);
const { nombre, descripcion, status } = storeToRefs(periodoPostStore);

const dialogo = ref(false)
const localNombre = ref('')
const localDescripcion = ref('')
const localStatus = ref('')
const editedIndex = ref(-1);
const form = ref(null)
const toast = useToast();


const tituloFormulario = computed(() => {
    return editedIndex.value === -1 ? "Nuevo Periodo" : "Editar Periodo";
});

onMounted(() => {
    periodoStore.getPeriodo();
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Descripcion', key: 'descripcion' },
    { title: 'Estatus', key: 'status' },
    { title: 'Acciones', key: 'actions', sortable: false },
]
const nombreRules = [
    (v) => !!v || 'El nombre es requerido',
    (v) => (v && v.length >= 3) || 'El nombre debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]
const descripcionRules = [
    (v) => !!v || 'La descripcion es requerida',
    (v) => (v && v.length >= 3) || 'La descripcion debe minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'La descripcion debe tener menos de 70 caracteres',
]

const editar = (item) => {
    editedIndex.value = item.id;
    localNombre.value = item.nombre;
    localDescripcion.value = item.descripcion;
    localStatus.value = item.status;
    dialogo.value = true
}
function cerrar() {
    dialogo.value = false

}

const validarFormulario = async () => {
    if (!localNombre.value || !localDescripcion.value || !localStatus.value) {
        toast.error('Todos los campos son requeridos ', { timeout: 2000 })
        return false
    }

    return true
}

const guardarPerido = async () => {
    try {
        const isValid = await form.value.validate();

        if (!isValid) {
            toast.error('Todos los campos son requeridos ', { timeout: 2000 });
            return;
        }
        if (!await validarFormulario()) {
            return;
        }
        if (editedIndex.value !== -1) {
            let periodo = {
                id: editedIndex.value,
                nombre: localNombre.value,
                descripcion: localDescripcion.value,
                status: localStatus.value
            }
            //console.log(periodo);
            periodoPutStore.setData(periodo)
            await periodoPutStore.putPeriodo()
            editedIndex.value = -1
            localNombre.value = ''
            localDescripcion.value = ''
            cerrar()
            await periodoStore.getPeriodo()
        } else {
            periodoPostStore.nombre = localNombre.value
            periodoPostStore.descripcion = localDescripcion.value
            periodoPostStore.status = localStatus.value
            await periodoPostStore.postPeriodo()
            localNombre.value = ''
            localDescripcion.value = ''
            cerrar()
            await periodoStore.getPeriodo()
        }

    } catch (error) {
        console.log(error)
    }
}
</script>