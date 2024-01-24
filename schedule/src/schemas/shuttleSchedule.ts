import { Type as t } from '@sinclair/typebox';
import { shuttleSchema } from './shuttle';
import { timeDeparture } from './timeDeparture';
import { location } from './location';

export const shuttleScheduleSchema = t.Object({
  id: t.String(),
  shuttle_id: t.Number(),
  time_departure_id: t.Number(),
  from_location_id: t.Number(),
  to_location_id: t.Number(),
  reservation_date: t.Date(),
  shuttle: shuttleSchema,
  time_departure: timeDeparture,
  from_location: location,
  to_location: location,
});
