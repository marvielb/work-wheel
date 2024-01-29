import { useState } from 'react';
import ShuttleSearchForm from '../components/ShuttleSearchForm';
import { useQuery } from '@tanstack/react-query';
import fetchSchedules from '../api/fetchSchedules';

const ShuttleSearchPage = () => {
  const [shuttleSearchData, setShuttleSearchData] = useState<
    | {
        timeDepartureId: number;
        fromLocationId: number;
        toLocationId: number;
      }
    | undefined
  >(undefined);

  const shuttles = useQuery({
    queryKey: [
      'shuttles',
      shuttleSearchData,
      shuttleSearchData?.timeDepartureId,
      shuttleSearchData?.fromLocationId,
      shuttleSearchData?.toLocationId,
    ],
    queryFn: () => {
      return fetchSchedules(
        shuttleSearchData?.timeDepartureId || 0,
        shuttleSearchData?.fromLocationId || 0,
        shuttleSearchData?.toLocationId || 0
      );
    },
    enabled: !!shuttleSearchData,
  });

  return (
    <div className="flex justify-center ">
      <div className="w-full max-w-lg max-h-[calc(100vh-4rem)]">
        <ShuttleSearchForm
          onSubmit={(data) =>
            setShuttleSearchData({
              timeDepartureId: Number(data.time_departure_id),
              fromLocationId: Number(data.from_location_id),
              toLocationId: Number(data.to_location_id),
            })
          }
        />
        <h2 className="font-bold text-lg text-left mt-7">Available Shuttles</h2>
        <div className="flex flex-col gap-5 overflow-y-auto h-[calc(100vh-20rem)]">
          {shuttles.data?.map((sched) => {
            return (
              <div
                key={sched._id as string}
                className="card card-side bg-base-100 shadow-xl text-left"
              >
                <figure className="max-w-44 bg-neutral-800">
                  <img src={sched.shuttle.image_url} alt={sched.shuttle.model_name} />
                </figure>
                <div className="card-body">
                  <p>{sched.shuttle.model_name}</p>
                  <p>
                    {sched.driver.firstName} {sched.driver.lastName}
                  </p>
                  <p>Open Slots: {sched.shuttle.capacity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShuttleSearchPage;
