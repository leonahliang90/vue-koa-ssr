// 服务端
import createApp from './main'

// 服务端需要调用当前这个文件产生一个vue的实例
export default (context) => {
    // 涉及到异步组件 所以写成promise
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp() // 获得服务端实例,每次产生一个新的实例
        router.push(context.url) // 服务端进行路由跳转
        router.onReady(() => {
            // 获取当前路由匹配到的组件
            const matchs = router.getMatchedComponents()
            if (!matchs.length) { // 如果没有匹配组件
                reject({ code: 404 })
            }
            Promise.all(matchs.map(component => {
                if (component.asyncData) { // 如果组件有asyncData 执行
                    return component.asyncData(store)
                }
            })).then(() => { // 每个组件的asyncData都执行玩才渲染
                context.state = store.state // 把vuex中的状态挂载到上下文中(会将状态挂到window上)
                resolve(app) 
            })
        }, reject)
    })
}
