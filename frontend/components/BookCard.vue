<template>
    <div v-if="book">
        <NuxtLink v-for="b in book" class="border rounded p-3" :to="`/books/${b._id}`">
            <img :src="`data:image/png;base64,${b.thumbnail}`" class="h-80" alt="">
            <div class="font-bold text-lg" >{{ b.title }}</div>
            <div>By {{ b.author }}</div>
            <div>Published on {{ b.publishedDate }}</div>
            <div>Genre: {{ b.genre }}</div>
            <div></div>
        </NuxtLink>
    </div>
    <div v-else>
        Nothing to show
    </div>
</template>

<script setup lang="ts">
interface Props {
    book: any;
    to?: string;
}

const props = defineProps<Props>();
</script>
