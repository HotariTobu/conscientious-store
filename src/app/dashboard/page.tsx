import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArchiveIcon, BackpackIcon, LightningBoltIcon, RocketIcon, StackIcon } from "@radix-ui/react-icons"
import { prisma } from "@/lib/prisma"
import { ProductImage } from "@/app/product/components/product-image"
import { ReactNode } from "react"
import { PageTitle } from "@/components/page-title"
import { getRandomItem } from "@/utils/getRandomItem"

const AmountCard = (props: {
  className?: string | undefined,
  title: string,
  Icon: (props: { className: string }) => ReactNode,
  amount: number,
  large?: boolean | undefined,
}) => (
  <Card className={props.className}>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className={props.large ? " text-xl" : ''}>{props.title}</CardTitle>
      <props.Icon className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <div className={props.large === true ? "text-6xl" : 'text-2xl'}>{props.amount}円</div>
    </CardContent>
  </Card>
)

export default async function Page() {
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
    <div className="gap-4 grid grid-cols-12 h-fit">
      <div className="col-span-6">
        <PageTitle title="ダッシュボード" />
      </div>
      <AmountCard className="col-span-6" title="引き出しのお金" Icon={BackpackIcon} amount={drawer} large />

      <AmountCard className="col-span-3" title="仕入" Icon={ArchiveIcon} amount={purchases} />
      <AmountCard className="col-span-3" title="売上" Icon={LightningBoltIcon} amount={sales} />
      <AmountCard className="col-span-3" title="利益" Icon={StackIcon} amount={profits} />
      <AmountCard className="col-span-3" title="負債" Icon={RocketIcon} amount={liabilities} />

      <Card className="col-span-9">
        <CardHeader>
          <CardTitle>商品別の勘定項目</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 grid grid-cols-8 items-center justify-items-center">
          <div className="col-span-5"></div>
          <div className="text-muted-foreground">仕入</div>
          <div className="text-muted-foreground">売上</div>
          <div className="text-muted-foreground">利益</div>

          {accountTitlesByProduct.map(accountTitles => (
            <div className="col-span-8 grid-cols-subgrid grid items-center justify-items-center" key={accountTitles.product.code}>
              <div className="col-span-5 justify-self-stretch gap-2 flex items-center">
                <ProductImage size="sm" src={accountTitles.product.image} />
                <div className="flex-1">{accountTitles.product.name}</div>
              </div>
              <div>{accountTitles.purchases}円</div>
              <div>{accountTitles.sales}円</div>
              <div>{accountTitles.profits}円</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="col-span-3 h-fit">
        <CardHeader>
          <CardTitle>{getRandomItem(shareholderCardTitles)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {liabilitiesByShareholder.map(liabilities => (
            <div className="flex items-center justify-between" key={liabilities.shareholder.id}>
              <div className="text-xl">{liabilities.shareholder.name}</div>
              <div>{liabilities.liabilities}円</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const shareholderCardTitles = [
  '株主',
  '株主リスト',
  '株主たち',
  '株主のみんな',
  '株主の皆',
  '株主のみなさま',
  '株主の皆様',
  '株主の方々',
  'Shareholders',
]
