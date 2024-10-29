<template>
    <NuxtLayout name="dashboard">
        <div class="text-lg md:text-2xl font-bold">What do you want to do today?</div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <DashboardCard content="See available books" to="/books"/>
            <DashboardCard content="See available books" />
            <DashboardCard content="See available books" />
            <DashboardCard content="See available books" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>