<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
    import Cookies from "js-cookie";

import { useAuthStore } from './store/useAuth';
onMounted(() => {
let authStore = useAuthStore()

let token = Cookies.get('token')
authStore.validateToken(token as string)
})
</script>