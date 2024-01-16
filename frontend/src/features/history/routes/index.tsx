import { rootRoute } from '@/routes';
import { Route } from '@tanstack/react-router';

export const historyRoutes = new Route({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: function Index() {
    return <span>This is history!</span>;
  },
});
