import { prisma } from '@/lib/prisma';
import { router, publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
import { shareholderAddSchema, shareholderByIdSchema, shareholderListSchema } from './schemas';

export const shareholderRouter = router({
  list: publicProcedure
    .input(shareholderListSchema)
    .query(async ({ input }) => {
      const { limit, cursor } = input;

      const shareholders = await prisma.shareholder.findMany({
        take: limit + 1,
        ...(cursor === null ? {} : {
          cursor: {
            id: cursor
          }
        })
      })
      const nextCursor = shareholders.at(limit)?.id

      return {
        shareholders,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(shareholderByIdSchema)
    .query(async ({ input }) => {
      const shareholder = await prisma.shareholder.findUnique({
        where: input,
      });

      if (shareholder === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No shareholder with id '${input.id}'`,
        });
      }

      return shareholder;
    }),
  add: publicProcedure
    .input(shareholderAddSchema)
    .mutation(async ({ input }) => {
      const shareholder = await prisma.shareholder.create({
        data: input,
      });

      return shareholder;
    }),
});
