<template>
    <v-card title="USUARIOS" flat>
        <!-- <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template> -->
        <v-sheet max-width="800px">
            <v-data-table :items="usuarios"></v-data-table>
        </v-sheet>
    </v-card>
</template>
<script setup lang="ts">
import { useUsuarioStore } from '@/store/usuario/getUsuario'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';


const UsuarioStore = useUsuarioStore()


const { usuarios } = storeToRefs(UsuarioStore)

onMounted(() => {
    UsuarioStore.getUsuarios()
})

</script>