'use client'

import { TRPCError } from "@/components/trpc-error";
import { trpc } from "@/lib/trpc/client"

export const ShareholderProfile = (props: {
  shareholderId: string,
}) => {
  const { error, isLoading, data: shareholder } = trpc.shareholder.byId.useQuery({
    id: props.shareholderId
  })

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
      {shareholder.name}
    </div>
  )
}
