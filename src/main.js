import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from './store'

// 入口文件 提供vue实例 为了保证每次导出的实例不一样 应该为函数
export default () => {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
