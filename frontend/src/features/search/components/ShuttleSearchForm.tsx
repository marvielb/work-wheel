const ShuttleSearchForm = () => {
  return (
    <div>
      <label className="form-control">
        <select defaultValue={undefined} className="select select-bordered shadow-lg">
          <option value={undefined} disabled selected>
            Time Slot
          </option>
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
