const Koa = require("koa");
const Router = require("koa-router");
const Logger = require("koa-logger");
const {createRandomNumber} = require("./lib/random");
const app = new Koa();
const router = new Router();

let passCode = createRandomNumber(10000, 100000);

router.get("/authenticate", (ctx, next) => {
  passCode = createRandomNumber(10000, 100000);
  ctx.body = {
    status: 'success',
    code: passCode
  };
  next();
});

router.get("/certify", (ctx, next) => {
  const {type, code} = ctx.query;
  if(type === "local") {
    ctx.body = {
      status: Number.parseInt(code) === passCode ? "success" : "fail"
    };
  }
  passCode = createRandomNumber(10000, 100000);
  next();
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
