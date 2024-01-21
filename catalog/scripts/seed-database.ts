import db from '../db';

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
