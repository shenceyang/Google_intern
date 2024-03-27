import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/UserLogin.vue';
import Signup from './pages/UserSignup.vue';
import Home from './pages/Home.vue';
import Explore from './pages/ExplorePage.vue';
import AudioPlayerPage from './pages/AudioPlayer.vue';
import CreatePlayList from './pages/CreatePlayList.vue';
import SearchResult from './pages/SearchResult.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        { path: '/explore', component: Explore},
        {
            path: '/play/:trackId',
            name: 'audioPlayer',
            component: AudioPlayerPage,
            props: true, // Allows the component to receive the dynamic segment as a prop
        },
        {   path: '/createplaylist',
            component: CreatePlayList
        },
        {
            path: '/result',
            name: 'result',
            component: SearchResult,
            props: true
        }

    ]
})




export default router;
