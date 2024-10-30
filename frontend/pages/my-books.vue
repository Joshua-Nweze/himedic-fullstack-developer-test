<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">My books</div>

        <div v-if="!loadingMyBooks">
            <div v-if="myBooks" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                <BookCard
                    v-if="myBooks.length > 0"
                    v-for="(book, index) in myBooks"
                    :key="index"
                    :book="book"
                />
                <div v-else>
                    Nothing to show
                </div>
            </div>
        </div>
        <div v-else>Loading</div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBookStore } from '~/store/useBook';
let bookStore = useBookStore()
let { myBooks, loadingMyBooks } = storeToRefs(useBookStore())


onMounted(async () => {
    await bookStore.getMyBooks()
    myBooks.value?.map(a => console.log(a))
})
</script>

<style scoped>

</style>