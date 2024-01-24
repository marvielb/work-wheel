import { catalogClient } from '@/lib/api';
import { Type as t } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { schedulesCollection } from 'db';

const shuttleSchema = t.Object(
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

const shuttleScheduleSchema = t.Object({
  id: t.String(),
  shuttle_id: t.Number(),
  time_departure_id: t.Number(),
  from_location_id: t.Number(),
  to_location_id: t.Number(),
  reservation_date: t.Date(),
  shuttle: shuttleSchema,
  time_departure: t.Any(),
  from_location: t.Any(),
  to_location: t.Any(),
});

const insertShuttleScheduleSchema = t.Omit(shuttleScheduleSchema, ['id']);

const { data: shuttles } = await catalogClient.GET('/shuttles');
const { data: times } = await catalogClient.GET('/time-departures');
const { data: locations } = await catalogClient.GET('/locations');

const now = new Date();
now.setHours(0, 0, 0, 0);

const inserts = shuttles
  ?.map((shuttle) => {
    const schedules = times?.map((time, i) => {
      const route = [shuttle.route_start_location_id, shuttle.route_end_location_id];
      const routeStartID = route[i % 2];
      const routeEndID = route[(i + 1) % 2];
      const schedule = Value.Encode(insertShuttleScheduleSchema, {
        shuttle_id: shuttle.id,
        time_departure_id: time.id,
        from_location_id: routeStartID,
        to_location_id: routeEndID,
        reservation_date: now,
        shuttle: shuttle,
        time_departure: time,
        from_location: locations?.find((location) => location.id === routeStartID),
        to_location: locations?.find((location) => location.id === routeEndID),
      });
      return schedule;
    });
    return schedules ? schedulesCollection.insertMany(schedules) : undefined;
  })
  .filter((promise) => !!promise);

const result = await Promise.allSettled(inserts!);
console.log(result);

process.exit();
