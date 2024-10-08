<template>
    <v-container>
        <v-card title="PERSONAL " flat>
            <v-sheet>
                <v-data-table :items="personal" :headers="headers">
                    <template v-slot:item.area="{ item }">
                        <span v-if="item.area">
                            {{ item.area.nombre }}
                        </span>
                        <span v-else>
                            Sin Area
                        </span>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { onMounted } from 'vue'
import { usePersonalStore } from '@/store/personal/getPersonal'
import { storeToRefs } from 'pinia';

const personalStore = usePersonalStore()
const { personal } = storeToRefs(personalStore)

onMounted(() => {
    personalStore.getPersonal();
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Correo', key: 'correo' },
    { title: 'Telefono', key: 'telefono' },
    { title: 'Curp', key: 'curp' },
    { title: 'Tipo De Contrato', key: 'tipo_contrato' },
    { title: 'Fecha De Ingreso', key: 'fecha_ingreso' },
    { title: 'Grupo', key: 'grupo' },
    { title: 'Estatus', key: 'estatus' },
    { title: 'Area', key: 'area' },
]

</script>