'use client'

import { trpc } from "@/lib/trpc/client"
import { Cross1Icon } from "@radix-ui/react-icons"
import NextError from 'next/error';

export const ShareList = (props: {
  shareholderId: number
}) => {
  const { error, isLoading, data } = trpc.share.list.useQuery(props)

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
