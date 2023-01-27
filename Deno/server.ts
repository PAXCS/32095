import { Application } from "./deps.ts";
import router from "./routes/index.ts";
const PORT = 8080;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) =>{
  ctx.response.body = "API Restful con Deno OaK!"
})

app.listen({port: PORT})

console.log(`Servidor corriendo en el puerto ${PORT}`)