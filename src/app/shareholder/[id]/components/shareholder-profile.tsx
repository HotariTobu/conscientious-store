'use client'

import { trpc } from "@/lib/trpc/client"
import NextError from 'next/error';

export const ShareholderProfile = (props: {
  shareholderId: number
}) => {
  const { error, isLoading, data } = trpc.shareholder.byId.useQuery({
    id: props.shareholderId
  })

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
    <div>
      {data.name}
    </div>
  )
}
