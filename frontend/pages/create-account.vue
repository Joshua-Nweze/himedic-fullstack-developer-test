<template>
    <div class="grid lg:grid-cols-2">
        <div class="bg-red-300 hidden lg:block"></div>
        <div class="h-screen w-100 flex justify-center items-center">
            <div class="w-full md:w-1/2 p-2 grid gap-3" >
                <div class="flex justify-center">LOGO</div>
                <Input type="text" placeholder="Last name"/>
                <Input type="text" placeholder="First name"/>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Input type="password" placeholder="Confirm password"/>
                <Button class="bg-blue-500 text-white">Login</Button>
                <div class="text-center text-sm">
                    Already have an account? <NuxtLink to="/" class="text-blue-500" >Login</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>