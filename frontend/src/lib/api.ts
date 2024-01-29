import createClient from 'openapi-fetch';
import { paths as catalogPaths } from './api/catalog';
import { paths as schedulePaths } from './api/schedule';

export const catalogClient = createClient<catalogPaths>({
  baseUrl: import.meta.env.VITE_CATALOG_SERVICE_URL,
});

export const schedulesClient = createClient<schedulePaths>({
  baseUrl: import.meta.env.VITE_SCHEDULE_SERVICE_URL,
});
