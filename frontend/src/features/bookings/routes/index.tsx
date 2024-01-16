import { rootRoute } from '@/routes';
import { Route } from '@tanstack/react-router';

export const bookingRoutes = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return <span>This is bookings!</span>;
  },
});
