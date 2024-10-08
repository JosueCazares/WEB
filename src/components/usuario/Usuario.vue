<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title class="tw-font-Roboto text-h5">
                USUARIOS
            </v-toolbar-title>
            <!-- Botón para agregar nuevo usuario -->
            <v-dialog v-model="dialogo" max-width="800px">
                <template v-slot:activator="{ props }">
                    <v-btn class="mb-2 tw-font-Roboto" color="primary" dark v-bind="props">
                        <span class="text-h5">Agregar Usuario</span>
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
                                        <v-text-field v-model="localCorreo" label="Correo" maxlength="30"
                                            :rules="correoRules" counter clearable
                                            ref="descripcionField"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="localContra" label="Contraseña" maxlength="30"
                                            :rules="contraRules" counter clearable
                                            ref="descripcionField"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="localStatus" label="Estatus" :items="['ACTIVO', 'INACTIVO']"
                                            item-value="value"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="localRol" :items="roles" item-title="nombre" item-value="id"
                                            label="Rol" ref="descripcionField"></v-select>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="cerrar">Cancelar</v-btn>
                        <v-btn color="#00C853" variant="text" @click="guardarUsuario">
                            <v-icon left icon="mdi-content-save" class="tw-mr-1"></v-icon>
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card>

            <v-data-table :items="usuarios" :headers="headers">
                <template v-slot:item.actions="{ item }">
                    <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                        @click="editar(item)"></v-icon>
                </template>
            </v-data-table>

        </v-card>
    </v-container>
</template>
<script setup>
import { useUsuarioStore } from '@/store/usuario/getUsuario'
import { storeToRefs } from 'pinia'
import { onMounted, computed, ref } from 'vue';
import { useToast } from 'vue-toastification'
import { useUsuarioPostStore } from '@/store/usuario/postUsuario'
import { useUsuarioPutStore } from '@/store/usuario/putUsuario'
import { useRolStore } from '@/store/rol/getRol'

const UsuarioStore = useUsuarioStore()
const UsuarioPostStore = useUsuarioPostStore()
const UsuarioPutStore = useUsuarioPutStore()
const toast = useToast()
const RolStore = useRolStore()

const { usuarios } = storeToRefs(UsuarioStore)
const { nombre, correo, contrasena, rol, estatus } = storeToRefs(UsuarioPostStore)
const { roles } = storeToRefs(RolStore)

const editedIndex = ref(-1);
const dialogo = ref(false)
const localNombre = ref('')
const localCorreo = ref('')
const localContra = ref('')
const localRol = ref('')
const localStatus = ref('')
const localId = ref('')
const form = ref(null)

const tituloFormulario = computed(() => {
    return editedIndex.value === -1 ? "Nuevo Rol" : "Editar Rol";
});

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
const contraRules = [
    (v) => !!v || 'La contraseña es requerida',
    (v) => (v && v.length >= 8) || 'La contraseña debe minimo 8 caracteres',
    (v) => (v && v.length <= 70) || 'La contraseña debe tener menos de 70 caracteres',
]
const correoRules = [
    (v) => !!v || 'El correo  es requerido',
    (v) => (v && v.length >= 3) || 'El correo debe tener minimo 3 caracteres',
    (v) => (v && v.length <= 70) || 'El correo debe tener menos de 70 caracteres',
]

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Correo', key: 'correo' },
    { title: 'Estatus', key: 'estatus' },
    { title: 'Rol', key: 'rol.nombre' },
    { title: 'Acciones', key: 'actions', sortable: false },
]


onMounted(() => {
    RolStore.getRoles()
    UsuarioStore.getUsuarios()
})

function cerrar() {
    dialogo.value = false

}

function editar(item) {
    editedIndex.value = item.id
    dialogo.value = true
    localId.value = item.id
    localNombre.value = item.nombre
    localCorreo.value = item.correo
    localContra.value = item.contrasena
    localStatus.value = item.estatus
    localRol.value = item.rol.id
    console.log(item);
}

const validarFormulario = async () => {
    if (!localNombre.value || !localCorreo.value || !localContra.value || !localStatus.value || !localRol.value) {
        toast.error('Todos los campos son requeridos', { timeout: 2000 })
        return false
    }

    return true
}
const validarEmail = (email) => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



const guardarUsuario = async () => {
    try {
        const correoDuplicado = usuarios.value.map(usuario => usuario.correo)
        const isValid = await form.value.validate();

        if (!isValid) {
            toast.error('Todos los campos son requeridos', { timeout: 2000 });
            return;
        }

        if (!await validarFormulario()) return;
        if (!validarEmail(localCorreo.value)) {
            toast.error('Ingrese un email válido', {
                timeout: 2000
            })
            return
        }
        if (editedIndex.value !== -1) {
            let usuario = {
                id: editedIndex.value,
                nombre: localNombre.value,
                correo: localCorreo.value,
                contrasena: localContra.value,
                estatus: localStatus.value,
                rol: localRol.value,
            }
            if (correoDuplicado.includes(usuario.correo)) {
                toast.error('El correo ya esta registrado, intenta otro', { timeout: 2000 });
                return;
            }
            console.log(usuario);
            UsuarioPutStore.setData(usuario);
            UsuarioPutStore.putUsuario();
            //falta logica para enviar body al put
            cerrar()
        } else {

            UsuarioPostStore.nombre = localNombre.value;
            UsuarioPostStore.correo = localCorreo.value;
            UsuarioPostStore.contrasena = localContra.value;
            UsuarioPostStore.rol = localRol.value;
            UsuarioPostStore.id = localId.value;
            UsuarioPostStore.estatus = localStatus.value;
            console.log('local ' + localCorreo.value);
            console.log('duplicado ' + correoDuplicado);
            if (correoDuplicado.includes(localCorreo.value)) {
                toast.error('El correo ya esta registrado, intenta otro', { timeout: 2000 });
                return;
            }
            //console.log(localStatus.value);
            UsuarioPostStore.postUsuario();
            // Limpiar el formulario local
            localNombre.value = '';
            localCorreo.value = '';
            localStatus.value = '';
            localRol.value = '';
            localContra.value = '';

            cerrar();
        }

        //console.log(localNombre.value);

    } catch (error) {
        console.error('Error al validar el formulario:', error);
        toast.error('Ocurrió un error al validar el formulario', { timeout: 2000 });
    }
};

</script>