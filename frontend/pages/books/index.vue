<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Books</div>

        <div v-if="!loadingBooks">
            <div v-if="books" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                <BookCard
                    v-if="books.length > 0"
                    v-for="(book, index) in books"
                    :key="index"
                    :book="book"
                />
                <div v-else>
                    Nothing to show
                </div>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBookStore } from "~/store/useBook";

let { books, loadingBooks } = storeToRefs(useBookStore());
let { getBooks } = useBookStore();

onMounted(async () => {
    setTimeout(async () => {
        await getBooks();
    }, 50)
});
</script>

<style scoped></style>
