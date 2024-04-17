import { Input } from "@/components/ui/input";
import { ShareholderList } from "./components/shareholder-list";
import { SubmitButton } from "@/components/submit-button";
import { z } from "zod";
import { parseFormData } from "@/utils/parseFormData";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(1),
})

export default function Shareholder() {
  const createShareholder = async (formData: FormData) => {
    'use server'
    const { name } = parseFormData(formSchema, formData)
    const shareholder = await prisma.shareholder.create({
      data: {
        name
      }
    })
    console.log("Created shareholder:", shareholder)
    revalidatePath('')
  }

  return (
    <div>
      <form action={createShareholder}>
        <Input name="name" required placeholder="株主名" />
        <SubmitButton>追加</SubmitButton>
      </form>
      <div>
        株主たち
        <ShareholderList />
      </div>
    </div>
  )
}
