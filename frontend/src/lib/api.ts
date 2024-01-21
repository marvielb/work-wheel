import createClient from 'openapi-fetch';
import { paths as catalogPaths } from './api/catalog';

export const catalogClient = createClient<catalogPaths>({
  baseUrl: import.meta.env.VITE_CATALOG_SERVICE_URL,
});
