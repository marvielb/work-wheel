import { useQuery } from '@tanstack/react-query';
import fetchTimeDepartures from '../api/fetchTimeSlots';

const ShuttleSearchForm = () => {
  const timeDepartures = useQuery({ queryKey: ['timeDepartures'], queryFn: fetchTimeDepartures });
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
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label className="form-control w-full flex-shrink">
          <div className="label font-bold">
            <span className="label-text ">To</span>
          </div>
          <select className="select select-bordered shadow-lg">
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
      </div>
      <button className="btn btn-primary w-full mt-6">Search</button>
    </div>
  );
};

export default ShuttleSearchForm;
