import ShuttleSearchForm from '../components/ShuttleSearchForm';

const ShuttleSearchPage = () => {
  const data = [0, 1, 2, 3, 4, 5];
  return (
    <div className="flex justify-center ">
      <div className="max-w-lg max-h-[calc(100vh-4rem)]">
        <ShuttleSearchForm />
        <h2 className="font-bold text-lg text-left mt-7">Available Shuttles</h2>
        <div className="flex flex-col gap-5 overflow-y-auto h-[calc(100%-21rem)]">
          {data.map((i) => {
            return (
              <div key={i} className="card card-side bg-base-100 shadow-xl text-left">
                <figure>
                  <img
                    src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <p>Click the button to watch on Jetflix app.</p>
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
