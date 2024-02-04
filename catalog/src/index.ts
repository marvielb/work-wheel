import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import timeDeparture from './features/time-departure';
import locations from './features/locations';
import shuttle from './features/shuttles';
import auth from './plugins/auth';
import { basicAuth } from 'elysia-basic-auth';

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .group('', (app) => app.use(auth).use(timeDeparture).use(locations).use(shuttle))
  .group('/service', (app) =>
    app
      .use(
        basicAuth({
          users: [{ username: 'admin', password: 'admin' }],
          realm: '',
        })
      )
      .use(timeDeparture)
      .use(locations)
      .use(shuttle)
  )
  .get('/health_check', () => '')
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
