'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShareCreateForm } from "./share-create-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const ShareCreateDialog = (props: {
  shareholderId: string,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-base">
          株を買う
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>株の購入</DialogTitle>
        </DialogHeader>
        <ShareCreateForm {...props} onCreate={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
