import { rootRoute } from '@/routes';
import { Route } from '@tanstack/react-router';
import ShuttleSearchPage from './ShuttleSearchPage';

export const searchRoutes = new Route({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: ShuttleSearchPage,
});
