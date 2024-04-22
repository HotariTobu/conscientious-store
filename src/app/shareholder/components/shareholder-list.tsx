'use client'

import { trpc } from "@/lib/trpc/client"
import NextError from 'next/error';
import Link from "next/link";

export const ShareholderList = () => {
  const { error, isLoading, data } = trpc.shareholder.list.useQuery({})

  if (error !== null) {
    return (
      <NextError
        title={error.message}
        statusCode={error.data?.httpStatus ?? 500}
      />
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
