import Cookies from "js-cookie";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = Cookies.get('token');
    const publicRoutes = ['/', '/create-account'];


    if (!token && !publicRoutes.includes(to.path)) {
        return navigateTo('/', { replace: true });
    }

    if (token) {
        try {
            const req = await fetch('http://localhost:3001/api/validate-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const res = await req.json();

            if (!res.valid && !publicRoutes.includes(to.path)) {
                return navigateTo('/');
            }

            if (res.valid && publicRoutes.includes(to.path)) {
                return navigateTo(from.fullPath !== to.fullPath ? from.fullPath : '/dashboard');
            }
        } catch (error) {
            console.error('Error validating token:', error);
            return navigateTo('/');
        }
    }
});

