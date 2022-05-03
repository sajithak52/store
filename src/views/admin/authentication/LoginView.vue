<template>
    <div class="home">

        <img class='background-img' src='../../../assets/img/balloon.jpg' alt=""/>

        <section class="card-wrapper">
            <div class="top-banner mt-2">
                <div class="text-center text-black">
                        <p><b>LOGIN</b></p>
                    </div>
            </div>
            <div class="container-fluid">

                <div class="row">
                    <div class="col">



                        <div class="alert alert-danger" style="text-align: center;" v-if="errorMessage" v-html="errorMessage"></div>

                        <b-form role="form" @submit.prevent="onSubmit">

                            <b-form-group id="input-group-2" label="Username:" label-for="input-2">
                                <b-form-input
                                    id="input-2"
                                    v-model="model.username"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                                <b-form-input
                                    id="input-2"
                                    v-model="model.password"
                                    type="password"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <div class="text-center">
                                <button type="submit"
                                        class="btn bg-default xeo-btn">
                                    <span v-if="loading">
                                        <loading-animation /> Validating Credential..
                                    </span>
                                    <span v-else>
                                        LOGIN
                                    </span>
                                </button>
                            </div>
                        </b-form>
                    </div>

                </div>

            </div>
        </section>
    </div>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';
import {mapActions} from 'vuex';

export default {
    name : "LoginView",

    props : {
        info_message : {
            type    : String,
            default : ''
        }
    },

    data() {
        return {
            loading      : false,
            errorMessage : '',
            model        : {
                username : '',
                password : ''
            }
        };
    },

    methods : {
        ...mapActions(['setUser']),

        onSubmit() {
            const that = this;
            this.loading = true;
            axios.form(urls.auth.login, this.model).then(function (response) {
                const json = response.data;
                console.log('data =>', json);
                if (json.success === true) {
                    const redirectUrl = sessionStorage.getItem('redirectPath');
                    that.setUser(json.user);
                    that.$router.push(redirectUrl || {path : '/admin/purchase-entry/'});
                } else {
                    that.errorMessage = json.errors.__all__ || '';
                }
                that.loading = false;
                localStorage.clear();
            }).catch(function () {
                that.errorMessage = 'Invalid credentials.';
                that.loading = false;
            });
        }
    }
};
</script>

<style scoped>
.background-img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    object-fit: cover;
}

.card-wrapper {
    overflow: hidden;
    min-width: 90%;
    border-radius: 10px;
    position: absolute;
    right: 15px;
    left: 15px;
    top: 50%;
    transform: translate(0%, -50%);
    background: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    box-shadow: 0 0 20px -2px black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 0 20px 0;
    color: rgba(18, 18, 18, 0.85);

    .top-banner {
        display: flex;
        padding: 16px;
        justify-content: center;
        background: #004e96;
        border-bottom: solid 5px #faa519;
    }

    img {
        max-width: 100%;
        height: 100%;
        width: 10rem;
    }


    .xeo-btn {
        margin: 20px 0;
        width: 80%;
        height: 40px;
        border-radius: 20px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .xeo-btn:hover {
        background: rgba(18, 18, 18, 0.3);
        color: rgba(255, 255, 255, 0.8);
    }

}

@media (min-width: 992px) {

    .card-wrapper {
        min-width: 350px;
        right: 0;
        left: unset;
        transform: translate(-180%, -50%);
    }
}

</style>