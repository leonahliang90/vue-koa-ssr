import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default () => {
  // 写成函数的写法 每次创建新的路由
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Index',
        component: () => import('./components/pages/Checkout.vue'),
      },
    ],
  });
  return router;
};
