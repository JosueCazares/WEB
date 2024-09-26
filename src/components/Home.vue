<template>
    <NavBar />
    <div class="tw-flex tw-justify-center tw-items-center pt-10">
        <router-view></router-view>
    </div>
</template>
<script setup>
import NavBar from '@/components/loyout/NavBar.vue'
</script>