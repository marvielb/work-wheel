import createClient from 'openapi-fetch';
import { paths as catalogPaths } from './api/catalog';
import { paths as keycloakPaths } from './api/keycloak';

export const catalogClient = createClient<catalogPaths>({
  baseUrl: Bun.env.CATALOG_SERVICE_URL,
  headers: {
    Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}`,
  },
});

export const keyCloakClient = createClient<keycloakPaths>({
  baseUrl: Bun.env.KEYCLOAK_BASE_URL,
});

export const getKeyCloakToken = async (): Promise<string> => {
  const realm = 'master';
  const clientId = 'admin-cli';
  const clientSecret = Bun.env.KEYCLOAK_CLIENT_SECRET;
  const username = Bun.env.KEYCLOAK_ADMIN_USERNAME;
  const password = Bun.env.KEYCLOAK_ADMIN_PASSWORD;

  // Step 1: Get Access Token
  const tokenEndpoint = `${Bun.env.KEYCLOAK_BASE_URL}/realms/${realm}/protocol/openid-connect/token`;
  const tokenRequestBody = `username=${username}&password=${password}&grant_type=password`;
  const tokenRequestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
  };

  const getTokenOptions: RequestInit = {
    method: 'POST',
    body: tokenRequestBody,
    headers: tokenRequestHeaders,
  };

  return (await (await fetch(tokenEndpoint, getTokenOptions)).json()).access_token;
};
