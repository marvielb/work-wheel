import db from 'db';
import Elysia, { t } from 'elysia';

const shuttleDTO = t.Object(
  {
    id: t.Number(),
    driver_id: t.String(),
    model_name: t.String(),
    plate_number: t.String(),
    capacity: t.Number(),
    image_url: t.String(),
    route_start_location_id: t.Number(),
    route_end_location_id: t.Number(),
  },
  { description: 'Shuttle Information' }
);

const createShuttleDTO = t.Omit(shuttleDTO, ['id']);
const createShuttleResultDTO = t.Union([shuttleDTO, t.String()]);

const shuttle = new Elysia()
  .decorate('db', db)
  .model({
    shuttle: shuttleDTO,
    shuttleList: t.Array(shuttleDTO),
    createShuttleDTO,
    createShuttleResultDTO,
  })
  .get('/shuttles', ({ db }) => db.selectFrom('shuttles').selectAll().execute(), {
    response: 'shuttleList',
    detail: {
      description: 'Lists all of available shuttles',
    },
  })
  .post(
    '/shuttles',
    async ({ body }) =>
      (await db.insertInto('shuttles').values([body]).returningAll().execute()).at(0) || '',
    {
      body: 'createShuttleDTO',
      response: 'createShuttleResultDTO',
      detail: {
        description: 'Create Shuttle',
      },
    }
  );

export default shuttle;
