<template>
    <div class="flex py-8">
        <div class="w-3/4 flex gap-3">
            <NuxtLink to="/dashboard" >LOGO</NuxtLink>
            <NuxtLink to="/books" >Books</NuxtLink>
            <NuxtLink to="/my-books" >My Books</NuxtLink>
            <div>Saved Books</div>
            <NuxtLink to="/upload" >Upload Books</NuxtLink>
        </div>
        <div class="flex justify-end w-1/4">
            <Button class="bg-slate-100">Log out</Button>
        </div>
    </div>

    <hr>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>