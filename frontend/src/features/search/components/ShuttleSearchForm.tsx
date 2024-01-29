import { useQuery } from '@tanstack/react-query';
import fetchTimeDepartures from '../api/fetchTimeSlots';
import fetchLocations from '../api/fetchLocations';
import { Type, type Static } from '@sinclair/typebox';
import { useForm } from 'react-hook-form';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { useEffect } from 'react';

const shuttleSearchSchema = Type.Object({
  time_departure_id: Type.String(),
  from_location_id: Type.String(),
  to_location_id: Type.String(),
});

export interface ShuttleSearchFormProps {
  onSubmit: (data: Static<typeof shuttleSearchSchema>) => void;
}

const ShuttleSearchForm = (props: ShuttleSearchFormProps) => {
  const timeDepartures = useQuery({ queryKey: ['timeDepartures'], queryFn: fetchTimeDepartures });
  const locations = useQuery({ queryKey: ['locations'], queryFn: fetchLocations });
  const { register, handleSubmit, setValue } = useForm<Static<typeof shuttleSearchSchema>>({
    resolver: typeboxResolver(shuttleSearchSchema),
  });

  useEffect(() => {
    setValue(
      'time_departure_id',
      timeDepartures.data?.find((_, i) => i === 0)?.id.toString() || ''
    );
    setValue('from_location_id', locations.data?.find((_, i) => i === 0)?.id.toString() || '');
    setValue('to_location_id', locations.data?.find((_, i) => i === 1)?.id.toString() || '');
  }, [timeDepartures.data, locations.data, setValue]);

  return (
    <form onSubmit={handleSubmit((d) => props.onSubmit(d))}>
      <label className="form-control">
        <div className="label">
          <span className="label-text font-bold">Departure Time</span>
        </div>
        <select {...register('time_departure_id')} className="select select-bordered shadow-lg">
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
          <select {...register('from_location_id')} className="select select-bordered shadow-lg">
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
          <select {...register('to_location_id')} className="select select-bordered shadow-lg">
            {locations.data?.map((location) => (
              <option key={`location-to-${location.id}`} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        disabled={timeDepartures.isLoading || locations.isLoading}
        className="btn btn-primary w-full mt-6"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default ShuttleSearchForm;
