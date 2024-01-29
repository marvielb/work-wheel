import cors from '@elysiajs/cors';
import { schedulesCollection } from 'db';
import { Elysia, t } from 'elysia';
import { Value } from '@sinclair/typebox/value';
import { shuttleScheduleSchema } from './schemas';
import swagger from '@elysiajs/swagger';

const schedulesQuerySchema = t.Object({
  time_departure: t.Numeric(),
  from_location: t.Numeric(),
  to_location: t.Numeric(),
});

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .model({
    schedulesQuery: schedulesQuerySchema,
    schedules: t.Array(shuttleScheduleSchema),
  })
  .get('/health_check', () => '')
  .get(
    '/schedules',
    async ({ query }) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const schedules = Value.Encode(
        t.Array(shuttleScheduleSchema),
        await schedulesCollection
          .find({
            date: { $eq: now },
            time_departure_id: { $eq: query.time_departure },
            from_location_id: { $eq: query.from_location },
            to_location_id: { $eq: query.to_location },
          })
          .toArray()
      );
      Value.Clean(t.Array(shuttleScheduleSchema), schedules);
      return schedules;
    },
    {
      query: 'schedulesQuery',
      response: 'schedules',
    }
  )
  .listen(3002);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
