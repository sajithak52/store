<template>
    <section class="">
        <div class="container py-5">

            <div class="row m-0 text-center">
                <p class="xeo-heading-1 text-default mb-5">CONTACT US</p>
            </div>

            <b-form id="contact" class="checkout-form" role="form" @submit.prevent="onSubmit">

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <b-form-input id="input-2" placeholder="Name"
                                      v-model="model.name" required></b-form-input>
                    </div>

                    <div class="col-md-6 mb-3">
                        <b-form-input id="input-2" placeholder="Email" type="email"
                                      v-model="model.email" required></b-form-input>
                    </div>

                    <div class="col-md-6 mb-3">
                        <b-form-input id="input-2" placeholder="Mobile" type="tel" minlength="10" maxlength="10"
                                      @keypress="onlyNumberKey($event)" pattern="[0-9]*"
                                      v-model="model.mobile" required></b-form-input>
                    </div>

                    <div class="col-md-6 mb-3">
                        <b-form-input id="input-2" placeholder="Subject"
                                      v-model="model.subject" required></b-form-input>
                    </div>

                    <div class="col-12 mb-3">
                        <b-form-textarea id="input-2" placeholder="Message"
                                         v-mask="'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'"
                                         v-model="model.message" required></b-form-textarea>
                    </div>

                </div>

                <div class="row justify-content-end">
                    <div class="col-md-4 mb-3">
                        <b-button class="btn btn-block xeo-btn-1 text-white"
                                  type="submit">
                            <span v-if="loading">Sending...</span>
                            <span v-else>Send A Mail</span>
                        </b-button>
                    </div>
                </div>

            </b-form>

            <br><br>
        </div>
    </section>
</template>

<script>
import axios from "@/data/axios";
import urls from "@/data/urls";

export default {
    name : "ContactView",

    data() {
        return {
            model : {
                name    : '',
                mobile  : '',
                subject : '',
                email   : '',
                message : ''
            },

            loading : false
        };
    },

    methods : {
        onSubmit() {
            const that = this;
            that.loading = true;
            axios.form(urls.user.contactUs, that.model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.loading = false;
                    alert('Successfully send the mail..!!');
                    window.location.reload();
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

        onlyNumberKey(evt) {
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