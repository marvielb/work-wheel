import { schedulesClient } from '@/lib/api';

const fetchSchedules = async (
  token: string,
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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return schedules;
};

export default fetchSchedules;
