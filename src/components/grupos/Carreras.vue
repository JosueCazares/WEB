<template>
    <v-container>
        <v-card title="CARRERAS " flat>
            <v-sheet>
                <v-data-table :items="carrera" :headers="headers">

                    <!-- Slot personalizado para la columna de grupos -->
                    <template v-slot:item.grupos="{ item }">
                        <span v-if="item.grupos.length > 0">
                            {{ item.grupos.map(grupo => grupo.nombre).join(', ') }}
                        </span>
                        <span v-else>
                            Sin grupos
                        </span>
                    </template>

                    <!-- Slot personalizado para la columna de acciones -->
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                            @click="editar(item)">
                        </v-icon>
                    </template>

                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCarreraStore } from '@/store/grupo/getCarrera'
import { storeToRefs } from 'pinia';

const carreraStore = useCarreraStore()
const { carrera } = storeToRefs(carreraStore)

onMounted(() => {
    carreraStore.getCarrera();
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Grupos', key: 'grupos' },
    { title: 'Acciones', key: 'actions', sortable: false },
]

</script>
