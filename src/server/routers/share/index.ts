import { prisma } from '@/lib/prisma';
import { router, publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
import { shareAddSchema, shareByIdSchema, shareListSchema } from './schemas';

export const shareRouter = router({
  list: publicProcedure
    .input(shareListSchema)
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { shareholderId, cursor } = input;

      const shares = await prisma.share.findMany({
        where: { shareholderId },
        take: limit + 1,
        cursor,
      })
      const nextCursor = shareListSchema.shape.cursor.parse(shares.at(limit))

      return {
        shares,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(shareByIdSchema)
    .query(async ({ input }) => {
      const share = await prisma.share.findUnique({
        where: input,
      });

      if (share === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No share with id '${input.id}'`,
        });
      }

      return share;
    }),
  add: publicProcedure
    .input(shareAddSchema)
    .mutation(async ({ input }) => {
      const share = await prisma.share.create({
        data: input,
      });

      return share;
    }),
});
