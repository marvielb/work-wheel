import createClient from 'openapi-fetch';
import { paths as catalogPaths } from './api/catalog';

export const catalogClient = createClient<catalogPaths>({
  baseUrl: Bun.env.CATALOG_SERVICE_URL,
});
