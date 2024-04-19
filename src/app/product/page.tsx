import { Form } from "@/components/form"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { schemas } from "@/lib/prisma/schemas"
import { parseFormData } from "@/utils/parseFormData"
import { redirect } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
  code: schemas.product.code
})

export default () => {
  const inputProductCode = async (formData: FormData) => {
    'use server'
    const { code } = parseFormData(formSchema, formData)
    const product = await prisma.product.findUnique({
      where: {
        code
      }
    })
    if (product === null) {
      redirect(`/product/create?c=${code}`)
    }
    else {

    }
  }

  return (
    <div>
      <Form action={inputProductCode}>
        <Input name="code" placeholder="JANコード" />
        <SubmitButton>検索する</SubmitButton>
      </Form>
    </div>
  )
}
