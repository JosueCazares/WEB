<template>
    <v-app-bar app class="bg-white">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/home" v-if="rol === '2'">
            <v-toolbar-title class="title">AREA-TI</v-toolbar-title>
        </router-link>
        <router-link to="/home" v-if="rol === '3'">
            <v-toolbar-title class="title">AREA-SE</v-toolbar-title>
        </router-link>
        <router-link to="/home" v-if="rol === '4'">
            <v-toolbar-title class="title">AREA-RH</v-toolbar-title>
        </router-link>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" color="grey-lighten-5">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" class="">
                    <router-link to="/seleccion">
                        <v-btn block size="large" variant="outlined" v-if="rol === '3'">SELECCION</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/becas">
                        <v-btn block size="large" variant="outlined" v-if="rol === '3'">BECAS</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/grupos">
                        <v-btn block size="large" variant="outlined" v-if="rol === '3'">GRUPOS</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/aspirantes">
                        <v-btn block size="large" variant="outlined" v-if="rol === '3'">ASPIRANTES</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/rol">
                        <v-btn block size="large" variant="outlined" v-if="rol === '2'">Roles</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="">
                    <router-link to="/rol">
                        <v-btn block size="large" variant="outlined" v-if="rol === '2'">COTRASEÑA</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="" v-if="rol === '2'">
                    <router-link to="/usuario">
                        <v-btn block size="large" variant="outlined">Usuarios</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="12" class="" v-if="rol === '4'">
                    <router-link to="/personal">
                        <v-btn block size="large" variant="outlined">PERSONAL</v-btn>
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
const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('idUsuario')
    sessionStorage.removeItem('nombre')
    router.push('/')
}

</script>