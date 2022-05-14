import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import LoadingAnimation from "@/components/LoadingAnimation";
import Currency from "@/components/Currency";

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { ToastPlugin } from 'bootstrap-vue';

import './assets/css/font.css';
import './assets/css/components.css';
import './assets/css/style.css';

// import './assets/css/about.css';
// import './assets/css/addminlogin.css';
// import './assets/css/components.css';
// import './assets/css/student.css';
// import './assets/css/style.css';
// import './assets/css/style11.css';
// import './assets/css/style12.css';
// import './assets/css/style13.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ToastPlugin);
Vue.component('loading-animation', LoadingAnimation);
Vue.component('currency-view', Currency);

new Vue({
    router,
    store,
    render : h => h(App)
}).$mount('#app');
