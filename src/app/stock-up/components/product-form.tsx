`use client`

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client"
import { useEffect, useState } from "react";

export const ProductForm = ({ code }: {
  code: string
}) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const { data: product } = trpc.product.byCode.useQuery({
    code
  })

  useEffect(() => {
    if (typeof product === 'undefined') {
      return
    }

    if (product === null) {
      open(`https://www.google.com/search?q=${code}`, '_blank')
      return
    }

    setName(product.name)
    setImage(product.image)
  }, [product])

  const utils = trpc.useUtils();

  const productAddMutation = trpc.product.add.useMutation({
    async onSuccess() {
      await utils.product.byCode.invalidate();
    }
  })
  const handleAdd = () => {
    productAddMutation.mutate({
      code,
      name,
      image,
    })
  }

  const productUpdateMutation = trpc.product.update.useMutation({
    async onSuccess() {
      await utils.product.byCode.invalidate();
    }
  })
  const handleUpdate = () => {
    productUpdateMutation.mutate({
      code,
      name,
      image,
    })
  }

  if (typeof product === 'undefined') {
    return
  }

  return (
    <div>
      <Input placeholder="商品名" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="画像URL" value={image} onChange={e => setImage(e.target.value)} />
      <img src={image} />
      {product === null ? (
        <Button onClick={handleAdd}>登録する</Button>
      ) : (
        <Button onClick={handleUpdate}>更新する</Button>
      )}
    </div>
  )
}
