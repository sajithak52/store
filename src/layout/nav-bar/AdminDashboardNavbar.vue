<template>

    <header class="xeo-header-2">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light justify-content-between  sticky-top">
                <router-link to="/" class="navbar-brand" href="#">Store</router-link>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" class="flex-grow-0" is-nav>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                        <li class="nav-item">
                            <router-link class="nav-link" to="/admin/purchase-entry/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/admin/product-home/">Product</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/admin/orders/">Bookings</router-link>
                        </li>
<!--                        <li class="nav-item">-->
<!--                            <router-link class="nav-link" to="/admin/purchase-entry/">Purchase Entry</router-link>-->
<!--                        </li>-->
                        <li class="nav-item">
                            <a class="nav-link">|</a>
                        </li>

                        <li class="nav-item">
                            <b-nav-item-dropdown :text="currentUser.title || currentUser.username" right>
                                <b-dropdown-item href="/admin/change-password/">Change Password</b-dropdown-item>
                                <b-dropdown-item @click="logoutClicked">Logout</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </li>

                    </ul>
                </b-collapse>
            </nav>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import urls from '@/data/urls';

export default {
    name : 'AdminHeader',

    computed : { ...mapGetters(['currentUser']) },

    methods : {
        ...mapActions(['signOut']),

        logoutClicked () {
            this.signOut();
            localStorage.clear();
            axios.get(urls.auth.logout);
            this.$router.push('/admin/login/');
        }
    }
};
</script>

<style scoped>

</style>
