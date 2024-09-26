<template>
    <v-card title="ROLES" flat>
        <!-- <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template> -->

        <v-data-table :headers="headers" :items="filtredRoles"></v-data-table>
    </v-card>
</template>
<script setup lang="ts">
import { useRolStore } from '@/store/rol/getRol'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue';


const RolStore = useRolStore()


const { roles } = storeToRefs(RolStore)

const headers = [
    { text: 'Nombre', value: 'nombre' },
    { text: 'Descripción', value: 'descripcion' },
]

const filtredRoles = computed(() => {
    return roles.value.map(role => {
        return {
            nombre: role.nombre,
            descripcion: role.descripcion

        }
    })
})
onMounted(() => {
    RolStore.getRoles()
})

</script>