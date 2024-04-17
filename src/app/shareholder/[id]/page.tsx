import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { parseFormData } from "@/utils/parseFormData"
import { parsePageParams } from "@/utils/parsePageParams"
import { z } from "zod"
import { quote } from "@/constants.json"
import { revalidatePath } from "next/cache"
import { Cross1Icon } from "@radix-ui/react-icons"
import { ShareList } from "./components/share-list"

const paramsSchema = z.object({
  id: z.coerce.number().int().gt(0)
})

const formSchema = z.object({
  count: z.coerce.number().int().gt(0)
})

export default async (props: unknown) => {
  const { id } = parsePageParams(paramsSchema, props)
  const shareholder = await prisma.shareholder.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      stocks: true
    }
  })

  const createShare = async (formData: FormData) => {
    'use server'
    const { count } = parseFormData(formSchema, formData)
    const share = await prisma.share.create({
      data: {
        quote,
        count,
        shareholderId: shareholder.id
      }
    })
    console.log('Created share:', share)
    revalidatePath('')
  }

  return (
    <div>
      <div>
        {shareholder.name}
      </div>
      <form action={createShare}>
        <div className="flex">
          {quote}
          <Cross1Icon />
          <Input name="count" type="number" required min={1} />株
        </div>
        <SubmitButton>買う</SubmitButton>
      </form>
      <div>
        <ShareList shareholderId={shareholder.id} />
      </div>
    </div>
  )
}
