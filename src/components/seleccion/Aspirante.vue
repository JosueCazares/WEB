<template>
    <v-card title="ASPIRANTES " flat>
        <!-- <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template> -->

        <v-sheet max-width="800px">
            <v-data-table :headers="headers" :items="aspirante" item-value="id">
                <template v-slot:item.acciones="{ item }">
                    <v-btn color="green" @click="cambiarStatus(item)" v-if="item.status === 'RECHAZADO'">Aceptar</v-btn>
                    <v-btn color="red" @click="cambiarStatus(item)" v-else>Rechazar</v-btn>
                </template>
            </v-data-table>
        </v-sheet>
    </v-card>
</template>
<script setup>
import { useAspiranteStore } from '@/store/seleccion/getAspirantes'
import { useAspirantePutStatusStore } from '@/store/seleccion/putAspiranteStatus'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';


const aspiranteStore = useAspiranteStore()
const aspirantePutStatusStore = useAspirantePutStatusStore()

const { aspirante } = storeToRefs(aspiranteStore)
const { status } = storeToRefs(aspirantePutStatusStore)

onMounted(() => {
    aspiranteStore.getAspirante()
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'CURP', key: 'curp' },
    { title: 'CORREO', key: 'email' },
    { title: 'Estatus', key: 'status' },
    { title: 'Acciones', key: 'acciones', sortable: false },
]


const cambiarStatus = async (item) => {
    try {
        await aspirantePutStatusStore.putAspiranteStatus(item.id, item.status)
        await aspiranteStore.getAspirante()
    } catch (error) {
        console.error('Error al cambiar el estatus del aspirante:', error)
    }
}


</script>