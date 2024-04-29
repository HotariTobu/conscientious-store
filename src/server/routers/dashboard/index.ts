import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "@/server/trpc";

export const dashboardRouter = router({
  overview: publicProcedure
    .query(async () => {
      const products = await prisma.product.findMany({
        include: {
          items: true,
        }
      })

      const shareholders = await prisma.shareholder.findMany({
        include: {
          shares: true,
        }
      })

      const accountTitlesByProduct = products
        .map(product => {
          const purchases = product.items
            .reduce((subtotal, { purchasePrice }) => (
              subtotal + purchasePrice
            ), 0)
          const sales = product.items
            .filter(({ deletedAt }) => deletedAt !== null)
            .reduce((subtotal, { salePrice }) => (
              subtotal + salePrice
            ), 0)
          const profits = sales - purchases
          return {
            product,
            purchases,
            sales,
            profits,
          }
        })

      const purchases = accountTitlesByProduct
        .reduce((total, { purchases }) => (
          total + purchases
        ), 0)

      const sales = accountTitlesByProduct
        .reduce((total, { sales }) => (
          total + sales
        ), 0)

      const profits = sales - purchases

      const liabilitiesByShareholder = shareholders
        .map(shareholder => ({
          shareholder,
          liabilities: shareholder.shares
            .reduce((subtotal, { quote, count }) => (
              subtotal + quote * count
            ), 0)
        }))

      const liabilities = liabilitiesByShareholder
        .reduce((total, { liabilities }) => (
          total + liabilities
        ), 0)

      const drawer = liabilities + profits

      return {
        drawer,
        purchases,
        sales,
        profits,
        liabilities,
        accountTitlesByProduct,
        liabilitiesByShareholder,
      }
    })
})
