import { prisma } from "@/lib/prisma"
import { Cross1Icon } from "@radix-ui/react-icons"

export const ShareList = async ({ shareholderId }: {
  shareholderId: number
}) => {
  const shares = await prisma.share.findMany({
    where: {
      shareholderId
    }
  })

  return (
    <div>
      {shares.map(share => (
        <div className="flex" key={share.id}>
          {share.quote}
          <Cross1Icon />
          {share.count}
        </div>
      ))}
    </div>
  )
}
