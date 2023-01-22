const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");

const { connection } = require("../config");
connection();

const productKoaRouter = require("../routes/KoaProducts");

app.use(koaBody());

app.use(productKoaRouter.routes());

app.use(async (ctx) => {
  ctx.body = "Server on with KOA";
});

app.listen(8081);