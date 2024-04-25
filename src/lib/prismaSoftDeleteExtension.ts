import { Prisma } from "@prisma/client"
import { z } from "zod"

export const prismaSoftDeleteExtension = Prisma.defineExtension(client =>
  client.$extends({
    query: {
      $allModels: {
        delete: async ({ model, args, query }) => {
          const { where } = args
          const modelKey = model.toLowerCase()

          const clientSchema = z.object({
            [modelKey]: z.object({
              update: z.function()
            })
          })

          const parseResult = clientSchema.safeParse(client)
          if (parseResult.success) {
            return parseResult.data[modelKey].update({
              where,
              data: {
                deletedAt: new Date(),
              },
            })
          }
          else {
            return query(args)
          }
        },
        deleteMany: async ({ model, args, query }) => {
          const { where } = args
          const modelKey = model.toLowerCase()

          const clientSchema = z.object({
            [modelKey]: z.object({
              updateMany: z.function()
            })
          })

          const parseResult = clientSchema.safeParse(client)
          if (parseResult.success) {
            return parseResult.data[modelKey].updateMany({
              where,
              data: {
                deletedAt: new Date(),
              },
            })
          }
          else {
            return query(args)
          }
        },
      }
    }
  })
)
