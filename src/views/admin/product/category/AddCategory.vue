<template>
    <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Category Name:" label-for="input-1">
            <b-form-input id="input-1"
                v-model="model.name" placeholder="Enter Category Name" required></b-form-input>
        </b-form-group>
        <div class="text-center">
            <b-button type="submit" variant="primary" class="mr-2 bg-default">
                <span v-if="loading">Saving...</span>
                <span v-else>Save</span>
            </b-button>
        </div>
    </b-form>
</template>

<script>
import urls from '@/data/urls';
import axios from '@/data/axios';

export default {
    name : "AddCategory",

    data () {
        return {
            model : {
                name : ''
            },
            loading : false
        };
    },

    methods : {

        onSubmit () {
            const that = this;
            that.loading = true;
            axios.form(urls.admin.category.addEdit, that.model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$emit('success', json.data);
                    that.loading = false;
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
                console.log('exception occurred at the add of category : ', exception);
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