'use client'

import { TRPCErrorComponent } from "@/components/trpc-error-component";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client"
import Link from "next/link";

export const ShareholderList = () => {
  const { error, isLoading, data } = trpc.shareholder.list.useQuery({})

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
      {data.shareholders.map(shareholder => (
        <Button className="text-xl" variant="link" asChild key={shareholder.id}>
          <Link href={`shareholder/${shareholder.id}`}>{shareholder.name}</Link>
        </Button>
      ))}
    </>
  )
}
