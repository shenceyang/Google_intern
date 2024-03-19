import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/UserLogin.vue';
import Signup from './pages/UserSignup.vue';
import Home from './pages/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/login', component: Login },
        { path: '/signup', component: Signup }
    ]
})


export default router;
