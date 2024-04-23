`use client`

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc/client"
import NextError from 'next/error';
import { ProductForm } from "./product-form";

export const ProductArea = (props: {
  productCode: string
  onDelete: () => void
}) => {
  const { error, isLoading, data: product } = trpc.product.byCode.useQuery({
    code: props.productCode,
  })

  if (error !== null) {
    return (
      <NextError
        title={error.message}
        statusCode={error.data?.httpStatus ?? 500}
      />
    )
  }

  if (isLoading) {
    return
  }

  if (product === null) {
    return (
      <Dialog defaultOpen onOpenChange={props.onDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>商品の登録</DialogTitle>
            <DialogDescription>登録されていない商品であるため、登録が必要です。</DialogDescription>
          </DialogHeader>
          <ProductForm {...props} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div>
      <div>{product.name}</div>
      <img src={product.image} />
    </div>
  )
}
