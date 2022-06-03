<template>
    <section class="header-mt">
        <div class="container py-5">
            <p class="xeo-heading-2 text-default text-center mb-5">PURCHASE ENTRY</p>

            <div class="alert alert-info clearfix">
                <div class="float-left">
                    <span v-if="model.is_open">Your store is Open</span>
                    <span v-else>Your store is not open please use the button to open store..!!</span>
                </div>
                <div class="float-right">
                    <b-form-checkbox v-model="model.is_open" name="check-button" switch @change="openStore">
                        <b>(Switch Shop: <span v-if="model.is_open">Close</span>
                    <span v-else>Open</span>)</b>
                    </b-form-checkbox>
                </div>
            </div>

            <b-card class="business-tab">

                <b-row>
                    <b-col lg="5" class="mb-3">

                        <b-form @submit.prevent="getBookingDetails">
                            <b-form-group label="Booking ID" label-for="entry-input" class="mb-0">

                                <b-input-group size="sm">
                                    <b-form-input id="entry-input" v-model="booking" type="search"
                                                  placeholder="Enter or Scan the Code" required>
                                    </b-form-input>

                                    <b-input-group-append>
                                        <b-button type="submit" variant="success">
                                            <b-icon icon="search" font-scale="0.9"></b-icon>
                                            Search
                                        </b-button>
                                        <b-button type="button" variant="warning" :disabled="!booking"
                                                  @click="clearAll">
                                            <b-icon icon="x" font-scale="1"></b-icon>
                                            Clear
                                        </b-button>
                                    </b-input-group-append>

                                </b-input-group>

                            </b-form-group>
                        </b-form>

                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="12">
                        <div v-if="loading" class="alert alert-primary" v-html="'Loading...'"></div>

                        <div v-else-if="error" class="alert alert-danger"
                             v-html="'Failed to fetch data from the server.'"></div>

                        <div v-else>

                            <div v-if="details">
                                <div class="cart-table">

                                    <table class="table table-hover table-condensed">
                                        <thead>
                                        <tr class="mn-color-1 jose-light c-font-16">
                                            <th style="width:30%"></th>
                                            <th style="width:18%">Price</th>
                                            <th style="width:18%">Quantity</th>
                                            <th style="width:18%" class="text-right">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, key)  in details.items" v-bind:key="key"
                                            class="mn-color-1 cart-item-remove jose-light bold c-font-16">
                                            <th style="width:30%" class="cart-img">
                                                <span class=""> {{ item.item_name }}</span>
                                            </th>
                                            <th style="width:18%" class="">₹{{ item.unit_price }}</th>
                                            <th style="width:18%" class="">{{ item.quantity }}</th>
                                            <th style="width:18%" class="text-right">₹{{ item.total_price }}</th>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div v-if="details" class=" col-md-12  c-margin-t-10 c-padding-m-10 c-font-right ">
                                        <p class=" c-font-16 c-margin-b-0 mn-color-1">
                                            SUBTOTAL
                                            <span class="c-font-22 c-margin-t-0 bold mn-color-4 jose-semibold"> ₹{{
                                                    details.total_price
                                                }}</span>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p>Billing Details:</p>
                                    <pre>
                                        <span>{{ details.student_name }}</span>
                                        <span>{{ details.admission_number }}</span>
                                        <span>{{ details.branch }}</span>
                                    </pre>
                                    <p>Contact Information:</p>
                                    <pre>
                                        <span>{{ details.email_address }}</span>
                                        <span>{{ details.mobile_number }}</span>
                                    </pre>
                                </div>

                                <b-button class="float-right btn btn-success" @click="updatePurchase">
                                    <span v-if="updating">Updating...</span>
                                    <span v-else>Update Purchase</span>
                                </b-button>

                            </div>


                        </div>

                    </b-col>
                </b-row>

            </b-card>
        </div>
    </section>
</template>

<script>
import urls from "@/data/urls";
import axios from '@/data/axios';

export default {
    name : "PurchaseEntry",

    data() {
        return {
            booking : '',
            details : null,

            loading : false,
            error   : false,

            updating  : false,
            exception : false,

            model : {
                is_open : false
            }
        };
    },

    mounted() {
        this.loadData();
    },

    methods : {
        loadData () {
            const that = this;

            axios.get(urls.shop.checkOpen).then(function (response) {
                const json = response.data;
                that.model = {...json.data};
            }).catch(function (exception) {
                console.log("exception : ", exception);
                const model = {
                    is_open : false
                };
                that.model = {...model};
            });
        },

        clearAll() {
            this.booking = '';
            this.details = null;
        },

        getBookingDetails() {
            const that = this;

            that.loading = true;
            that.error = false;

            const model = {
                booking : that.booking
            };

            axios.form(urls.admin.purchase.getDetails, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully fetched the data..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    that.details = {...json.data};
                    that.loading = false;
                } else {
                    that.$bvToast.toast(json.message, {
                        title   : `Warning`,
                        variant : 'danger',
                        solid   : true
                    });
                    that.loading = false;
                    that.error = true;
                }
            }).catch(function (exception) {
                console.log('exception occurred at fetching the details...', exception);
                that.loading = false;
                that.error = true;
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'danger',
                    solid   : true
                });
            });
        },

        updatePurchase() {
            const that = this;

            that.updating = true;
            that.exception = false;

            const model = {
                booking : that.booking
            };

            axios.form(urls.admin.purchase.purchaseOrder, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully updated the booking..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    that.updating = false;
                    setTimeout(that.reloadFn, 300);

                } else {
                    that.$bvToast.toast(json.message, {
                        title   : `Warning`,
                        variant : 'danger',
                        solid   : true
                    });
                    that.updating = false;
                    that.exception = true;
                }
            }).catch(function (exception) {
                console.log('exception occurred at fetching the details...', exception);
                that.updating = false;
                that.exception = true;
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'danger',
                    solid   : true
                });
            });
        },

        reloadFn() {
            window.location.reload();
        },

        openStore () {
            const that = this;

            axios.form(urls.shop.openStore, that.model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully Update the store..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    // that.model = {...json.data};
                } else {
                    that.$bvToast.toast(json.message, {
                        title   : `Warning`,
                        variant : 'danger',
                        solid   : true
                    });
                }
            }).catch(function (exception) {
                console.log('exception occurred at open store the details...', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'danger',
                    solid   : true
                });
            });
        }
    }
};
</script>

<style scoped>

</style>