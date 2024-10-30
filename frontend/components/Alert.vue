<template>
    <div :class="[400, 404, 500].includes(status) ? 'text-red-500' : 'text-green-500'" class="flex rounded-3xl p-3 border w-fit gap-3 bg-white">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  status?: number | null
}>()
</script>