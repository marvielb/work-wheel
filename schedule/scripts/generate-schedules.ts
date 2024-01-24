import { catalogClient } from '@/lib/api';
import { Value } from '@sinclair/typebox/value';
import { schedulesCollection } from 'db';
import { Type as t } from '@sinclair/typebox';
import { shuttleScheduleSchema } from '@/schemas';

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
