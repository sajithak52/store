<template>
    <div class="wrapper">
        <div class="main-content d-flex flex-column min-vh-100">
            <CustomerDashboardNavBar></CustomerDashboardNavBar>
            <div>
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import CustomerDashboardNavBar from "@/layout/nav-bar/CustomerDashboardNavBar";
import Footer from "@/components/footer";

export default {
    name : "CustomerDashboard",

    components : { CustomerDashboardNavBar, Footer }
};
</script>

<style scoped>
.modal-body {
    padding-top: 0;
}
</style>