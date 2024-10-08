<template>

    <v-container>
        <v-card title="GRUPOS " flat>

            <v-sheet>
                <v-data-table :items="grupo" :headers="headers">
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="tw-me-2 tw-text-color-green" icon="mdi-pencil" size="default"
                            @click="editar(item)"></v-icon>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useGrupoStore } from '@/store/grupo/getGrupo'
import { storeToRefs } from 'pinia';

const grupoStore = useGrupoStore()

const { grupo } = storeToRefs(grupoStore)

onMounted(() => {
    grupoStore.getGrupo();
})

const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Periodo', key: 'periodo' },
    { title: 'Profesor', key: 'profesor' },
    { title: 'Carreara', key: 'carreraId' },
    { title: 'Acciones', key: 'actions', sortable: false },
]

</script>