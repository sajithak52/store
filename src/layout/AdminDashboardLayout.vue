<template>
    <div class="wrapper">
        <div class="main-content d-flex flex-column min-vh-100">
            <DashboardNavbar></DashboardNavbar>
            <div>
                <router-view>
                </router-view>
            </div>
        </div>
        <ContentAdminFooter></ContentAdminFooter>
    </div>
</template>
<script>

import ContentAdminFooter from '@/components/adminfooter';
import DashboardNavbar from '@/layout/nav-bar/AdminDashboardNavbar';

export default {

    components : {
        DashboardNavbar,
        ContentAdminFooter
    }
};
</script>
<style lang="scss">
.modal-body {
    padding-top: 0;
}
</style>
