import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to) => {
    const token = Cookies.get('token');
    const publicRoutes = ['/', '/create-account'];

    // If no token and trying to access a protected route, redirect to login page
    if (!token && !publicRoutes.includes(to.path)) {
        return navigateTo('/');
    } else {
        try {
            const req = await fetch('http://localhost:3001/api/validate-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Check if token is valid
            const res = await req.json();
            if (!res.valid && !publicRoutes.includes(to.path)) {
                console.log('Invalid token, redirecting to login');
                return navigateTo('/');
            }

            if (res.valid && publicRoutes.includes(to.path)) {
                return navigateTo('/dashboard')
            }
        } catch (error) {
            console.error('Error validating token:', error);
            if (to.path !== '/') {
                return navigateTo('/');
            }
        }
    }
});
