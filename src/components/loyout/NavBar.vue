<template>
    <v-app-bar app class="bg-white">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/home">
            <v-toolbar-title class="title">AREA-TI</v-toolbar-title>
        </router-link>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" color="grey-lighten-5">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" class="">
                    <router-link to="/contratos">
                        <v-btn block size="large" variant="outlined">Roles</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/clientes">
                        <v-btn block size="large" variant="outlined">Usuarios</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="" v-if="rol === 'ADMIN' || rol === 'SUPERADMIN'">
                    <router-link to="/usuario">
                        <v-btn block size="large" variant="outlined">Usuarios</v-btn>
                    </router-link>
                </v-col>
                <v-divider></v-divider>
                <v-col cols="12" class="" v-slot="append">
                    <v-btn block size="large" variant="outlined" color="red" @click="logout">Cerrar Sesión</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const rol = ref('')
const drawer = ref(false);
const router = useRouter()

rol.value = sessionStorage.getItem('rol')
console.log("ROL:" + rol.value);
const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('idUsuario')
    sessionStorage.removeItem('nombre')
    router.push('/')
}

</script>