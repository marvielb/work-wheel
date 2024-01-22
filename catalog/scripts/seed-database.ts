import db from 'db';

await db
  .insertInto('time_departures')
  .values(generateTimeIntervals().map((v) => ({ time: v })))
  .execute();

await db
  .insertInto('locations')
  .values([
    { name: 'Manila', abbreviation: 'MNL' },
    { name: 'Quezon City', abbreviation: 'QC' },
    { name: 'Makati City', abbreviation: 'MKA' },
    { name: 'Taguig City', abbreviation: 'TAG' },
    { name: 'Pasig City', abbreviation: 'PSG' },
  ])
  .execute();

await db
  .insertInto('shuttles')
  .values([
    {
      driver_id: '3942e616-fbc9-4866-8e2a-137599c6cc48',
      model_name: 'Mitsubishi L300',
      plate_number: 'XCV-123',
      capacity: 16,
      image_url:
        'https://www.mitsubishi-motors.com.ph/content/dam/mitsubishi-motors-ph/images/cars/l300/2020/primary/exterior/20l300-01/W50_135_20SL-Front-R.png',
      route_start_location_id: 1,
      route_end_location_id: 2,
    },
  ])
  .execute();

function generateTimeIntervals(): string[] {
  const intervals: string[] = [];
  let currentTime = new Date();
  currentTime.setHours(8, 0, 0, 0); // Set initial time to 8:00 AM

  const endTime = new Date();
  endTime.setHours(17, 30, 0, 0); // Set end time to 5:00 PM

  while (currentTime <= endTime) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    intervals.push(formattedTime);

    // Increment time by 30 minutes
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return intervals;
}
