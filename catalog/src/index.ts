import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import db from '../db';

const app = new Elysia()
  .use(cors())
  .get('/health_check', () => '')
  .decorate('db', db)
  .get('/time-departures', ({ db }) => db.selectFrom('time_departures').selectAll().execute())
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
