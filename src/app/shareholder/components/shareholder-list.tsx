'use client'

import { TRPCError } from "@/components/trpc-error";
import { trpc } from "@/lib/trpc/client"
import Link from "next/link";

export const ShareholderList = () => {
  const { error, isLoading, data } = trpc.shareholder.list.useQuery({})

  if (error !== null) {
    return (
      <TRPCError error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <>
      {data.shareholders.map(shareholder => (
        <Link href={`shareholder/${shareholder.id}`} key={shareholder.id}>{shareholder.name}</Link>
      ))}
    </>
  )
}
