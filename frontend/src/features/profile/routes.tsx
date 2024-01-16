import { rootRoute } from '@/routes';
import { Route } from '@tanstack/react-router';
import { useAuth } from 'react-oidc-context';

export const profileRoutes = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: function Index() {
    const auth = useAuth();
    const signOut = async () => {
      await auth.signoutSilent({ silentRequestTimeoutInSeconds: 1 });
    };
    return (
      <button className="btn btn-primary" onClick={signOut}>
        Logout
      </button>
    );
  },
});
