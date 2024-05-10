'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShareDeleteForm } from "./share-delete-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const ShareDeleteDialog = (props: {
  shareId: string,
  maxCount: number,
  quote: number,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-base">
          売る
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>株の売却</DialogTitle>
        </DialogHeader>
        <ShareDeleteForm {...props} onDelete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
