const Layout = () => import('@/layout/CustomerDashboard');

export default {
    path      : '/',
    name      : 'DashboardLayout',
    redirect  : '/products/',
    component : Layout,
    children  : [
        {
            path      : '/home/',
            name      : 'Home',
            component : () => import('@/views/HomeView.vue')
        },
        {
            path      : '/about/',
            name      : 'about',
            component : () => import('@/views/AboutView.vue')
        },
        {
            path      : '/terms/',
            name      : 'terms',
            component : () => import('@/views/TermsView.vue')
        },
        {
            path      : '/contact/',
            name      : 'contact',
            component : () => import('@/views/ContactView.vue')
        },
        {
            path      : '/policy/',
            name      : 'policy',
            component : () => import('@/views/PolicyView.vue')
        },
        {
            path      : '/products/',
            name      : 'products',
            component : () => import('@/views/website/products/ProductList.vue')
        },
        {
            path      : '/product/:id/add-cart/',
            name      : 'products-add-cart',
            component : () => import('@/views/website/products/AddToCart')
        },
        {
            path      : '/cart/',
            name      : 'cart',
            component : () => import('@/views/website/cart/CartList')
        },
        {
            path      : '/checkout/',
            name      : 'checkout',
            component : () => import('@/views/website/check-out/CheckOut')
        },
        {
            path      : '/cart/:id/checkout-details/',
            name      : 'checkout-details',
            component : () => import('@/views/website/check-out/CheckoutDetails')
        }
    ],
};
