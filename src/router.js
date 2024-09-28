import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import mainPage from './views/mainPage.vue';
import readedPage from './views/readedPage.vue';
import myPage from './views/myPage.vue';
import sorryPage from './views/sorryPage.vue';

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/main',
            name: 'mainPage',
            component: mainPage,
        },
        {
            path: '/readed',
            name: 'readedPage',
            component: readedPage,
        },
        {
            path: '/my',
            name: 'myPage',
            component: myPage,
        },
        {
            path: '/sorry',
            name: 'sorryPage',
            component: sorryPage,
        }
    ]
})