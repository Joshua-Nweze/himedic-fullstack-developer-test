<template>
    <NuxtLink class="border rounded p-3" :to="`/books/${book[0]._id}`">
        <img :src="`data:image/png;base64,${book[0]?.thumbnail}`" class="h-80" alt="">
        <div class="font-bold text-lg" >{{ book[0]?.title }}</div>
        <div>By {{ book[0]?.author }}</div>
        <div>Published on {{ book[0]?.publishedDate }}</div>
        <div>Genre: {{ book[0]?.genre }}</div>
        <div></div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    book: any;
    to?: string;
}

const props = defineProps<Props>();
</script>
