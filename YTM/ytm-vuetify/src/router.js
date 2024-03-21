import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/UserLogin.vue';
import Signup from './pages/UserSignup.vue';
import Home from './pages/Home.vue';
import Explore from './pages/ExplorePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        { path: '/explore', component: Explore}
    ]
})


export default router;
