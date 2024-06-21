'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShareCreateForm } from "./share-create-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSoundEffect } from "@/hooks/useSoundEffect"

export const ShareCreateDialog = (props: {
  shareholderId: string,
}) => {
  const [open, setOpen] = useState(false)
  const handleCreate = useSoundEffect(shareCreateSESources, () => setOpen(false))
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
        <ShareCreateForm {...props} onCreate={handleCreate} />
      </DialogContent>
    </Dialog>
  )
}

const shareCreateSESources = [
  "https://soundeffect-lab.info/sound/voice/mp3/people/people-stadium-cheer1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/people/people-performance-cheer1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/people/people-performance-cheer2.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/people/people-performance-uwaa1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/mens-yeah1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/dondonpafupafu1.mp3",
]
