import { Link, Outlet } from "@tanstack/react-router";
import CarIcon from "./icons/CarIcon";
import HistoryIcon from "./icons/HistoryIcon";
import SearchIcon from "./icons/SearchIcon";
import { ReactElement } from "react";
import { bookingRoutes } from "@/features/bookings/routes";
import { searchRoutes } from "@/features/search/routes";
import { historyRoutes } from "@/features/history/routes";

interface LayoutData {
  label: string;
  icon: ReactElement;
  path: string;
}

export const MainLayout = () => {
  const layoutData: Array<LayoutData> = [
    {
      label: "Bookings",
      icon: <CarIcon />,
      path: bookingRoutes.fullPath,
    },
    {
      label: "Search",
      icon: <SearchIcon />,
      path: searchRoutes.fullPath,
    },
    {
      label: "History",
      icon: <HistoryIcon />,
      path: historyRoutes.fullPath,
    },
  ];

  return (
    <>
      <Outlet />
      <div className="btm-nav btm-nav-lg">
        {layoutData.map((data, i) => (
          <Link key={i} to={data.path}>
            {data.icon}
            <span className="btm-nav-label">{data.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
