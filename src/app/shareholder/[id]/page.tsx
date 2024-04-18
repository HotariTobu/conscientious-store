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
import { Form } from "@/components/form"
import { schemas } from "@/lib/schemas"

const paramsSchema = z.object({
  id: schemas.shareholder.id
})

const formSchema = z.object({
  count: schemas.share.count
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
      <Form action={createShare}>
        <div className="flex">
          {quote}
          <Cross1Icon />
          <Input name="count" type="number" required min={1} />株
        </div>
        <SubmitButton>買う</SubmitButton>
      </Form>
      <div>
        <ShareList shareholderId={shareholder.id} />
      </div>
    </div>
  )
}
