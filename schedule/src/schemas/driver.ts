import { Type as t } from '@sinclair/typebox';

export const driverSchema = t.Object(
  {
    id: t.String(),
    firstName: t.String(),
    lastName: t.String(),
  },
  { description: 'Driver' }
);
