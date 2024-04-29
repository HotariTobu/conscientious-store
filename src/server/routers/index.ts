/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { dashboardRouter } from './dashboard';
import { itemRouter } from './item';
import { productRouter } from './product';
import { shareRouter } from './share';
import { shareholderRouter } from './shareholder';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  product: productRouter,
  item: itemRouter,
  shareholder: shareholderRouter,
  share: shareRouter,

  dashboard: dashboardRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
