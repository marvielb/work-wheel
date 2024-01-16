import { Link, Outlet } from '@tanstack/react-router';
import CarIcon from './icons/CarIcon';
import HistoryIcon from './icons/HistoryIcon';
import SearchIcon from './icons/SearchIcon';
import { ReactElement, useEffect } from 'react';
import { bookingRoutes } from '@/features/bookings/routes';
import { searchRoutes } from '@/features/search/routes';
import { historyRoutes } from '@/features/history/routes';
import { useAuth } from 'react-oidc-context';
import PersonIcon from './icons/PersonIcon';
import { profileRoutes } from '@/features/profile/routes';

interface LayoutData {
  label: string;
  icon: ReactElement;
  path: string;
}

export const MainLayout = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoading || auth.isAuthenticated) {
      return;
    }
    auth.signinRedirect();
  }, [auth]);

  const layoutData: Array<LayoutData> = [
    {
      label: 'Bookings',
      icon: <CarIcon />,
      path: bookingRoutes.fullPath,
    },
    {
      label: 'Search',
      icon: <SearchIcon />,
      path: searchRoutes.fullPath,
    },
    {
      label: 'History',
      icon: <HistoryIcon />,
      path: historyRoutes.fullPath,
    },
    {
      label: 'Profile',
      icon: <PersonIcon />,
      path: profileRoutes.fullPath,
    },
  ];

  return (
    <>
      <div className="p-4">
        <Outlet />
      </div>
      <div className="btm-nav  shadow-2xl">
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
