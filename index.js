const Koa = require("koa");
const Router = require("koa-router");
const Logger = require("koa-logger");
const {createRandomNumber} = require("./lib/random");
const app = new Koa();
const router = new Router();

router.get("/authenticate", (ctx, next) => {
  ctx.body = {
    status: 'success',
    code: createRandomNumber(10000, 100000),
  };
});
app
  .use(Logger())
  .use(router.routes())
  .use(router.allowedMethods());
const server = app.listen(9090);

process.on("SIGTERM", ()=>{
  server.close(() => {
    console.log("服务关闭");
  });
})
