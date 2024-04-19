import { AppRouter } from '@/server/routers';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { transformer } from '@/utils/transformer';
import { createTRPCReact, httpBatchLink, inferReactQueryProcedureOptions, loggerLink } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    // loggerLink({
    //   enabled: () => true,
    // }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
  transformer,
})
