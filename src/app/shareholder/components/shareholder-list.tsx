import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const ShareholderList = async () => {
  const shareholders = await prisma.shareholder.findMany()

  return (
    <div>
      {shareholders.map(shareholder => (
        <Link href={`shareholder/${shareholder.id}`} key={shareholder.id}>{shareholder.name}</Link>
      ))}
    </div>
  )
}
