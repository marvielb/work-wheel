import { catalogClient, getKeyCloakToken, keyCloakClient } from '@/lib/api';
import { Value } from '@sinclair/typebox/value';
import { schedulesCollection } from 'db';
import { Type as t } from '@sinclair/typebox';
import { shuttleScheduleSchema } from '@/schemas';

const insertShuttleScheduleSchema = t.Omit(shuttleScheduleSchema, ['_id']);

const accessToken = await getKeyCloakToken();

const { data: shuttles } = await catalogClient.GET('/service/shuttles');
const { data: times } = await catalogClient.GET('/service/time-departures');
const { data: locations } = await catalogClient.GET('/service/locations');
const { data: drivers } = await keyCloakClient.GET('/admin/realms/{realm}/groups/{id}/members', {
  params: { path: { realm: 'work-wheel', id: Bun.env.KEYCLOAK_DRIVERS_GROUP_ID || '' } },
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

console.log('drivers:');
console.log(drivers);

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
        date: now,
        shuttle: shuttle,
        time_departure: time,
        from_location: locations?.find((location) => location.id === routeStartID),
        to_location: locations?.find((location) => location.id === routeEndID),
        driver: drivers?.find((driver) => driver.id === shuttle.driver_id),
      });
      Value.Clean(insertShuttleScheduleSchema, schedule);
      return schedule;
    });
    return schedules ? schedulesCollection.insertMany(schedules) : undefined;
  })
  .filter((promise) => !!promise);

const result = await Promise.allSettled(inserts!);
const indexFields = { date: 1, time_departure_id: 1, from_location_id: 1, to_location_id: 1 };
await schedulesCollection.createIndex(indexFields);

console.log(result);

process.exit();
