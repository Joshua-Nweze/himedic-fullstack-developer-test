<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
let {data} = await useFetch('/api/book/hello', {method: 'POST'})

// console.log(data.value)
</script>