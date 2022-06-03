
const baseUrl = '/';
const subBaseUrl = 'store-management/';
const authBaseUrl = 'auth/';
const cartBaseUrl = 'cart/';
const shopBaseUrl = 'shop/';

export default {
    baseUrl,

    auth : {
        status         : baseUrl + authBaseUrl + 'status/',
        login          : baseUrl + authBaseUrl + 'login/',
        logout         : baseUrl + authBaseUrl + 'logout/',
        changePassword : baseUrl + authBaseUrl + 'change-password//',
    },

    shop : {
        openStore        : baseUrl + shopBaseUrl + 'open-store/',
        checkOpen        : baseUrl + shopBaseUrl + 'check-open-store/',
        checkOpenForUser : baseUrl + shopBaseUrl + 'check-open-store-user/'
    },

    admin : {

        category : {
            addEdit : baseUrl + subBaseUrl + 'category/add-edit/',
            delete  : baseUrl + subBaseUrl + 'category/delete/',
            list    : baseUrl + subBaseUrl + 'category/list/',
            options : baseUrl + subBaseUrl + 'category/options/'
        },

        product : {
            addEdit : baseUrl + subBaseUrl + 'product/add-edit/',
            delete  : baseUrl + subBaseUrl + 'product/delete/',
            list    : baseUrl + subBaseUrl + 'product/list/'
        },

        cart : {
            bookings : baseUrl + cartBaseUrl + 'all-bookings/',
            cartInfo : baseUrl + cartBaseUrl + 'cart-item-info/'
        },

        purchase : {
            getDetails    : baseUrl + cartBaseUrl + 'get-purchase-details/',
            purchaseOrder : baseUrl + cartBaseUrl + 'purchase-order/'
        }
    },

    user : {

        cart : {
            addCart      : baseUrl + cartBaseUrl + 'add-or-reduce-cart/',
            removeCart   : baseUrl + cartBaseUrl + 'remove-cart/',
            cartList     : baseUrl + cartBaseUrl + 'cart-item-info/',
            checkOutForm : baseUrl + cartBaseUrl + 'check-out-form/',
            checkOut     : baseUrl + cartBaseUrl + 'check-out/'
        },

        contactUs : baseUrl + authBaseUrl + 'contact-us/'
    }
};
