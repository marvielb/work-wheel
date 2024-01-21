import { useQuery } from '@tanstack/react-query';
import fetchTimeDepartures from '../api/fetchTimeSlots';
import fetchLocations from '../api/fetchLocations';

const ShuttleSearchForm = () => {
  const timeDepartures = useQuery({ queryKey: ['timeDepartures'], queryFn: fetchTimeDepartures });
  const locations = useQuery({ queryKey: ['locations'], queryFn: fetchLocations });
  return (
    <div>
      <label className="form-control">
        <div className="label">
          <span className="label-text font-bold">Departure Time</span>
        </div>
        <select className="select select-bordered shadow-lg">
          {timeDepartures.data?.map((time) => (
            <option key={`time-departure-${time.id}`} value={time.id}>
              {time.time}
            </option>
          ))}
        </select>
      </label>
      <div className="flex gap-2 mt-2">
        <label className="form-control w-full flex-shrink">
          <div className="label">
            <span className="label-text font-bold">From</span>
          </div>
          <select className="select select-bordered shadow-lg">
            {locations.data?.map((location) => (
              <option key={`location-from-${location.id}`} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-full flex-shrink">
          <div className="label font-bold">
            <span className="label-text ">To</span>
          </div>
          <select className="select select-bordered shadow-lg">
            {locations.data?.map((location) => (
              <option key={`location-to-${location.id}`} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn btn-primary w-full mt-6">Search</button>
    </div>
  );
};

export default ShuttleSearchForm;
