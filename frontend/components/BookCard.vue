<template>
    <div v-if="book">
        <NuxtLink class="border rounded p-3" :to="`/books/${book._id}`">
            <img :src="`data:image/png;base64,${book.thumbnail}`" class="h-80" alt="">
            <div class="font-bold text-lg" >{{ book.title }}</div>
            <div>By {{ book.author }}</div>
            <div>Published on {{ book.publishedDate }}</div>
            <div>Genre: {{ book.genre }}</div>
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
