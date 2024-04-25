import { ShareholderList } from "./shareholder/components/shareholder-list";
import { ShareholderCreateDialog } from "./shareholder/components/shareholder-create-dialog";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <div className="m-auto w-fit gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardLink href="/buy">買いに来た</CardLink>
        <CardLink href="/stock-up">仕入れてきた</CardLink>
        <CardLink href="/stock">在庫を確認する</CardLink>
        <CardLink href="/dashboard">ダッシュボード</CardLink>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-muted-foreground">SPONSORED BY</div>
        <div className="my-4 flex">
          <ShareholderList />
        </div>
        <ShareholderCreateDialog />
      </div>
    </div>
  );
}
