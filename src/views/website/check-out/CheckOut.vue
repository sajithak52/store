<template>
    <section class="header-mt">
        <div class="container py-5">
            <div class="container">

                <b-form id="contact" class="checkout-form" role="form" @submit.prevent="onSubmit">

                    <div class="row m-0 text-center">
                        <p class="xeo-heading-1 text-default mb-5">CUSTOMER INFORMATION</p>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <b-form-input id="input-2" placeholder="First Name"
                                          v-model="model.student_name" required></b-form-input>
                        </div>

                        <div class="col-md-6 mb-3">
                            <b-form-input id="input-2" placeholder="Email" type="email"
                                          v-model="model.email_address" required></b-form-input>
                        </div>

                        <div class="col-md-6 mb-3">
                            <b-form-input id="input-2" placeholder="Mobile" type="tel" minlength="10" maxlength="10"  @keypress="onlyNumberKey($event)" pattern="[0-9]*"
                                          v-model="model.mobile_number" required></b-form-input>
                        </div>

                        <div class="col-md-6 mb-3">
                            <b-form-input id="input-2" placeholder="Admission Number"
                                          v-model="model.admission_number" required></b-form-input>
                        </div>

                        <div class="col-12 mb-3">
                            <b-form-input id="input-2" placeholder="Branch" v-mask="'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'"
                                          v-model="model.branch" required></b-form-input>
                        </div>

                    </div>

                    <div class="row justify-content-end">
                        <div class="col-md-4 mb-3">
                            <b-button class="btn btn-block xeo-btn-1 text-white"
                                    type="submit">
                                <span v-if="loading">Saving...</span>
                                <span v-else>CONTINUE</span>
                            </b-button>
                        </div>
                    </div>

                </b-form>

                <br><br>

            </div>
        </div>
    </section>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "CheckOut",

    data () {
        return {
            loading : false,

            model : {
                student_name     : '',
                mobile_number    : '',
                email_address    : '',
                admission_number : '',
                branch           : '',
            }
        };
    },

    methods : {
        onSubmit () {
            const that = this;
            that.loading = true;
            axios.form(urls.user.cart.checkOutForm, that.model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.loading = false;
                    that.$router.push({ path : '/cart/' + json.cart + '/checkout-details/' });
                } else {
                    that.loading = false;
                    that.$bvToast.toast('Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                }
            }).catch(function () {
                that.loading = false;
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        },

        onlyNumberKey (evt) {
            evt = (evt) || window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    }
};
</script>

<style scoped>

</style>