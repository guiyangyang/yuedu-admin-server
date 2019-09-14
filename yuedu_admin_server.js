

(async function () {
  const Koa = require('koa');
  const KoaStaticCache = require('koa-static-cache');
  const KoaBodyParser = require('koa-bodyparser');
  const KoaJwt = require('koa-jwt');
  const router = require('./routers/index');
  // const routerCommon = require('./routers/common');

  const app = new Koa();

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
  })

  app.use(KoaBodyParser());

  app.use(KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true
  }));

  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 200;
        return ctx.body = {
          code: 401,
          data: {
            message: '未授权，访问被拒绝'
          }
        };
      } else {
        throw err;
      }
    })
  })
  app.use(KoaJwt({
    secret: 'DQESJLGLEOCFFLCJAHBLJMHMJVDMEJIHEBHZFEBU'
  }).unless({
    path: [/^\/yuedu/, /^\/static/]
  }))
  // app.use('/common', routerCommon.routes());
  app.use(router.routes());



  app.listen(8081);

})()