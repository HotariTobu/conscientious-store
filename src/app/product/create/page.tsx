import { Form } from "@/components/form"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { schemas } from "@/lib/prisma/schemas"
import { parseFormData } from "@/utils/parseFormData"
import { parsePageSearchParams } from "@/utils/parsePageSearchParams"
import { redirect } from "next/navigation"
import { z } from "zod"

const searchParamsSchema = z.object({
  c: z.string().optional(),
  r: z.string().optional(),
})

const formSchema = z.object(schemas.product)

export default (props: unknown) => {
  const { c: code, r: redirectUrl } = parsePageSearchParams(searchParamsSchema, props)

  const createProduct = async (formData: FormData) => {
    'use server'
    const data = parseFormData(formSchema, formData)
    const product = prisma.product.create({
      data
    })
    console.log('Created product:', product)
    if (typeof redirectUrl === 'string') {
      redirect(redirectUrl)
    }
  }

  return (
    <div>
      <Form action={createProduct}>
        <Input name="code" required defaultValue={code} placeholder="JANコード" />
        <Input name="name" required placeholder="商品名" />
        <Input name="image" required placeholder="画像URL" />
        <SubmitButton>登録する</SubmitButton>
      </Form>
    </div>
  )
}
