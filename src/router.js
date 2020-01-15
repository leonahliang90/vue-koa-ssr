import Vue from 'vue'
import VueRouter from 'vue-router'
import Bar from './components/Bar.vue'

Vue.use(VueRouter)

export default () => { // 写成函数的写法 每次创建新的路由
    const router = new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Bar
            },
            {
                path: '/foo',
                component: () => import('./components/Foo.vue')
            }
        ]
    })
    return router
}