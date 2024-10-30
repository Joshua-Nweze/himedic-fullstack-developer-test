<template>
    <div class="grid lg:grid-cols-2">
        <div class="bg-red-300 hidden lg:block"></div>
        <div class="h-screen w-100 flex justify-center items-center">
            <div class="w-full md:w-1/2 p-2 grid gap-3" >
                <div class="flex justify-center">LOGO</div>
                <Input type="text" placeholder="First name" v-model="firstName"/>
                <Input type="text" placeholder="Last name" v-model="lastName"/>
                <Input type="email" placeholder="Email" v-model="email"/>
                <Input type="password" placeholder="Password" v-model="password"/>
                <!-- <Input type="password" placeholder="Confirm password" v-model="passwordConfirm"/> -->
                <div class="w-full">
                    <Button class="bg-blue-500 text-white w-full" @click="createUserAccount" v-if="!loading">Create account</Button>
                    <Button class="bg-blue-500 text-white w-full" v-else>Loading...</Button>
                </div>
                <div class="text-center text-sm">
                    Already have an account? <NuxtLink to="/" class="text-blue-500" >Login</NuxtLink>
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

let authStore = useAuthStore()
let { createAccount } = authStore

let email = ref<string>('')
let password = ref<string>('')
let firstName = ref<string>('')
let lastName = ref<string>('')
let passwordConfirm = ref<string>('')

let loading = ref<boolean>(false)
let feedback = ref<string | null>(null)
let status = ref<number | null>(null)

async function createUserAccount() {
    feedback.value = status.value = null // hiding the feedback alert
    loading.value = true
    

    let userCredentials = {
        firstname: firstName.value,
        lastname:lastName.value,
        email: email.value,
        password: password.value
    }
    
    let res = await createAccount(userCredentials)
    
    loading.value = false

    if(res.status == 200 || res.status == 201) {
        feedback.value = `${res.msg} , go to login page to log into your account`
        email.value = firstName.value = lastName.value = password.value = ""
    } else {
        feedback.value = res.msg
    }
    
    status.value = res.status

    setTimeout(() => {
        feedback.value = status.value = null // hiding the feedback alert
    }, 3000)
}
</script>

<style scoped>

</style>