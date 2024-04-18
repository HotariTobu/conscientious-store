import { AppRouter } from '@/server/routers';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { transformer } from '@/utils/transformer';
import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
  transformer,
})
