import fetchKeyclockPublicKey from '@/lib/fetchKeycloakPublicKey';
import bearer from '@elysiajs/bearer';
import Elysia from 'elysia';
import { importJWK } from 'jose';
import { jwtVerify } from 'jose';

const jwtPublicKey = await fetchKeyclockPublicKey();
const parsedPublicKey = await importJWK(jwtPublicKey);

const auth = new Elysia()
  .use(bearer())
  .decorate({ parsedPublicKey })
  .onBeforeHandle(async ({ bearer, set, parsedPublicKey }) => {
    if (!bearer) {
      set.status = 400;
      return 'Unauthorized';
    }

    try {
      await jwtVerify(bearer, parsedPublicKey, {
        algorithms: ['RS256'],
      });
    } catch {
      set.status = 400;
      return 'Unauthorized';
    }
  });

export default auth;
