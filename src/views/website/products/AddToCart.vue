<template>
    <section class="header-mt">
            <div class="container px-lg-5">
                <div class="container c-padding-50 c-padding-xs-30 ">
                    <p class="">
                        <router-link to="/products/">
                            <b>
                                <b-icon icon="chevron-double-left"></b-icon>
                                <span class="cont-f-c c-padding-l-5 jose-light bold c-font-16 ">All Products</span>
                            </b>
                        </router-link>
                    </p>

                    <div class="mn">
                        <div class="row">
                            <div class="align-items-center col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center">
                                <img class="img-thumbnail" v-if="offeringImage" :src="offeringImage" alt="">
                                <img class="img-thumbnail" v-else src="@/assets/img/product.jpg" alt="">
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12 c-padding-l-xs-0 c-padding-r-xs-0 ">
                                <div class="col-md-12">
                                    <div class=" c-font-32  righteous bold line-height-2 letter-spacing-4 mb-3">
                                        {{ name }}
                                    </div>
                                    <p class="c-font-22 jose-regular mn-color-4 ">₹{{ amount }}</p>

                                </div>
                                <div class="quantity c-padding-m-30 col-md-12">
                                    <b-form role="form" @submit.prevent="onSubmit">

                                        <div class="row">
                                            <div class="col-12 ">
                                                <b-form-group label="NAME" label-for="input-1">
                                                    <b-form-input id="input-1" class="count-box" v-model="model.name" required
                                                                  trim></b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-12 ">
                                                <b-form-group label="STAR" label-for="input-2">
                                                    <b-form-select id="input-2" class="count-box" v-model="model.star" required
                                                                   :options="options"></b-form-select>
                                                </b-form-group>
                                            </div>
                                            <div class="col-12 ">
                                                <b-form-group label="DATE" label-for="datepicker">
                                                    <b-form-datepicker id="datepicker" :min="min" v-model="model.date" required
                                                                       class="mb-2 count-box"></b-form-datepicker>
                                                </b-form-group>
                                            </div>
                                            <div class="col-md-4 mb-3 ">
                                                <label>QUANTITY</label>
                                                <b-input-group>
                                                    <b-input-group-prepend>
                                                        <b-btn class="xeo-btn-1" @click="decrement()">-</b-btn>
                                                    </b-input-group-prepend>

                                                    <b-form-input type="number" class="text-center count-box" min="0.00"
                                                                  :value="model.quantity"></b-form-input>

                                                    <b-input-group-append>
                                                        <b-btn class="xeo-btn-1" @click="increment()">+</b-btn>
                                                    </b-input-group-append>
                                                </b-input-group>

                                            </div>
                                            <div class="col-md-8 mb-3">
                                                <label>SUBTOTAL</label>
                                                <p class="c-font-17 c-margin-t-0  bold mn-color-3 jose-regular">
                                                    <output id="producttot">{{ subTotal }}</output>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-xs-12  c-padding-t-30">
                                            <div
                                                class="col-md-6  col-xs-12 padd-bottom-md mn-btn product-btn col-sm-6 c-padding-l-0 c-padding-r-0">
                                                <b-button type="submit" class="btn btn-block xeo-btn-1">
                                                    ADD TO CART
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
import axios from '@/data/axios';
import urls from "@/data/urls";

export default {
    name : "AddToCart",

    data () {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const minDate = new Date(today);
        return {
            offeringImage : null,
            amount        : '',
            name          : '',
            min           : minDate,
            model         : {
                offering : this.$route.params.id,
                name     : '',
                quantity : 1,
                star     : '',
                date     : ''
            }
        };
    },

    mounted () {
        this.getImage();
    },

    computed : {
        subTotal () {
            const quantity = this.model.quantity;
            const price = this.amount;
            return price * quantity;
        }
    },

    methods : {
        increment () {
            this.model.quantity++;
        },

        decrement () {
            if (this.model.quantity === 1) {
                alert('Negative quantity not allowed');
            } else {
                this.model.quantity--;
            }
        },

        getImage () {
            const that = this;
            axios.form(urls.offering.getImage, { id : that.$route.params.id }).then(function (response) {
                const json = response.data;
                that.offeringImage = json.data.image;
                that.amount = json.data.amount;
                that.name = json.data.name;
            }).catch(function () {
            });
        },

        onSubmit () {
            const that = this;
            that.loading = true;
            axios.form(urls.cart.addCartItem, that.model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    alert('Item added to cart!');
                    that.$router.push({ path : '/offerings/' });
                } else {
                    console.log(json);
                    alert('Something went wrong');
                }
                that.loading = false;
            }).catch(function () {
                that.loading = false;
            });
        }
    }
};
</script>

<style scoped>

</style>