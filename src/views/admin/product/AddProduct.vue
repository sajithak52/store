<template>
    <b-form role="form" @submit.prevent="onSubmit">
        <b-row>
            <b-col>
                <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                    <b-form-input id="input-1" placeholder="Enter name"
                        v-model="form.name" required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="input-group-2" label="Image:" label-for="input-2">
                    <b-form-file id="input-2" placeholder="Select a File"
                        v-model="form.image" required></b-form-file>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
                    <b-form-input id="input-2" placeholder="Enter amount in Paisa" type="number"
                        v-model="form.selling_price" description="Enter amount in Paisa" required></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group id="input-group-3" label="Stock:" label-for="input-3">
                    <b-form-input id="input-2" placeholder="Enter Stock" type="number"
                                  v-model="form.stock" required></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group id="input-group-3" label="Category:" label-for="input-3">
                    <b-form-select id="input-3" :options="categoryOptions"
                        v-model="form.category" required></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="text-center">
            <b-button type="submit" variant="primary" class="mr-2 bg-default">
                <span v-if="loading">Saving...</span>
                <span v-else>Save</span>
            </b-button>
        </div>

    </b-form>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "AddProduct",

    data () {
        return {
            form : {
                name     : '',
                image    : null,
                amount   : '',
                category : '',
                stock    : ''
            },
            categoryOptions : [],
            loading         : false
        };
    },

    mounted () {
        this.loadCategory();
    },

    methods : {
        loadCategory () {
            const that = this;
            axios.get(urls.admin.category.options).then(function (response) {
                that.categoryOptions = response.data.data;
            }).catch(function () {});
        },

        onSubmit () {
            const that = this;
            that.loading = true;
            axios.form(urls.admin.product.addEdit, that.form).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.loading = false;
                    that.$emit('success', json.data);
                } else {
                    that.loading = false;
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                }
            }).catch(function (exception) {
                that.loading = false;
                console.log('exception occurred at the add of product : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Success`,
                    variant : 'success',
                    solid   : true
                });
            });
        }
    }
};
</script>

<style scoped>

</style>