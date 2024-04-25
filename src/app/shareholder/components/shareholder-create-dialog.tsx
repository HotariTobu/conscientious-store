'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShareholderCreateForm } from "./shareholder-create-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const ShareholderCreateDialog = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-base" variant="link">
          株主になる
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>株主の登録</DialogTitle>
        </DialogHeader>
        <ShareholderCreateForm onCreate={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
