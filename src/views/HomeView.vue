<template>
    <div class="header">
        <div>
            <div class="xeo-header-2">
                <nav class="container navbar navbar-expand-lg navbar-light justify-content-between sticky-top">

                    <router-link to="/" class="navbar-brand" href="#">
                        <img src="../assets/img/logo.png" alt="">
                    </router-link>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" class="flex-grow-0" is-nav>

                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style="margin-top: 20px;">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/home/">Home</router-link>
                            </li>

                            <li class="nav-item">
                                <router-link class="nav-link" to="/products/">Products</router-link>
                            </li>

                            <li class="nav-item">
                                <router-link class="nav-link" to="/contact/">Contact Us</router-link>
                            </li>

                            <li class="nav-item">
                                <router-link class="nav-link" to="/about/">About Us</router-link>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link">|</a>
                            </li>

                            <li class="nav-item">
                                <router-link to="/cart/" class="nav-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"
                                         typography="NavAlpha"
                                         data-ux="UtilitiesMenuIcon" data-aid="CART_ICON_RENDER"
                                         class="">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.235 17.034c.634 0 1.16.527 1.16 1.164 0 .636-.526 1.164-1.16 1.164-.633 0-1.16-.528-1.16-1.164a1.17 1.17 0 0 1 1.16-1.164zm-8.118 0c.634 0 1.16.527 1.16 1.164 0 .636-.526 1.164-1.16 1.164-.634 0-1.16-.528-1.16-1.164a1.17 1.17 0 0 1 1.16-1.164zm.632-4.492l6.818-.964 1.019-3.5-8.709.081.872 4.383zm.263 2.05l-.024.47h8.727l.028 1.972H7.537a.915.915 0 0 1-.913-.916c0-.218.113-.513.404-1.051l.12-.263L5.63 6.83H4V5h3.178l.289 1.164h11.668l-1.987 7.217-8.136 1.21z">
                                        </path>
                                    </svg>
                                </router-link>
                            </li>
                        </ul>

                    </b-collapse>

                </nav>
            </div>
        </div>


        <section class="banner-section container-fluid header-mt">
            <div class="container py-5 px-5">
                <div class="col-md-12 col-sm-12 px-0 text-center">
                    <div class="text-default mb-5" style="margin-top: 120px">
                        <h1> WELCOME TO MY STORE </h1>
                        <p>HI ALL,<br>THIS SITE HELP YOU TO BOOK PRODUCTS FROM THE STORE.</p>
                        <p v-if="!isOpen" class="alert alert-danger">THE STORE IS CLOSED.</p>
                        <a @click="$router.push({path: '/products/'})" class="hero-btn">GET PRODUCTS</a>
                    </div>
                </div>
            </div>
        </section>

    </div>

</template>

<script>

import axios from "@/data/axios";
import urls from "@/data/urls";

export default {
    name : 'HomeView',

    data () {
        return {
            isOpen : true
        };
    },

    mounted() {
        this.loadData();
    },

    methods : {
        loadData () {
            const that = this;

            axios.get(urls.shop.checkOpenForUser).then(function (response) {
                const json = response.data;
                that.isOpen = json.is_open;
            }).catch(function (exception) {
                console.log("exception : ", exception);
                that.isOpen = false;
            });
        },
    }
};
</script>

<style scoped>

.header {
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url("../assets/img/login.jpg");
    /*background-image: url("../assets/img/login.jpg");*/
    background-position: center;
    background-size: cover;
    position: relative;
    color: white !important;
}

.hero-btn {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    border: 1px solid #fff;
    padding: 12px 34px;
    font-size: 13px;
    background: transparent;
    position: relative;
    cursor: pointer;
}

.hero-btn:hover {
    border: 1px solid #f44336;
    background: #f44336;
    transition: 1s;
}

.xeo-header-2 .navbar .navbar-brand img {
    width: 70px;
}

.nav-link {
    color: white !important;
}

*, *::before, *::after {
    box-sizing: border-box;
}

.xeo-header-2 {
    font-family: "Proxima-Regular", sans-serif;
    background: url("../assets/img/headder-1.png");
    width: 100%;
    top: 0;
    z-index: 3;
    position: fixed;
    box-shadow: 0 0 7px 0 #6b6b6b42;
}

</style>
