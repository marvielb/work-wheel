import db from 'db';
import { Elysia, t } from 'elysia';

const timeDepartureDTO = t.Object(
  {
    id: t.Number(),
    time: t.String(),
  },
  { description: 'Time Departures' }
);

const timeDeparture = new Elysia()
  .decorate('db', db)
  .model({
    timeDeparture: timeDepartureDTO,
    timeDepartureList: t.Array(timeDepartureDTO),
  })
  .get('/time-departures', ({ db }) => db.selectFrom('time_departures').selectAll().execute(), {
    response: 'timeDepartureList',
    detail: {
      description: 'Lists all of available time departures',
    },
  });

export default timeDeparture;
