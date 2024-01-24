import { Type as t } from '@sinclair/typebox';

export const shuttleSchema = t.Object(
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
