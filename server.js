const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const static = require('koa-static');
const VueServerRender = require('vue-server-renderer'); // 这个包可以渲染vue实例

// const ServerBundle = fs.readFileSync('./dist/serverbundle.js', 'utf8')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8');
const ServerBundle = require('./dist/vue-ssr-server-bundle');
const clientManifest = require('./dist/vue-ssr-client-manifest'); // 渲染的时候可以找到客户端的js文件自动引入到html中

// ServerBundle.files['serverbundle.js'] = ServerBundle.files['serverbundle.js'].replace('MY SIDE BY SIDE SDN. BHD.', 'ABC123');

// createBundleRenderer 渲染打包后的结果
const render = VueServerRender.createBundleRenderer(ServerBundle, {
  template,
  clientManifest,
}); // 创建一个渲染器
const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  // ctx.body = await render.renderToString()
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString({ url: '/' }, (err, data) => {
      // console.log('data', data);
      if (err) reject(err);
      // resolve(data.replace('MY SIDE BY SIDE SDN. BHD.', 'ABC123'));
    });
  });
});

app.use(router.routes());
app.use(static(path.resolve(__dirname, 'dist')));
// app.use(async (ctx) => {
//   try {
//     ctx.body = await new Promise((resolve, reject) => {
//       // 如果服务器没有此路径 会渲染当前的app.vue
//       render.renderToString({ url: ctx.url }, (err, data) => {
//         console.log('err', err);
//         if (err) reject(err);
//         resolve(data);
//       });
//     });
//   } catch (e) {
//     console.log('asdbbbb,404');
//     // 路由没有匹配到组件 返回404
//     ctx.body = '404';
//   }
// });
app.listen(3000, () => {
  console.log('server start');
});
