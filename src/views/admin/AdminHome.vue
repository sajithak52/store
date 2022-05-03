<template>
    <div class="mt-8">

        <section class="banner-section container-fluid header-mt bg-black">
            <div class="row">
                <div class="col-md-6 col-sm-12 px-0">
                    <img class="img-fluid w-100" src="../../assets/img/balloon.jpg" alt="">
                </div>
                <div class="align-items-center col-md-6 d-flex justify-content-center text-center py-5 py-lg-0">
                    <div>
                        <p class="banner-text-1">
                            Govt <br> POLYTECHNIC <br> CHELAKARA
                        </p>
                        <div class="banner-btn">
                            <a @click="Offerings" class="btn btn-block btn-basic-1 btn-warning ">
                                PRODUCTS
                            </a>
                            <a @click="Business" class="btn btn-block btn-basic-1 btn-warning ">
                                BUSINESS
                            </a>
                            <a @click="Purchase" class="btn btn-block btn-basic-1 btn-warning ">
                                PURCHASE
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name : "AdminHome",

    methods : {

        Offerings () {
            this.$router.push('/admin/product-home/');
        },

        Business () {
            this.$router.push('/admin/orders/');
        },

        Purchase () {
            this.$router.push('/admin/orders/');
        }
    }
};
</script>

<style scoped>

</style>