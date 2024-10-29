<template>
    <NuxtLink class="border rounded p-3" :to="to">
        {{ content }}
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    content: string;
    to?: string;
}

const props = defineProps<Props>();
</script>
