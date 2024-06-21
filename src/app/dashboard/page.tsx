'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArchiveIcon, BackpackIcon, LightningBoltIcon, RocketIcon, StackIcon } from "@radix-ui/react-icons"
import { ProductImage } from "@/app/product/components/product-image"
import { ReactNode } from "react"
import { PageTitle } from "@/components/page-title"
import { getRandomItem } from "@/utils/getRandomItem"
import { trpc } from "@/lib/trpc/client"
import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { SoundEffect } from "@/components/sound-effect"

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

const PageContent = () => {
  const { error, isLoading, data } = trpc.dashboard.overview.useQuery()

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div className="gap-4 grid grid-cols-12 h-fit">
      <div className="col-span-6">
        <PageTitle title="ダッシュボード" />
      </div>
      <AmountCard className="col-span-6" title="引き出しのお金" Icon={BackpackIcon} amount={data.drawer} large />

      <AmountCard className="col-span-3" title="仕入" Icon={ArchiveIcon} amount={data.purchases} />
      <AmountCard className="col-span-3" title="売上" Icon={LightningBoltIcon} amount={data.sales} />
      <AmountCard className="col-span-3" title="利益" Icon={StackIcon} amount={data.profits} />
      <AmountCard className="col-span-3" title="負債" Icon={RocketIcon} amount={data.liabilities} />

      <Card className="col-span-9">
        <CardHeader>
          <CardTitle>商品別の勘定項目</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 grid grid-cols-8 items-center justify-items-center">
          <div className="col-span-5"></div>
          <div className="text-muted-foreground">仕入</div>
          <div className="text-muted-foreground">売上</div>
          <div className="text-muted-foreground">利益</div>

          {data.accountTitlesByProduct.map(accountTitles => (
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
          {data.liabilitiesByShareholder.map(liabilities => (
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

export default function Page() {
  return <>
    <PageContent />
    <SoundEffect sources={dashboardSEsources} />
  </>
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

const dashboardSEsources = [
  'https://soundeffect-lab.info/sound/button/mp3/data-display1.mp3',
  'https://soundeffect-lab.info/sound/button/mp3/data-display2.mp3',
  'https://soundeffect-lab.info/sound/button/mp3/data-display3.mp3',
  'https://soundeffect-lab.info/sound/button/mp3/data-display4.mp3',
]
