<template>
    <span>
        ₹ <span v-html="rupees"></span>.
        <small v-html="paisa"></small>
    </span>
</template>

<script>

export default {
    name : 'CurrencyView',

    props : {
        value : {
            type    : Number,
            default : 0
        }
    },

    data () {
        return {
            rupees : 0,
            paisa  : 0
        };
    },

    mounted () {
        this.convert();
    },

    methods : {
        convert () {
            const value = parseInt(this.value, 10).toString();

            const l = value.length;

            if (l < 3) {
                this.rupees = '0';
                this.paisa = value;
            } else {
                const rupees = value.substr(0, l - 2);
                const paisa = value.substr(l - 2);

                this.rupees = rupees;
                this.paisa = paisa;
            }
        }
    },

    watch : {
        value : function () {
            this.convert();
        }
    }
};
</script>

<style scoped>

</style>