'use client'

import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { trpc } from "@/lib/trpc/client"
import { Cross1Icon } from "@radix-ui/react-icons"
import { ShareDeleteDialog } from "./share-delete-dialog"

export const ShareList = (props: {
  shareholderId: string,
}) => {
  const { error, isLoading, data } = trpc.share.list.useQuery(props)

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div className="gap-2 grid grid-cols-5 items-center">
      {data.shares.map(share => (
        <div className="col-span-5 grid grid-cols-subgrid" key={share.id}>
          <div className="col-span-2 text-xl gap-1 flex items-center">
            {share.quote}円
            <Cross1Icon />
            {share.count}株
          </div>
          <div className="col-span-2 text-muted-foreground gap-1 flex items-center">
            <div>{share.createdAt.toLocaleString()}</div>
            <div>購入</div>
          </div>
          <ShareDeleteDialog shareId={share.id} maxCount={share.count} quote={share.quote} />
        </div>
      ))}
    </div>
  )
}
