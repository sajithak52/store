<template>
    <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Category Name:" label-for="input-1">
            <b-form-input id="input-1"
                v-model="model.name" placeholder="Enter Category Name" required></b-form-input>
        </b-form-group>
        <div class="text-center">
            <b-button type="submit" variant="primary" class="mr-2 bg-default">
                <span v-if="loading">Updating...</span>
                <span v-else>Update</span>
            </b-button>
        </div>
    </b-form>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "EditCategory",

    props : {
        initialData : {
            type : Object
        }
    },

    data () {
        return {
            loading : false,
            model   : this.initialData
        };
    },

    methods : {

        onSubmit () {
            const that = this;
            that.loading = true;
            axios.form(urls.admin.category.addEdit, that.model).then(function (response) {
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
                console.log('exception occurred at the edit of category : ', exception);
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