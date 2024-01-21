import db from 'db';
import { Elysia, t } from 'elysia';

const locationDTO = t.Object(
  {
    id: t.Number(),
    name: t.String(),
    abbreviation: t.String(),
  },
  { description: 'Pick up location' }
);

const locations = new Elysia()
  .decorate('db', db)
  .model({
    location: locationDTO,
    locationList: t.Array(locationDTO),
  })
  .get('/locations', ({ db }) => db.selectFrom('locations').selectAll().execute(), {
    response: 'locationList',
    detail: {
      description: 'Lists all of available locations',
    },
  });

export default locations;
