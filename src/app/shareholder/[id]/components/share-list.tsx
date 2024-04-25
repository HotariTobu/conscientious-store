'use client'

import { TRPCError } from "@/components/trpc-error"
import { trpc } from "@/lib/trpc/client"
import { Cross1Icon } from "@radix-ui/react-icons"

export const ShareList = (props: {
  shareholderId: string,
}) => {
  const { error, isLoading, data } = trpc.share.list.useQuery(props)

  if (error !== null) {
    return (
      <TRPCError error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div>
      {data.shares.map(share => (
        <div className="flex" key={share.id}>
          {share.quote}
          <Cross1Icon />
          {share.count}
        </div>
      ))}
    </div>
  )
}
