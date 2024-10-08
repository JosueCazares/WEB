<template>
    <div class="tw-flex tw-justify-center tw-items-center tw-text-center tw-min-h-screen">
        <v-form ref="form">
            <v-card class="tw-flex mx-auto pa-8 " elevation="8" min-width="448" rounded="lg" color="">
                <h1 class="tw-uppercase tw-text-2xl">CAMBIO DE CONTRASEÑA</h1>
                <div class="pa-1">
                    <v-text-field variant="outlined" v-model="password" label="NUEVA CONTRASEÑA" :rules="newPassRules"
                        required></v-text-field>
                </div>
                <div class="pa-1">
                    <v-text-field variant="outlined" v-model="newPass" label="CONFIRMAR CONTRASEÑA"
                        :rules="newPassRules" required></v-text-field>
                </div>
                <div class="tw-flex tw-justify-center pa-1">
                    <v-btn class="w-100" @click="handleSubmit">ACCEDER</v-btn>
                </div>
            </v-card>
        </v-form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import { usenewPassStore } from '@/store/access/newPass'
import { storeToRefs } from 'pinia';

const password = ref('');
const newPassword = ref('');
const toast = useToast();
const newPassStore = usenewPassStore();
const form = ref(null)

const { newPass } = storeToRefs(newPassStore);

const newPassRules = [
    (v) => !!v || 'La contraseña es requerida',
    (v) => (v && v.length >= 8) || 'El minimo es de 8 caracteres',
    (v) => (v && v.length <= 70) || 'El nombre debe tener menos de 70 caracteres',
]



const handleSubmit = async () => {
    if (!password.value || !newPass.value) {
        toast.error('Llene los campos');
        return;
    }
    const isValid = await form.value.validate();
    if (!isValid) {
        toast.error('Todos los campos son requeridos', { timeout: 2000 });
        return;
    }
    if (password.value !== newPass.value) {
        toast.warning('Las contraseñas no coinciden');
        return;
    }
    newPassStore.sentNewPass();
    toast.info('Contraseña cambiada', { timeout: 2000 });
    password.value = '';
    newPass.value = '';
}
</script>