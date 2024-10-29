<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">Books</div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            <BookCard details="See available books" to="/books/1"/>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>