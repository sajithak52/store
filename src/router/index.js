import Vue from 'vue';
import VueRouter from 'vue-router';
import website from "@/router/website";
import admin from "@/router/admin";
import auth from "@/router/auth";
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes = [
    website,
    admin,
    auth,
    {
        path      : '*',
        name      : 'NotFound',
        component : () => import('@/views/NotFound')
    }
];

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
