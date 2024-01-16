import { rootRoute } from '@/routes';
import { Route } from '@tanstack/react-router';

export const searchRoutes = new Route({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: function Index() {
    return <span>This is search!</span>;
  },
});
