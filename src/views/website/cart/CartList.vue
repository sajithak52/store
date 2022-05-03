<template>
    <section class="cart-section header-mt">

        <div class="container p-3 p-lg-5">
            <p class="">
                <router-link to="/products/">
                    <b>
                        <b-icon icon="chevron-double-left"></b-icon>
                        <span class="cont-f-c c-padding-l-5 jose-light bold c-font-16 ">Continue Shopping</span>
                    </b>
                </router-link>
            </p>

            <div class="text-center">
                <p class="text-default xeo-heading-2">CART</p>
            </div>

            <div v-if="items.length !== 0" class="cart-table">

                <table class="table table-hover table-condensed">
                    <thead>
                    <tr class="mn-color-1 jose-light c-font-16">
                        <th style="width:30%"></th>
                        <th style="width:18%">Price</th>
                        <th style="width:18%">Quantity</th>
                        <th style="width:18%" class="text-right">Total</th>
                        <th style="width:3%"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, key)  in items" v-bind:key="key"
                        class="mn-color-1 cart-item-remove jose-light bold c-font-16">
                        <th style="width:30%" class="cart-img">
                            <span class=""> {{ item.item_name }}</span>
                        </th>
                        <th style="width:18%" class="">
                            <currency-view :value="item.unit_price" />
                        </th>
                        <th style="width:18%" class="">
                            <a @click="decrement(item)" v-if="item.quantity > 1" style="cursor: pointer" class="p-1 alert alert-success">
                                <span v-html="'-'"></span>
                            </a>
                            {{ item.quantity }}
                            <a @click="increment(item)" style="cursor: pointer" class="p-1 alert alert-success">
                                +
                            </a>
                        </th>
                        <th style="width:18%" class="text-right">
                            <currency-view :value="item.total_price" />
                        </th>
                        <th>
                            <a class="cancel-link" style="cursor: pointer;" v-on:click="removeElement(item)">
                                <b-icon icon="x" font-scale="1.5"></b-icon>
                            </a>
                        </th>
                    </tr>
                    </tbody>
                </table>

                <div class=" col-md-12  c-margin-t-10 c-padding-m-10 c-font-right ">
                    <p class=" c-font-16 c-margin-b-0 mn-color-1">
                        SUBTOTAL
                        <span class="c-font-22 c-margin-t-0 bold mn-color-4 jose-semibold">
                            <currency-view :value="subTotal" />
                        </span>
                    </p>
                </div>
            </div>

            <div v-if="items.length === 0" class="cart-empty my-5">
                <div class="alert-success p-4 text-center">Your Cart is empty..!!</div>
            </div>

            <div class="form-section">
                <form action="#" class="">

                    <div class="row c-margin-t-20 justify-content-center" v-if="items.length !== 0">
                        <div class="col-sm-3">
                            <b-button @click="$router.push({path: '/checkout/'})" class="btn btn-block xeo-btn-1"> CHECK OUT</b-button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    </section>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';


export default {
    name : "CartList",

    data () {
        return {
            items : []
        };
    },

    computed : {
        subTotal () {
            let total = 0;
            const items = this.items;
            for (let i = 0; i < items.length; i += 1) {
                total += items[i].total_price;
            }
            return total;
        }
    },

    mounted () {
        this.loadCart();
    },

    methods : {
        loadCart () {
            const that = this;
            axios.get(urls.user.cart.cartList).then(function (response) {
                that.items = response.data.data;
            }).catch(function () {});
        },

        removeElement (item) {
            const conform = confirm('Are you sure?');
            if (!conform) {
                return;
            }
            const that = this;
            axios.form(urls.user.cart.removeCart, { id : item.id }).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    const position = that.items.indexOf(item);
                    that.items.splice(position, 1);
                }
            }).catch(function (exception) {
                console.log('exception occurred : ', exception);
            });
        },

        decrement (item) {
            const that = this;
            item.loading_minus = true;

            if (item.quantity === 0) {
                that.$bvToast.toast('Negative value not allowed..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
                item.loading_minus = false;
                return ;
            }

            const model = {
                product  : item.item,
                quantity : -1
            };

            axios.form(urls.user.cart.addCart, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully updated cart..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    item.quantity--;
                    item.total_price = item.unit_price * item.quantity;
                    item.loading_minus = false;
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                    item.loading_minus = false;
                }
            }).catch(function (exception) {
                item.loading_minus = false;
                console.log('exception occurred : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        },

        increment(item) {
            const that = this;
            item.loading_plus = true;
            const model = {
                product  : item.item,
                quantity : 1
            };
            axios.form(urls.user.cart.addCart, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully added to cart..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    item.quantity++;
                    item.total_price = item.unit_price * item.quantity;
                    item.loading_plus = false;
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                    item.loading_plus = false;
                }
            }).catch(function (exception) {
                item.loading_plus = false;
                console.log('exception occurred : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        }
    }
};
</script>

<style scoped>

</style>