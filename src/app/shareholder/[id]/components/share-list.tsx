'use client'

import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { trpc } from "@/lib/trpc/client"
import { Cross1Icon } from "@radix-ui/react-icons"

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
    <>
      {data.shares.map(share => (
        <div className="flex items-center justify-between" key={share.id}>
          <div className="text-xl gap-1 flex items-center">
            {share.quote}円
            <Cross1Icon />
            {share.count}株
          </div>
          <div className="text-muted-foreground gap-1 flex">
            <div>{share.createdAt.toLocaleString()}</div>
            <div>購入</div>
          </div>
        </div>
      ))}
    </>
  )
}
