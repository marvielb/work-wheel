import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import timeDeparture from './features/time-departure';

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(timeDeparture)
  .get('/health_check', () => '')
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
