import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(cors())
  .get("/health_check", () => "")
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
