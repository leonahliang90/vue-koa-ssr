<template>
    <div @click="click">bar{{ $store.state.name }}</div>
</template>

<script>
    export default {
        methods: {
            click() {
                alert(1)
            }
        },
        asyncData(store) { // 这个方法只有在服务器端执行 并且只有页面组件才有
            return store.dispatch('changeName')
        }
    }
</script>

<style scoped>
div {
    background: red;    
}
</style>