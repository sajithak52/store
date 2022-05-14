<template>
    <div>
        <div v-if="loading" class="home-sec-m-t container" style="margin-bottom: 220px; margin-top: 220px;">
            <div class="alert alert-primary">
                Loading...
            </div>
        </div>

        <div v-else-if="error" class="home-sec-m-t container" style="margin-bottom: 220px; margin-top: 220px;">
            <div class="alert alert-danger">
                Error occurred during get the data please try after sometime..!!
            </div>
        </div>

        <section v-else class="cart-section jose-regular home-sec-m-t">
            <div class="container c-padding-p-8  c-padding-xs-30 ">

                <h1 class="mn-alert mn-alert-success text-center">
                    Your Order ID is {{cart.booking_id}}
                </h1>

                <h3 class="mn-alert mn-alert-success text-center">Order Placed Successful...!!</h3>



                <div class="mt-5 alert alert-info">
                    You can purchase the order by giving your order id in our store
                </div>

                <div class="mn-1 c-padding-b-30 c-padding-t-30">
                    <div class="text-center">

                        <p class="c-font-30 mn-color-3 righteous letter-spacing-4">
                            <b>ORDER SUMMERY OF “{{cart.booking_id}}“</b>
                        </p>

                    </div>

                    <div class="cart-table ">
                        <table id="cart" class="table table-hover table-condensed">
                            <thead>
                            <tr class="mn-color-1 jose-light c-font-16">
                                <th style="width:10%"></th>
                                <th style="width:10%"></th>
                                <th style="width:18%">Price</th>
                                <th style="width:18%">Quantity</th>
                                <th style="width:18%" class="text-right">Total</th>
                                <th style="width:3%"></th>
                            </tr>

                            <tr v-for="(item, key)  in items" v-bind:key="key"
                                class="mn-color-1 jose-light bold c-font-16 cart-item-remove">

                                <th style="width:20%" class="cart-img c-padding-t-10 c-padding-b-10">
                                    <img style="width: 80px;" class="mn-img-border" :src="item.image" alt="">
                                </th>

                                <th style="width:20%" class="cart-img c-padding-t-10 c-padding-b-10">

                                    <p class="c-padding-l-10 c-padding-t-5 c-padding-b-5  c-font-15">
                                        {{ item.item_name }}
                                    </p>
                                </th>

                                <th style="width:18%" class="c-padding-t-25  c-padding-b-25">
                                    <currency-view :value="item.unit_price" />
                                </th>

                                <th style="width:18%" class="c-padding-t-25  c-padding-b-25">{{ item.quantity }}
                                </th>

                                <th style="width:18%"
                                    class="text-right c-padding-t-25  c-padding-b-25">
                                    <currency-view :value="item.total_price" />
                                </th>

                                <th>
                                </th>
                            </tr>

                            </thead>
                        </table>

                        <div class=" col-md-12  c-margin-t-10 c-padding-m-10 c-font-right c-padding-l-0 c-padding-r-0 ">
                            <p class=" c-font-16 c-margin-b-0 mn-color-1">
                                <b>SUBTOTAL</b>
                                <span class="c-font-22 c-margin-t-0  bold mn-color-4 jose-semibold">
                                    <currency-view :value="subTotal" />
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

                <div>
                    <div class="success-address c-padding-15">
                        <h3>Order Details: </h3>
                        &nbsp; {{ cart.student_name }}
                        &nbsp; {{ cart.admission_number }}<br>
                        &nbsp; {{ cart.mobile_number }}
                        &nbsp; {{ cart.email_address }}<br>
                        &nbsp; {{ cart.branch }}<br>
                    </div>
                    <div class="success-address c-padding-15">
                        <h3>Contact Information: </h3>
                        &nbsp; {{ cart.email_address }}<br>
                        &nbsp; {{ cart.mobile_number }}
                    </div>
                </div>

                <div class="clear"></div>

                <form class="text-center c-padding-t-15 float-right">
                    <a type=button class="btn btn-basic-1 btn-primary print-btn"
                       @click="printDetails">Print</a>
                    <a href="/" class="btn btn-basic-1 btn-warning print-btn ">Back To Home</a>
                </form>

            </div>

        </section>
    </div>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "CheckoutDetails",

    data() {
        return {
            items : [],
            cart  : null,

            loading : true,
            error   : false
        };
    },

    computed : {
        subTotal() {
            let total = 0;
            const items = this.items;
            for (let i = 0; i < items.length; i += 1) {
                total += items[i].total_price;
            }
            return total;
        }
    },

    mounted() {
        this.loadDetails();
    },

    methods : {
        loadDetails() {
            const that = this;
            that.loading = true;
            that.error = false;
            axios.form(urls.user.cart.checkOut, {id : that.$route.params.id}).then(function (response) {
                const json = response.data;
                console.log('Json =>', json);
                that.items = [...json.items];
                that.cart = {...json.cart};

                that.loading = false;
                that.error = false;

            }).catch(function (err) {
                console.log('error =>', err);
                that.loading = true;
                that.error = false;
            });
        },

        printDetails () {
            window.print();
        }
    }
};
</script>

<style scoped>
</style>