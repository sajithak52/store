<template>
    <div>
        <section class="header-mt">
            <div class="container py-5">
                <div class="text-center">
                    <p class="text-default xeo-heading-2 mb-5">Products</p>
                </div>

                <div class="row filter-section align-items-md-start">

                    <div class="col-md-3 position-md-sticky top-pos">
                        <div class="filters">
                            <div class="d-flex justify-content-between border-bottom pb-3 mb-3">
                                <p class="m-0">Categories</p>
                            </div>

                            <ul class="list-unstyled">
                                <li class="filter" v-bind:class="{ active: currentFilter === 'ALL' }"
                                    v-on:click="setFilter('ALL')">all
                                </li>
                                <li class="filter" v-for="(category, index) in categories" v-bind:key="index"
                                    :class="{ active: currentFilter === category }"
                                    @click="setFilter(category)">
                                    {{ category.name }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-9">

                        <transition-group tag="div" class="projects row" name="list-complete">

                            <div class="project col-md-3 col-6 mb-3" v-for="offer in filteredItems"
                                 v-bind:key="offer.name">
                                <a>
                                    <div class="project-image-wrapper">
                                        <div class="position-relative">
                                            <img class="project-image" v-bind:src="offer.image" alt="">

                                            <div class="gradient-overlay">
                                                <div>
                                                    <a v-if="showMinus(offer)" @click="decrement(offer)" class="mr-2">
                                                        <b-icon icon="dash" font-scale="1.6"></b-icon>
                                                    </a>
                                                    <loading-animation v-if="offer.loading_minus" />
                                                </div>

                                                <p class="m-0 p-1" v-if="offer.quantity > 0"
                                                   v-html="offer.quantity"></p>

                                                <div>
                                                    <a v-if="!offer.loading_plus" @click="increment(offer)" class="ml-2">
                                                        <b-icon icon="plus" font-scale="1.6"></b-icon>
                                                    </a>
                                                    <loading-animation v-else />
                                                </div>
                                            </div>

                                        </div>
                                        <div class="project-title">{{ offer.name }}</div>
                                        <div class="item-price">
                                            <currency-view class="item-price" :value="offer.selling_price" />
                                        </div>

                                    </div>
                                </a>
                            </div>

                        </transition-group>

                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';

export default {
    name : "ProductList",

    data() {

        return {
            currentFilter : 'ALL',
            offerings     : []
        };
    },

    computed : {
        filteredItems() {
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

        categories() {
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

    mounted() {
        this.loadDetails();
    },

    methods : {

        loadDetails() {
            const that = this;
            axios.get(urls.admin.product.list + '?type=website').then(function (response) {
                const json = response.data;
                that.offerings = json.data;
            });
        },

        setFilter : function (filter) {
            this.currentFilter = filter;
        },

        showMinus (model) {
            if (model.quantity > 0) {
                return !model.loading_minus;
            } else {
                return false;
            }
        },

        decrement (item) {
            const that = this;
            item.loading_minus = true;

            if (item.quantity === 0) {
                that.$bvToast.toast('Negative value not allowed..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
                item.loading_minus = false;
                return ;
            }

            const model = {
                product  : item.id,
                quantity : -1
            };

            axios.form(urls.user.cart.addCart, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully updated cart..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    item.quantity--;
                    item.loading_minus = false;
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                    item.loading_minus = false;
                }
            }).catch(function (exception) {
                item.loading_minus = false;
                console.log('exception occurred : ', exception);
                that.$bvToast.toast('Something went wrong..!!', {
                    title   : `Warning`,
                    variant : 'warning',
                    solid   : true
                });
            });
        },

        increment(item) {
            const that = this;
            item.loading_plus = true;
            const model = {
                product  : item.id,
                quantity : 1
            };
            axios.form(urls.user.cart.addCart, model).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    that.$bvToast.toast('Successfully added to cart..!!', {
                        title   : `Success`,
                        variant : 'success',
                        solid   : true
                    });
                    item.quantity++;
                    item.loading_plus = false;
                } else {
                    that.$bvToast.toast(json.message || 'Something went wrong..!!', {
                        title   : `Warning`,
                        variant : 'warning',
                        solid   : true
                    });
                    item.loading_plus = false;
                }
            }).catch(function (exception) {
                item.loading_plus = false;
                console.log('exception occurred : ', exception);
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