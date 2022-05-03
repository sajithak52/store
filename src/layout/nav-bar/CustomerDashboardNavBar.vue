<template>
    <header class="xeo-header-2">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light justify-content-between  sticky-top">
                <router-link to="/" class="navbar-brand" href="#">Store</router-link>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" class="flex-grow-0" is-nav>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/products/">Products</router-link>
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
                                <!--                                <span class="">(1)</span>-->
                            </router-link>
                        </li>

                    </ul>
                </b-collapse>
                <!--                <router-view/>-->
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name : "CustomerDashboardNavBar"
};
</script>

<style scoped>

</style>