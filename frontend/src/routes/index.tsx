import { MainLayout } from '@/components/Layout';
import { bookingRoutes } from '@/features/bookings/routes';
import { historyRoutes } from '@/features/history/routes';
import { profileRoutes } from '@/features/profile/routes';
import { searchRoutes } from '@/features/search/routes';
import { RootRoute, Router } from '@tanstack/react-router';

export const rootRoute = new RootRoute({
  component: MainLayout,
});

const routeTree = rootRoute.addChildren([
  bookingRoutes,
  searchRoutes,
  historyRoutes,
  profileRoutes,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
