<template>
    <div class="business-table">

        <b-row>

            <b-col lg="4" class="mb-3">
                <b-form-group label="Per page" label-for="per-page-select" class="mb-0">
                    <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                                   size="sm"></b-form-select>
                </b-form-group>
            </b-col>

        </b-row>

        <b-row>
            <b-col lg="4" class="mb-3">
                <b-form-group label="Filter" label-for="filter-input" class="mb-0">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

        </b-row>

        <!-- Main table element -->
        <b-table class="table-active table-bordered table-striped"
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :filter="filter"
                 :filter-included-fields="filterOn"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :sort-direction="sortDirection"
                 stacked="md"
                 show-empty
                 small
                 @filtered="onFiltered"
        >
            <template #cell(name)="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
                <div class="btn-group">
                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1 xeo-btn-1">
                        View Details
                    </b-button>
                    <b-button size="sm" v-if="status === 'Pending Bookings'" @click="sendMail(row.item)" class="mr-1 xeo-btn-1">
                        Send Completion Mail
                    </b-button>
                </div>
            </template>

        </b-table>

        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" size="xl" ok-only @hide="resetInfoModal">
            <ViewDetails v-if="showModal" :content="infoModal.content" :items="cartItems"></ViewDetails>
        </b-modal>

        <div class="row justify-content-end my-4">
            <b-col sm="5" md="3" class="my-1">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                ></b-pagination>
            </b-col>
        </div>
    </div>

</template>

<script>
import axios from '@/data/axios';
import urls from '@/data/urls';
import ViewDetails from './ViewDetails';

export default {
    name : 'booking-table',

    props : {
        status : {
            type : String
        }
    },

    data () {
        return {
            items     : [],
            cartItems : [],
            fields    : [
                { key : 'booking_id', label : 'Booking ID', sortable : true, sortDirection : 'desc', class : 'text-lg-center' },
                { key : 'student_name', label : 'Name', sortable : true, sortDirection : 'desc' },
                { key : 'created_at', label : 'Date', sortable : true, class : 'text-lg-center' },
                {
                    key               : 'email',
                    label             : 'Email',
                    sortable          : true,
                    sortByFormatted   : true,
                    filterByFormatted : true,
                    class             : 'text-lg-center'
                },
                { key : 'actions', label : 'Actions', class : 'text-lg-right' }
            ],
            totalRows     : 1,
            currentPage   : 1,
            perPage       : 5,
            pageOptions   : [5, 10, 15, { value : 100, text : 'Show a lot' }],
            sortBy        : '',
            sortDesc      : false,
            sortDirection : 'asc',
            filter        : null,
            filterOn      : [],
            infoModal     : {
                id      : this.status + '-' + 'view-details',
                title   : '',
                content : {}
            },
            showSendMailButton : true,
            showModal          : false
        };
    },

    components : { ViewDetails },

    mounted () {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.loadDetails();
    },

    methods : {
        loadDetails () {
            const that = this;
            axios.get(urls.admin.cart.bookings + '?status=' + that.status).then(function (response) {
                const json = response.data;
                that.items = json.data;
            });
        },

        info (item, index, button) {
            this.infoModal.title = 'Details';
            this.infoModal.content = item;
            this.loadItemDetails();
            this.showModal = true;
            this.$root.$emit('bv::show::modal', this.infoModal.id, button);
        },

        loadItemDetails () {
            const that = this;
            axios.get(urls.admin.cart.cartInfo + '?id=' + that.infoModal.content.id).then(function (response) {
                that.cartItems = response.data.data;
            }).catch(function () {
            });
        },

        sendMail (item) {
            const that = this;
            axios.form(urls.cart.sendMail, { id : item.id }).then(function (response) {
                const json = response.data;
                if (json.error === false) {
                    const position = that.items.indexOf(item);
                    that.items.splice(position, 1);
                }
            });
        },

        resetInfoModal () {
            this.infoModal.title = '';
            this.infoModal.content = '';
        },

        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        }
    }
};
</script>
