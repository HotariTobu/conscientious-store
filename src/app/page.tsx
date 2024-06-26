import { ShareholderList } from "./shareholder/components/shareholder-list";
import { ShareholderCreateDialog } from "./shareholder/components/shareholder-create-dialog";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getRandomItem } from "@/utils/getRandomItem";
import { SoundEffect } from "@/components/sound-effect";

const CardLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100 block"
      {...props}
    >
      <div className="text-2xl font-semibold gap-2 flex items-center">
        {children}
        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
      </div>
    </Link>
  )
}

const PageContent = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="m-auto w-fit gap-8 grid sm:grid-cols-2">
        <CardLink href="/buy">{getRandomItem(buyLabels)}</CardLink>
        <CardLink href="/stock-up">{getRandomItem(stockUpLabels)}</CardLink>
        <CardLink href="/stock">{getRandomItem(stockLabels)}</CardLink>
        <CardLink href="/dashboard">ダッシュボード</CardLink>
      </div>

      <div className="space-y-4 flex flex-col items-center">
        <div className="text-muted-foreground">SPONSORED BY</div>
        <div className="min-h-9 flex">
          <ShareholderList />
        </div>
        <ShareholderCreateDialog>{getRandomItem(shareholderDialogLabels)}</ShareholderCreateDialog>
      </div>
    </div>
  )
}

export default function Page() {
  return <>
    <PageContent />
    <SoundEffect sources={indexSESources} />
  </>
}

const buyLabels = [
  'かう',
  'かう！',
  'かう？',
  '買う',
  '買う！',
  '買う？',
  '購入する',
  '購入する！',
  '購入する？',
  '商品をかう',
  '商品をかう！',
  '商品をかう？',
  '商品を買う',
  '商品を買う！',
  '商品を買う？',
  '商品を購入する',
  '商品を購入する！',
  '商品を購入する？',
  'かいにきた',
  'かいにきた！',
  'かいにきた？',
  'かいに来た',
  'かいに来た！',
  'かいに来た？',
  '買いにきた',
  '買いにきた！',
  '買いにきた？',
  '買いに来た',
  '買いに来た！',
  '買いに来た？',
  '購入しにきた',
  '購入しにきた！',
  '購入しにきた？',
  '購入しに来た',
  '購入しに来た！',
  '購入しに来た？',
  '商品をかいにきた',
  '商品をかいにきた！',
  '商品をかいにきた？',
  '商品をかいに来た',
  '商品をかいに来た！',
  '商品をかいに来た？',
  '商品を買いにきた',
  '商品を買いにきた！',
  '商品を買いにきた？',
  '商品を買いに来た',
  '商品を買いに来た！',
  '商品を買いに来た？',
  '商品を購入しにきた',
  '商品を購入しにきた！',
  '商品を購入しにきた？',
  '商品を購入しに来た',
  '商品を購入しに来た！',
  '商品を購入しに来た？',
]

const stockUpLabels = [
  '仕入れる',
  '仕入れる！',
  '仕入れる？',
  '納品する',
  '納品する！',
  '納品する？',
  '陳列する',
  '陳列する！',
  '陳列する？',
  '仕入れてきた',
  '仕入れてきた！',
  '仕入れてきた？',
  '仕入れて来た',
  '仕入れて来た！',
  '仕入れて来た？',
  '納品しにきた',
  '納品しにきた！',
  '納品しにきた？',
  '納品しに来た',
  '納品しに来た！',
  '納品しに来た？',
  '陳列しにきた',
  '陳列しにきた！',
  '陳列しにきた？',
  '陳列しに来た',
  '陳列しに来た！',
  '陳列しに来た？',
  '商品を仕入れる',
  '商品を仕入れる！',
  '商品を仕入れる？',
  '商品を納品する',
  '商品を納品する！',
  '商品を納品する？',
  '商品を陳列する',
  '商品を陳列する！',
  '商品を陳列する？',
  '商品を仕入れてきた',
  '商品を仕入れてきた！',
  '商品を仕入れてきた？',
  '商品を仕入れて来た',
  '商品を仕入れて来た！',
  '商品を仕入れて来た？',
  '商品を納品しにきた',
  '商品を納品しにきた！',
  '商品を納品しにきた？',
  '商品を納品しに来た',
  '商品を納品しに来た！',
  '商品を納品しに来た？',
  '商品を陳列しにきた',
  '商品を陳列しにきた！',
  '商品を陳列しにきた？',
  '商品を陳列しに来た',
  '商品を陳列しに来た！',
  '商品を陳列しに来た？',
]

const stockLabels = [
  '在庫',
  '在庫！',
  '在庫？',
  '在庫確認',
  '在庫確認！',
  '在庫確認？',
  '在庫の確認',
  '在庫の確認！',
  '在庫の確認？',
  '在庫の確認をする',
  '在庫の確認をする！',
  '在庫の確認をする？',
  '在庫の確認を行う',
  '在庫の確認を行う！',
  '在庫の確認を行う？',
  '在庫を確認',
  '在庫を確認！',
  '在庫を確認？',
  '在庫を確認する',
  '在庫を確認する！',
  '在庫を確認する？',
  '在庫を確認しにきた',
  '在庫を確認しにきた！',
  '在庫を確認しにきた？',
  '在庫を確認しに来た',
  '在庫を確認しに来た！',
  '在庫を確認しに来た？',
  '在庫チェック',
  '在庫チェック！',
  '在庫チェック？',
  '在庫のチェック',
  '在庫のチェック！',
  '在庫のチェック？',
  '在庫のチェックをする',
  '在庫のチェックをする！',
  '在庫のチェックをする？',
  '在庫のチェックを行う',
  '在庫のチェックを行う！',
  '在庫のチェックを行う？',
  '在庫をチェック',
  '在庫をチェック！',
  '在庫をチェック？',
  '在庫をチェックする',
  '在庫をチェックする！',
  '在庫をチェックする？',
  '在庫をチェックしにきた',
  '在庫をチェックしにきた！',
  '在庫をチェックしにきた？',
  '在庫をチェックしに来た',
  '在庫をチェックしに来た！',
  '在庫をチェックしに来た？',
  '商品在庫',
  '商品在庫！',
  '商品在庫？',
  '商品在庫確認',
  '商品在庫確認！',
  '商品在庫確認？',
  '商品在庫の確認',
  '商品在庫の確認！',
  '商品在庫の確認？',
  '商品在庫の確認をする',
  '商品在庫の確認をする！',
  '商品在庫の確認をする？',
  '商品在庫の確認を行う',
  '商品在庫の確認を行う！',
  '商品在庫の確認を行う？',
  '商品在庫を確認',
  '商品在庫を確認！',
  '商品在庫を確認？',
  '商品在庫を確認する',
  '商品在庫を確認する！',
  '商品在庫を確認する？',
  '商品在庫を確認しにきた',
  '商品在庫を確認しにきた！',
  '商品在庫を確認しにきた？',
  '商品在庫を確認しに来た',
  '商品在庫を確認しに来た！',
  '商品在庫を確認しに来た？',
  '商品在庫チェック',
  '商品在庫チェック！',
  '商品在庫チェック？',
  '商品在庫のチェック',
  '商品在庫のチェック！',
  '商品在庫のチェック？',
  '商品在庫のチェックをする',
  '商品在庫のチェックをする！',
  '商品在庫のチェックをする？',
  '商品在庫のチェックを行う',
  '商品在庫のチェックを行う！',
  '商品在庫のチェックを行う？',
  '商品在庫をチェック',
  '商品在庫をチェック！',
  '商品在庫をチェック？',
  '商品在庫をチェックする',
  '商品在庫をチェックする！',
  '商品在庫をチェックする？',
  '商品在庫をチェックしにきた',
  '商品在庫をチェックしにきた！',
  '商品在庫をチェックしにきた？',
  '商品在庫をチェックしに来た',
  '商品在庫をチェックしに来た！',
  '商品在庫をチェックしに来た？',
]

const shareholderDialogLabels = [
  '株主になる',
  '株主になる！',
  '株主になる？',
  '株主になろう',
  '株主になろう！',
  '株主になろう？',
  '株主になりたい',
  '株主になりたい！',
  '株主になりたい？',
  '株主にならないか',
  '株主にならないか！',
  '株主にならないか？',
  '株主になろうぜ',
  '株主になろうぜ！',
  '株主になろうぜ？',
  '株主になろうや',
  '株主になろうや！',
  '株主になろうや？',
  '株主王におれはなる',
  '株主王におれはなる！',
  '株主王におれはなる？',
]

const indexSESources = [
  "https://soundeffect-lab.info/sound/anime/mp3/title1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/news-title1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/news-title2.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/news-title3.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/news-title4.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/presentation-title1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/presentation-title2.mp3",
]
