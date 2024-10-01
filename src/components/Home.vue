<template>
    <NavBar />
    <div class="tw-flex tw-justify-center tw-items-center pt-10">
        <div v-if="isHome">
            <Welcome />
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup>
import NavBar from '@/components/loyout/NavBar.vue'
import Welcome from '@/components/Welcome.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute();

const isHome = computed(() => {
    return route.path === '/home'
})
</script>