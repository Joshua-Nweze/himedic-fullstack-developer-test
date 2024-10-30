<template>
    <div class="grid lg:grid-cols-2">
        <div class="hidden lg:block bg-red-300"></div>
        <div class="h-screen w-100 flex justify-center items-center">
            <div class="w-full md:w-1/2 p-2 grid gap-3" >
                <div class="flex justify-center">LOGO</div>
                <Input type="email" placeholder="Email" v-model="email" />
                <Input type="password" placeholder="Password" v-model="password" />
                <div class="w-full">
                    <Button class="bg-blue-500 text-white w-full" @click="logUserIn" v-if="!loading">Login</Button>
                    <Button class="bg-blue-500 text-white w-full" v-else>Loading...</Button>
                </div>
                <div class="text-center text-sm">
                    Don't have an account? <NuxtLink to="create-account" class="text-blue-500" >Create an account</NuxtLink>
                </div>
            </div>
        </div>

        <div class="fixed right-5 bottom-5" v-if="feedback" >
            <Alert :status>{{ feedback }}</Alert>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuth';
import Cookie from 'js-cookie';

let authStore = useAuthStore()
let { login } = authStore

let email = ref<string>('')
let password = ref<string>('')

let loading = ref<boolean>(false)
let feedback = ref<string | null>(null)
let status = ref<number | null>(null)

async function logUserIn() {
    feedback.value = status.value = null // hiding the feedback alert
    loading.value = true

    let userCredentials = {
        email: email.value,
        password: password.value
    }

    let res = await login(userCredentials)
    
    loading.value = false
    
    
    feedback.value = res.msg
    status.value = res.status
    
    if (status.value == 200) {
        Cookie.set('token', res.token)
        useRouter().push('/dashboard') // navigate to dashboard page if login is successful
    } else {
        password.value = "" // clear password input
    }

    setTimeout(() => {
        feedback.value = status.value = null // hiding the feedback alert
    }, 3000)
}
</script>

<style scoped>

</style>