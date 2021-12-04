import { Router } from 'express';

/** Returns base router. */
export default (path: string, app: Router): Router => {
  const router = Router();

  app.use(path, router);

  return router;
};
