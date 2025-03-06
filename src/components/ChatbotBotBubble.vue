<template>
    <div class="m-2 chat incoming self-start max-w--10/12 bg-gray-200 rounded-lg">
        <p class="p-2 m-1">{{ props.message }}</p>
    </div>
</template>

<script setup>
    const props = defineProps(['message'])
    const emit = defineEmits(['scrollBottom'])
    emit('scrollBottom')
</script>