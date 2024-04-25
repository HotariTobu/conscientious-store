'use client'

import { TRPCErrorComponent } from "@/components/trpc-error-component";
import { trpc } from "@/lib/trpc/client"

export const ShareholderProfile = (props: {
  shareholderId: string,
}) => {
  const { error, isLoading, data: shareholder } = trpc.shareholder.byId.useQuery({
    id: props.shareholderId
  })

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div className="text-8xl">
      {shareholder.name}
    </div>
  )
}
