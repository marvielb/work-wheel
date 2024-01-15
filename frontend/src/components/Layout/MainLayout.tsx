import CarIcon from "./icons/CarIcon";
import HistoryIcon from "./icons/HistoryIcon";
import SearchIcon from "./icons/SearchIcon";

export const MainLayout = () => {
  return (
    <div className="btm-nav btm-nav-lg">
      <button>
        <CarIcon />
        <span className="btm-nav-label">Bookings</span>
      </button>
      <button className="active">
        <SearchIcon />
        <span className="btm-nav-label">Search</span>
      </button>

      <button>
        <HistoryIcon />
        <span className="btm-nav-label">History</span>
      </button>
    </div>
  );
};
