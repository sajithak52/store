<template>
    <section class="header-mt">
        <div class="container py-5">
            <p class="xeo-heading-2 text-default text-center mb-5">BOOKINGS</p>
            <b-card no-body class="business-tab">

                <b-tabs pills card>

                    <b-tab title="All Bookings" active>
                        <b-card-text>
                            <Order :status="'All Bookings'"/>
                        </b-card-text>
                    </b-tab>

                    <b-tab title="Pending Purchase">
                        <b-card-text>
                            <Order :status="'Packed'"/>
                        </b-card-text>
                    </b-tab>

                    <b-tab title="Purchased">
                        <b-card-text>
                            <Order :status="'Purchased'"/>
                        </b-card-text>
                    </b-tab>

                </b-tabs>

            </b-card>
        </div>
    </section>
</template>

<script>
import Order from '@/views/admin/orders/components/booking-table';

export default {
    name : "OrderList",

    components : { Order },
};
</script>

<style scoped>

</style>