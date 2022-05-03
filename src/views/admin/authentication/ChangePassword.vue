<template>
    <div class="align-items-center d-flex header-mt justify-content-center login-bg">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-login border-0 mb-0">
                <div class="card-body px-lg-5 py-lg-5">

                    <div class="text-center text-muted mb-4">
                        <p><b>Change Password</b></p>
                    </div>

                    <b-form role="form" @submit.prevent="onSubmit">
                        <b-row>
                            <b-col>
                                <b-form-group id="input-group-2" label="Old Password:" label-for="input-2">
                                    <b-form-input
                                        id="input-2"
                                        v-model="model.old_password"
                                        type="password"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col lg="12">
                                <b-form-group id="input-group-2" label="New Password:" label-for="input-2">
                                    <b-form-input
                                        id="input-2"
                                        v-model="model.new_password"
                                        type="password"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col lg="12">
                                <b-form-group id="input-group-2" label="Confirm Password:" label-for="input-2">
                                    <b-form-input
                                        id="input-2"
                                        v-model="model.new_password_retype"
                                        type="password"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>

                        </b-row>

                        <div class="text-center mt-4">
                            <button type="submit" class="btn bg-default">Change Password
                            </button>
                        </div>
                    </b-form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "ChangePassword",

    data () {
        return {
            model : {
                old_password        : '',
                new_password        : '',
                new_password_retype : ''
            }
        };
    },

    methods : {

        onSubmit () {
            const component = this;
            axios.form(urls.auth.changePassword, component.model).then(function (data) {
                const json = data.data;
                if (json.error === false) {
                    component.$router.push({path : '/admin/login/'});
                } else {
                    component.errorMessage = json.errors.__all__ || '';
                }
            }).catch(function () {
            });
        }
    }
};
</script>

<style scoped>

</style>