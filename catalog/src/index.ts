import cors from '@elysiajs/cors';
import { Elysia, t } from 'elysia';
import db from '../db';
import swagger from '@elysiajs/swagger';

const timeDepartureDTO = t.Object(
  {
    id: t.Number(),
    time: t.String(),
  },
  { description: 'Time Departures' }
);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .model({
    timeDeparture: timeDepartureDTO,
    timeDepartureList: t.Array(timeDepartureDTO),
  })
  .get('/health_check', () => '')
  .decorate('db', db)
  .get('/time-departures', ({ db }) => db.selectFrom('time_departures').selectAll().execute(), {
    response: 'timeDepartureList',
    detail: {
      description: 'Lists all of available time departures',
    },
  })
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
