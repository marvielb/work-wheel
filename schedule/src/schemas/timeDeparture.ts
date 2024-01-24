import { Type as t } from '@sinclair/typebox';

export const timeDeparture = t.Object(
  {
    id: t.Number(),
    time: t.String(),
  },
  { description: 'Time Departures' }
);
