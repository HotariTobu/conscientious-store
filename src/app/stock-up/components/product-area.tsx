`use client`

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc/client"
import { ProductForm } from "./product-form";
import { TRPCErrorComponent } from "@/components/trpc-error-component";
import { ProductImage } from "@/app/product/components/product-image";

export const ProductArea = (props: {
  productCode: string
  onDelete: () => void
}) => {
  const { error, isLoading, data: product } = trpc.product.byCode.useQuery({
    code: props.productCode,
  })

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
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
    <>
      <ProductImage className="col-span-3" size="md" src={product.image} />
      <div className="col-span-6">{product.name}</div>
    </>
  )
}
