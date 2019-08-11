import Vue from 'vue';
import Router from 'vue-router';
import Review from './views/Review.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Review',
      component: Review,
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('./components/LoginForm.vue'),
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import('./components/RegisterForm.vue'),
        },
      ],
    },
  ],
});
