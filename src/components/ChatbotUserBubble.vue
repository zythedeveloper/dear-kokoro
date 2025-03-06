<template>
    <div class="m-2 chat outgoing self-end max-w--10/12 bg-violet-600 rounded-lg">
        <p class="p-2 m-1 text-white">{{ props.message }}</p>
    </div>
</template>

<script setup>
    const props = defineProps(['message'])
    const emit = defineEmits(['scrollBottom'])
    emit('scrollBottom')
</script>