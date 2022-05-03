<template>
    <div>
        <Header :not-found="true" />
        <div class="align-items-center d-flex header-mt justify-content-center login-bg mb-5">

            <div id="sub-page" class="mt-5 mb-5">
                <div class="container" style="margin-bottom: 38px">
                    <div class="">
                        <h1>Oops Something went wrong</h1>
                    </div>

                    <div class="chbk">404 - Page Not Found...</div>

                    <div class="clear"></div>
                </div>
            </div>
        </div>

        <Footer/>

    </div>
</template>


<script>
import Header from "@/components/header";
import Footer from '@/components/footer';

export default {
    name : "NotFound",

    components : {Header, Footer}
};
</script>

<style scoped>
.chbk {
    padding: 30px 0;
    text-align: center;
    font-size: 16pt
}
</style>