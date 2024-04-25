import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArchiveIcon, BackpackIcon, LightningBoltIcon, RocketIcon, StackIcon } from "@radix-ui/react-icons"
import { ShareholderList } from "./components/shareholder-list"
import { prisma } from "@/lib/prisma"
import { SquareImage } from "@/components/square-image"

export default async () => {
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

  return (
    <div className="gap-4 grid grid-cols-6">
      <div className="col-span-6 grid-cols-subgrid grid items-end">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className=" text-xl">引き出しのお金</CardTitle>
            <BackpackIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl">{drawer}円</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>仕入</CardTitle>
            <ArchiveIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{purchases}円</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>売上</CardTitle>
            <LightningBoltIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{sales}円</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>利益</CardTitle>
            <StackIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{profits}円</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>負債</CardTitle>
            <RocketIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{profits}円</div>
          </CardContent>
        </Card>
      </div>

      {accountTitlesByProduct.map(accountTitles => (
        <div className="col-span-5 grid grid-cols-subgrid" key={accountTitles.product.code}>
          <div className="col-span-2 flex">
            <img className="w-32 h-32 object-contain" src={accountTitles.product.image} />
            <div>{accountTitles.product.name}</div>
          </div>
          <div>{accountTitles.purchases}</div>
          <div>{accountTitles.sales}</div>
          <div>{accountTitles.profits}</div>
        </div>
      ))}

      <div className="grid-cols-subgrid grid">
        {liabilitiesByShareholder.map(liabilities => (
          <div className="flex items-center justify-between" key={liabilities.shareholder.id}>
            <div>{liabilities.shareholder.name}</div>
            <div>{liabilities.liabilities}円</div>
          </div>
        ))}
      </div>
    </div>
  )
}
