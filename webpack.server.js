const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServerRenderPlugin = require('vue-server-renderer/server-plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
    target: 'node', // 打包之后要给node使用
    entry: {
        server: resolve('./src/server-entry.js')
    },
    output: {
        libraryTarget: 'commonjs2' // 最终这个文件的导出的结果，放到module.exports上
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: resolve('./public/index-ssr.html'),
            excludeChunks: ['server'] //打包出来的html不引入server打包的js 因为要引入客户端打包出来的js
        }),
        new ServerRenderPlugin(), // 生成服务端映射
    ]
})