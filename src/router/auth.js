// const Layout = () => import('@/layout/AuthLayout');
const Login = () => import('@/views/admin/authentication/LoginView');

export default {
    path      : '/admin/login/',
    name      : 'AdminPages',
    component : Login
};
