<template>
    <section class="tw-bg-white dark:tw-bg-gray-900">
        <div class="tw-py-8 tw-px-4 tw-mx-auto tw-max-w-screen-xl tw-text-center lg:tw-py-16">
            <h1 v-if="rol === '1'"
                class="tw-mb-4 text-h1 tw-font-Bebas tw-tracking-tight tw-uppercase tw-leading-none tw-text-gray-900 md:tw-text-5xl lg:tw-text-6xl dark:tw-text-white">
                AREA DE TI</h1>
            <h1 v-if="rol === '3'"
                class="tw-mb-4 text-h1 tw-font-Bebas tw-tracking-tight tw-uppercase tw-leading-none tw-text-gray-900 md:tw-text-5xl lg:tw-text-6xl dark:tw-text-white">
                AREA DE SE</h1>
            <h1 v-if="rol === '4'"
                class="tw-mb-4 text-h1 tw-font-Bebas tw-tracking-tight tw-uppercase tw-leading-none tw-text-gray-900 md:tw-text-5xl lg:tw-text-6xl dark:tw-text-white">
                AREA DE RH</h1>
        </div>
    </section>


</template>
<script setup>

const rol = sessionStorage.getItem('rol')

</script>