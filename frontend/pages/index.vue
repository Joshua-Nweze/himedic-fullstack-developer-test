<template>
    <div class="grid lg:grid-cols-2">
        <div class="hidden lg:block bg-red-300"></div>
        <div class="h-screen w-100 flex justify-center items-center">
            <div class="w-full md:w-1/2 p-2 grid gap-3" >
                <div class="flex justify-center">LOGO</div>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Button class="bg-blue-500 text-white">Login</Button>
                <div class="text-center text-sm">
                    Don't have an account? <NuxtLink to="create-account" class="text-blue-500" >Create an account</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>