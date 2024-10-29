<template>
    <NuxtLink class="border rounded p-3" :to="to">
        <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*tp2SoFHMNOfWcNqJ" class="h-80" alt="">
        {{ details }}
        <div class="font-bold text-lg" >Book name</div>
        <div>By Author</div>
        <div>Published on date</div>
        <div>Genre: date</div>
        <div></div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    details: string;
    to?: string;
}

const props = defineProps<Props>();
</script>
