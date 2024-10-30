import { defineStore } from "pinia";

interface UserState {
    user: string | null;
}

interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

interface LoginDetails {
    email: string,
    password: string
}

export const useAuthStore = defineStore("auth", {
    state: (): UserState => ({
        user: null,
    }),

    actions: {
        async createAccount(userData: User) {
            let req = await fetch('http://localhost:3001/api/user/create', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let res = await req.json()

            return {msg: res.msg, status: req.status};
        },

        async login(userData: LoginDetails) {
            let req = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let res = await req.json()

            console.log({...res, status: req.status})
            this.user = res.user
            return {...res, status: req.status};
        },

        async validateToken(token: string) {
            try {
                console.log(1)
            console.log(token)
            let req = await fetch('http://localhost:3001/api/validate-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Brearer ${token}`
                }
            })

            console.log(2)

            let res = await req.json()
            console.log(res)
            return res
            } catch (error) {
                console.log(error)
            }
        },
    },
});