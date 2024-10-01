<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title class="tw-font-Roboto text-h5">
                ROL
            </v-toolbar-title>
            <!-- Botón para agregar nuevo usuario -->
            <v-dialog v-model="dialogo" max-width="800px">
                <template v-slot:activator="{ props }">
                    <v-btn class="mb-2 tw-font-Roboto" color="primary" dark v-bind="props">
                        <span class="text-h5">Agregar Rol</span>
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
                                        <v-text-field v-model="localNombre" label="Nombre Completo" maxlength="70"
                                            :counter="70" :rules="nombreRules" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localDescripcion" label="Descripcion" maxlength="30"
                                            :rules="descripcionRules" counter clearable
                                            ref="descripcionField"></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="cerrar">Cancelar</v-btn>
                        <v-btn color="#00C853" variant="text" @click="guardarRol">
                            <v-icon left icon="mdi-content-save" class="tw-mr-1"></v-icon>
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card>
            <v-data-table :headers="headers" :items="filtredRoles">
                <template v-slot:item.actions="{ item }">
                    <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                        @click="editar(item)"></v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script setup>
import { useRolStore } from '@/store/rol/getRol'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue';
import { useRolPostStore } from '@/store/rol/postRol'
import { useRolPutStore } from '@/store/rol/putRol'
import { useToast } from 'vue-toastification';



const RolStore = useRolStore()
const RolPostStore = useRolPostStore()
const RolPutStore = useRolPutStore()

const toast = useToast()
const { roles } = storeToRefs(RolStore)
const { nombre, descripcion } = storeToRefs(RolPostStore)

const localNombre = ref('')
const localDescripcion = ref('')
const form = ref(null)
const editedIndex = ref(-1);

const dialogo = ref(false)

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Descripción', key: 'descripcion' },
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

const filtredRoles = computed(() => {
    return roles.value.map(role => {
        return {
            id: role.id,
            nombre: role.nombre,
            descripcion: role.descripcion

        }
    })
})

onMounted(() => {
    RolStore.getRoles()
})

const tituloFormulario = computed(() => {
    return editedIndex.value === -1 ? "Nuevo Rol" : "Editar Rol";
});

const validarFormulario = async () => {
    if (!localNombre.value || !localDescripcion.value) {
        toast.error('Todos los campos son requeridos aaaa', { timeout: 2000 })
        return false
    }

    return true
}

const guardarRol = async () => {
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
            /*  console.log('editar');
             console.log('local' + localNombre.value); */
            //READY FOR LOGIC
            let rol = {
                id: editedIndex.value,
                nombre: localNombre.value,
                descripcion: localDescripcion.value
            }
            //console.log(rol);
            RolPutStore.setData(rol)
            await RolPutStore.putRol()
            cerrar()
            await RolStore.getRoles();
        } else {
            RolPostStore.nombre = localNombre.value;
            RolPostStore.descripcion = localDescripcion.value;
            // Llamada al store para guardar
            await RolPostStore.postRol();

            // Limpiar el formulario local
            localNombre.value = '';
            localDescripcion.value = '';

            cerrar();
            await RolStore.getRoles();
        }
        editedIndex.value = -1;
        //console.log(localNombre.value);

    } catch (error) {
        console.error('Error al validar el formulario:', error);
        toast.error('Ocurrió un error al validar el formulario', { timeout: 2000 });
    }
};
function cerrar() {
    dialogo.value = false
    localNombre.value = ''
    localDescripcion.value = ''
}

function editar(item) {
    editedIndex.value = item.id;
    localNombre.value = item.nombre;
    localDescripcion.value = item.descripcion;
    dialogo.value = true;
    //console.log(editedIndex.value);
}

</script>