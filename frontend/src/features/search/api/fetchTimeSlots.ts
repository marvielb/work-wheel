import { catalogClient } from '@/lib/api';

const fetchTimeDepartures = async (token: string) => {
  const { data: timeDepartures } = await catalogClient.GET('/time-departures', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return timeDepartures?.map((departure) => ({
    ...departure,
    time: convert24HourTo12HourFormat(departure.time),
  }));
};

function convert24HourTo12HourFormat(inputTime: string): string {
  const [hours, minutes] = inputTime.split(':').map(Number);
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const period = hours < 12 ? 'AM' : 'PM';

  return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

export default fetchTimeDepartures;
