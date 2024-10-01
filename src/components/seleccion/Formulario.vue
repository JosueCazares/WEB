<template>
    <div class="tw-flex tw-justify-center tw-items-center tw-min-h-screen">
        <v-card class="tw-flex mx-auto pa-8 " elevation="8" min-width="448" rounded="lg" color="">
            <h1 class="tw-uppercase tw-text-2xl">Inscripciones</h1>
            <v-row class="py-5">
                <v-col cols="6" sm="12">
                    <div class="pa-1">
                        <v-text-field v-model="nombre" :rules="nombreRules" :counter="10" label="Nombre" hide-details
                            required></v-text-field>
                    </div>
                    <div class="pa-1">
                        <v-text-field v-model="email" :rules="correoRules" :counter="10" label="Correo" hide-details
                            required></v-text-field>
                    </div>
                    <div class="pa-1">
                        <v-text-field v-model="telefono" :rules="telefonoRules" :counter="10" label="Telefono"
                            hide-details required></v-text-field>
                    </div>
                </v-col>
                <v-col cols="6" sm="12">
                    <div class="pa-1">
                        <v-text-field v-model="username" :rules="nombreUsuarioRules" :counter="10"
                            label="nombre de usuario" hide-details required></v-text-field>
                    </div>
                    <div class="pa-1">
                        <v-text-field v-model="curp" :rules="curpRules" :counter="10" label="CURP" hide-details
                            required></v-text-field>
                    </div>
                    <div class="pa-1">
                        <v-text-field v-model="carrera_deseada" :rules="carrera_deseadaRules" :counter="10"
                            label="Carrera Deseada" hide-details required></v-text-field>
                    </div>
                </v-col>
            </v-row>
            <v-btn class="w-100" color="blue-grey-lighten-1" @click="enviar();">
                ENVIAR
            </v-btn>
        </v-card>
    </div>
</template>
<script setup>
import { useAspiranteStore } from '@/store/seleccion/postAlumno'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification';

const toast = useToast()
const aspiranteStore = useAspiranteStore()
const { nombre, email, telefono, username, curp, carrera_deseada } = storeToRefs(useAspiranteStore())

const nombreRules = [
    (v) => !!v || 'El nombre es requerido',
    (v) => (v && v.length <= 10) || 'El nombre debe tener menos de 70 caracteres',
]
const telefonoRules = [
    (v) => !!v || 'El telefono es requerido',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]
const correoRules = [
    (v) => !!v || 'El correo es requerido',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]
const nombreUsuarioRules = [
    (v) => !!v || 'El nombre de usuario es requerido',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]
const curpRules = [
    (v) => !!v || 'El curp es requerido',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]
const carrera_deseadaRules = [
    (v) => !!v || 'La carrera es requerida',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]

const validarFormulario = () => {
    if (!nombre.value || !email.value || !telefono.value || !username.value || !curp.value || !carrera_deseada.value) {
        toast.error('Todos los campos son requeridos', { timeout: 2000 })
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        toast.error('El correo debe ser un email válido', { timeout: 2000 })
        return false
    }

    return true
}
const enviar = () => {
    if (!validarFormulario()) return

    aspiranteStore.postAspirante()
    nombre.value = ''
    email.value = ''
    telefono.value = ''
    username.value = ''
    curp.value = ''
    carrera_deseada.value = ''
    nombreError.value = false
    emailError.value = false
    telefonoError.value = false
    usernameError.value = false
    curpError.value = false
    carreraError.value = false
}




</script>