import { schedulesClient } from '@/lib/api';

const fetchSchedules = async (
  timeDepatureId: number,
  fromLocationId: number,
  toLocationId: number
) => {
  const { data: schedules } = await schedulesClient.GET('/schedules', {
    params: {
      query: {
        time_departure: timeDepatureId,
        from_location: fromLocationId,
        to_location: toLocationId,
      },
    },
  });
  return schedules;
};

export default fetchSchedules;
