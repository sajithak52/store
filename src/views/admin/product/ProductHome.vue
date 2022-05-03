<template>
    <div>
        <section class="header-mt">
            <div class="container py-5">

                <div class="text-center">
                    <p class="text-default xeo-heading-2 mb-5">PRODUCTS</p>
                </div>

                <div class="row filter-section align-items-md-start">
                    <div class="col-md-3 position-md-sticky top-pos">

                        <div class="filters">
                            <div class="d-flex justify-content-between border-bottom pb-3 mb-3">
                                <p class="m-0">Categories</p>

                                <a v-b-modal.add-Category>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </a>
                            </div>

                            <ul class="list-unstyled">

                                <li class="filter" v-bind:class="{ active: currentFilter === 'ALL' }"
                                    v-on:click="setFilter('ALL')">all
                                </li>

                                <li class="filter" v-for="(category, index) in categories" v-bind:key="index"
                                    :class="{ active: currentFilter === category }">

                                    <div class="clearfix">
                                        <a class="float-left" @click="setFilter(category)">{{ category.name }}</a>

                                        <div class="float-right">
                                            <a @click="categoryEdit(category)" class="mr-3">
                                                <b-icon icon="pencil-square" font-scale="1.1"></b-icon>
                                            </a>
                                            <a @click="categoryDelete(category)">
                                                <b-icon icon="trash" font-scale="1.1"></b-icon>
                                            </a>
                                        </div>
                                    </div>

                                </li>

                            </ul>

                        </div>
                    </div>

                    <div class="col-md-9">

                        <div class="row">
                            <div class="project col-12 mb-5">
                                <a v-b-modal.add-Offering>
                                    <div class="project-add-wrapper">
                                        Add Item
                                        <b-icon class="ml-3" icon="plus-square" font-scale="1.6"></b-icon>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <transition-group tag="div" class="projects row" name="list-complete">

                            <div class="project col-md-3 col-6 mb-3" v-for="offer in filteredItems"
                                 v-bind:key="offer.name">

                                <a>
                                    <div class="project-image-wrapper">
                                        <div class="position-relative">
                                            <img class="project-image" v-bind:src="offer.image" alt="">
                                            <div class="gradient-overlay">
                                                <a @click="offeringsEdit(offer)" class="mr-4">
                                                    <b-icon icon="pencil-square" font-scale="1.6"></b-icon>
                                                </a>
                                                <a @click="offeringsDelete(offer)" class="mr-4">
                                                    <b-icon icon="trash" font-scale="1.6"></b-icon>
                                                </a>
                                                <a v-if="offer.disable" @click="disableProduct(offer)">
                                                    <b-icon icon="eye" font-scale="1.6"></b-icon>
                                                </a>
                                                <a v-else @click="disableProduct(offer)">
                                                    <b-icon icon="eye-slash" font-scale="1.6"></b-icon>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="project-title">{{ offer.name }}</div>
                                        <div class="item-price">
                                            <currency-view :value="offer.selling_price" />
                                        </div>
                                    </div>
                                </a>

                            </div>

                        </transition-group>
                    </div>
                </div>
            </div>
        </section>

        <b-modal id="add-Category" title="Category" hide-footer>
            <AddCategory @success="categoryAdded"></AddCategory>
        </b-modal>
        <b-modal id="edit-Category" title="Category" hide-footer>
            <EditCategory :initial-data="editingCategoryModel" @success="categoryUpdated"></EditCategory>
        </b-modal>

        <b-modal id="add-Offering" title="Product" size="lg" hide-footer>
            <AddProduct @success="offeringsAdded"></AddProduct>
        </b-modal>
        <b-modal id="edit-Offering" title="Product" size="lg" hide-footer>
            <EditProduct :model="editingOfferingModel" @success="offeringsUpdated"></EditProduct>
        </b-modal>

    </div>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';
import AddCategory from "@/views/admin/product/category/AddCategory";
import EditCategory from "@/views/admin/product/category/EditCategory";
import AddProduct from "@/views/admin/product/AddProduct";
import EditProduct from "@/views/admin/product/EditProduct";

export default {
    name : "ProductHome",

    components : { AddCategory, EditCategory, AddProduct, EditProduct },

    data () {

        return {
            currentFilter : 'ALL',
            offerings     : [],

            editingCategoryModel : null,

            editingOfferingModel : {
                id       : '',
                name     : '',
                image    : '',
                amount   : '',
                category : '',
                stock    : '',
                disable  : false
            }
        };
    },

    computed : {
        filteredItems () {
            const filter = this.currentFilter;
            if (filter === 'ALL') {
                return this.offerings;
            }

            const items = this.offerings;
            const result = [];
            let i;
            let item;
            for (i = 0; i < items.length; i += 1) {
                item = items[i];
                if (item.category.id === filter.id) {
                    result.push(item);
                }
            }
            return result;
        },

        categories () {
            const items = this.offerings;

            const result = [];
            let i;
            let category;

            for (i = 0; i < items.length; i += 1) {
                category = items[i].category;

                const element = category;
                if (!result.some(category => category.name === element.name)) {
                    result.push(category);
                }
            }
            return result;
        }
    },
    
    mounted () {
        this.loadDetails();
    },

    methods : {
        loadDetails () {
            const that = this;
            axios.get(urls.admin.product.list).then(function (response) {
                const json = response.data;
                that.offerings = json.data;
            });
        },

        setFilter : function (filter) {
            this.currentFilter = filter;
        },

        categoryAdded (category) {
            this.categories.push(category);
            this.$bvModal.hide('add-Category');
            this.$bvToast.toast('Successfully added category..!!', {
                title   : `Success`,
                variant : 'success',
                solid   : true
            });
        },

        categoryEdit (category) {
            this.editingCategoryModel = {...category};
            this.$bvModal.show('edit-Category');
        },

        categoryUpdated (category) {
            const position = this.categories.findIndex(ele => ele.id === this.editingCategoryModel.id);
            this.categories.splice(position, 1, category);
            this.editingCategoryModel = null;
            this.$bvModal.hide('edit-Category');
            this.$bvToast.toast('Successfully updated category..!!', {
                title   : `Success`,
                variant : 'success',
                solid   : true
            });
        },

        categoryDelete (category) {
            const conform = confirm('Are you sure?');

            if (!conform) {
                return;
            }

            const that = this;
            axios.form(urls.admin.category.delete, { id : category.id }).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    const position = that.categories.findIndex(ele => ele.id === category.id);
                    that.categories.splice(position, 1);
                    that.$bvToast.toast('Successfully deleted category..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                }
            }).catch(function (exception) {
                console.log('exception occurred at the delete of category : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        },

        offeringsAdded (offerings) {
            this.offerings.push(offerings);
            this.$bvModal.hide('add-Offering');
            this.$bvToast.toast('Successfully added product..!!', {
                title   : `Success`,
                variant : 'success',
                solid   : true
            });
        },

        offeringsEdit (offerings) {
            this.editingOfferingModel.id = offerings.id;
            this.editingOfferingModel.name = offerings.name;
            this.editingOfferingModel.image = offerings.image;
            this.editingOfferingModel.selling_price = offerings.selling_price;
            this.editingOfferingModel.stock = offerings.stock;
            this.editingOfferingModel.disable = offerings.disable;
            this.editingOfferingModel.category = offerings.category.id;
            this.$bvModal.show('edit-Offering');
        },

        offeringsUpdated (offerings) {
            const position = this.offerings.findIndex(ele => ele.id === this.editingOfferingModel.id);
            this.offerings.splice(position, 1, offerings);
            this.$bvModal.hide('edit-Offering');
            this.$bvToast.toast('Successfully updated product..!!', {
                title   : `Success`,
                variant : 'success',
                solid   : true
            });
        },

        offeringsDelete (offerings) {
            const conform = confirm('Are you sure?');
            if (!conform) {
                return;
            }
            const that = this;
            axios.form(urls.admin.product.delete, { id : offerings.id }).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully deleted product..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    const position = that.offerings.findIndex(ele => ele.id === offerings.id);
                    that.offerings.splice(position, 1);
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                }
            }).catch(function (exception) {
                console.log('exception occurred at the delete of product : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        },

        disableProduct (product) {
            const model = {
                id            : product.id,
                disable       : !product.disable,
                name          : product.name,
                image         : product.image,
                selling_price : product.selling_price,
                stock         : product.stock,
                category      : product.category.id,
            };
            const conform = confirm('This Button is to Disable the Product. \n Are you sure?');
            if (!conform) {
                return;
            }
            const that = this;
            axios.form(urls.admin.product.addEdit, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    if (!product.disable) {
                        that.$bvToast.toast('Successfully Disabled the product..!!', {
                            title   : `Success`,
                            variant : 'success',
                            solid   : true
                        });
                    } else {
                        that.$bvToast.toast('Successfully Enabled the product..!!', {
                            title   : `Success`,
                            variant : 'success',
                            solid   : true
                        });
                    }
                    const position = that.offerings.findIndex(ele => ele.id === product.id);
                    that.offerings.splice(position, 1, json.data);
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                }
            }).catch(function (exception) {
                console.log('exception occurred at the disable of product : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        }
    }
};
</script>

<style scoped>
.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}
</style>