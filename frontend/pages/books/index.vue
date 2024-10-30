<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Books</div>

        <div>
            <BookCard
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"
                v-if="books"
                v-for="(book, index) in books"
                :key="index"
                :book="book"
            />

            <div v-else>Loading</div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBookStore } from "~/store/useBook";

let { books } = storeToRefs(useBookStore());
let { getBooks } = useBookStore();

onMounted(async () => {
    await getBooks();
});
</script>

<style scoped></style>
