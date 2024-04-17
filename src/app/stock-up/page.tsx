import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { parseFormData } from "@/utils/parseFormData"
import { z } from "zod"

const formSchema = z.object({
  code: z.string().min(1)
})

export default () => {
  const inputProductCode = async (formData: FormData) => {
    'use server'
    const {code } = parseFormData(formSchema, formData)
    const product = await prisma.product.findFirst({
      where: {
        code
      }
    })
    if (product === null) {

    }
    else {

    }
  }

  return (
    <div>
      <form action={inputProductCode}>
        <Input name="code" placeholder="JANコード" />
        <SubmitButton>検索する</SubmitButton>
      </form>
    </div>
  )
}
