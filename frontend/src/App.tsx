import { RouterProvider } from '@tanstack/react-router';
import './App.css';
import { router } from './routes';
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const oidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTH_URL,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider {...oidcConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
