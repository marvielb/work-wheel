import { Type as t } from '@sinclair/typebox';

export const location = t.Object(
  {
    id: t.Number(),
    name: t.String(),
    abbreviation: t.String(),
  },
  { description: 'Pick up location' }
);
