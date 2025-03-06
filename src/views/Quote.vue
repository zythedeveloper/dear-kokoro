<template>
    <Suspense>
        <template #default>
            <Quote/>
        </template>
        <template #fallback>
        <p class="text-2xl text-center">Loading ...</p>
        </template>
    </Suspense>
</template>

<script setup>
import Quote from '../components/Quote.vue';
</script>