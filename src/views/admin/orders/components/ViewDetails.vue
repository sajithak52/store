<template>
    <div>
        <div class="cart-table">

            <table class="table table-hover table-condensed">
                <thead>
                <tr class="mn-color-1 jose-light c-font-16">
                    <th style="width:30%"></th>
                    <th style="width:18%">Price</th>
                    <th style="width:18%">Quantity</th>
                    <th style="width:18%" class="text-right">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, key)  in items" v-bind:key="key"
                    class="mn-color-1 cart-item-remove jose-light bold c-font-16">
                    <th style="width:30%" class="cart-img">
                        <span class=""> {{ item.item_name }}</span>
                    </th>
                    <th style="width:18%" class="">
                        <currency-view :value="item.unit_price" />
                    </th>
                    <th style="width:18%" class="">{{ item.quantity }}</th>
                    <th style="width:18%" class="text-right">
                        <currency-view :value="item.total_price" />
                    </th>
                </tr>
                </tbody>
            </table>

            <div v-if="content" class=" col-md-12  c-margin-t-10 c-padding-m-10 c-font-right ">
                <p class=" c-font-16 c-margin-b-0 mn-color-1">
                    SUBTOTAL
                    <span class="c-font-22 c-margin-t-0 bold mn-color-4 jose-semibold">
                        <currency-view :value="subTotal" />
                    </span>
                </p>
            </div>
        </div>

        <pre v-if="content">
            <span>Billing Details:</span>
            <span>
                <span>{{ content.student_name }}</span>
                <span>{{ content.admission_number }}</span>
                <span>Branch : {{ content.branch }}</span>
            </span>
            <span>Contact Information:</span>
            <span>
                <span>{{ content.email }}</span>
                <span>{{ content.mobile_number }}</span>
            </span>
        </pre>
    </div>
</template>

<script>
// import axios from 'secure-axios';
// import urls from '@/data/urls';

export default {
    name : 'ViewDetails',

    props : {
        content : {
            type : Object
        },

        items : { type : Array }
    },

    watch : {
        id : function (value) {
            if (value) {
                this.loadDetails();
            }
        }
    },

    computed : {
        subTotal () {
            let total = 0;
            const items = this.items;
            for (let i = 0; i < items.length; i += 1) {
                total += items[i].total_price;
            }
            return total;
        }
    }
};
</script>

<style scoped>

</style>
