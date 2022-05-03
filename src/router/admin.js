import guards from './guards';
const Layout = () => import('@/layout/AdminDashboardLayout');

export default {
    path        : '/admin/',
    name        : 'DashboardLayout',
    redirect    : 'admin/purchase-entry/',
    component   : Layout,
    beforeEnter : guards.loggedInGuard,
    children    : [
        {
            path      : 'purchase-entry/',
            name      : 'Home',
            component : () => import('@/views/admin/purchase-entry/PurchaseEntry')
        },
        {
            path      : 'change-password/',
            name      : 'Home',
            component : () => import('@/views/admin/authentication/ChangePassword.vue')
        },
        {
            path      : 'product-home/',
            name      : 'product-home',
            component : () => import('@/views/admin/product/ProductHome')
        },
        {
            path      : 'orders/',
            name      : 'orders',
            component : () => import('@/views/admin/orders/OrderList')
        }
    ],
};

