<template>
    <v-container>
        <v-card title="RESULTADOS DE INSCRIPCION" flat>

            <v-sheet>
                <v-data-table :headers="headers" :items="aspirante" item-value="id">

                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { useAspiranteStore } from '@/store/seleccion/getAspirantes'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';


const aspiranteStore = useAspiranteStore()

const { aspirante } = storeToRefs(aspiranteStore)

onMounted(() => {
    aspiranteStore.getAspirante()
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'CURP', key: 'curp' },
    { title: 'CORREO', key: 'email' },
    { title: 'Estatus', key: 'status' },

]

</script>