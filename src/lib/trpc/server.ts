import { createCaller } from "@/server/routers";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { httpBatchLink } from "@trpc/client";

export const trpc = createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
