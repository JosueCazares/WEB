<template>
    <div class="tw-flex tw-justify-center tw-items-center tw-min-h-screen">
        <v-card class="tw-flex mx-auto pa-8 " elevation="8" min-width="448" rounded="lg" color="#373737">
            <h1 class="tw-uppercase tw-text-2xl">Login</h1>
            <div class="pa-1">
                <v-text-field v-model="email" :counter="10" label="Correo" hide-details required></v-text-field>
            </div>
            <div class="pa-1">
                <v-text-field v-model="password" :counter="10" label="Password" hide-details required></v-text-field>
            </div>
            <div class="tw-flex tw-justify-center pa-1">
                <v-btn class="w-100" @click="handleSubmit">ACCEDER</v-btn>
            </div>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/store/access/login'
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification'

const toast = useToast()
const loginStore = useLoginStore();

const { email, password } = storeToRefs(loginStore);

const validarEmail = (email: string): boolean => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const handleSubmit = () => {
    if (!password.value || !email.value) {
        toast.error('Llene los campos', {
            timeout: 2000
        })
        return
    } if (!validarEmail(email.value)) {
        toast.error('Ingrese un email válido', {
            timeout: 2000
        })
        return
    }
    //console.log(email.value, password.value);
    loginStore.login()
};
</script>