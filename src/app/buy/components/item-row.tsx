import { ProductImage } from "@/app/product/components/product-image"
import { PropsWithChildren } from "react"

export const ItemRow = (props: PropsWithChildren<{
  product: {
    name: string,
    image: string,
  },
  salePrice: number,
}>) => (
  <div className="gap-2 grid grid-cols-4 group">
    <ProductImage className="row-span-2" size="sm" src={props.product.image} />
    <div className="col-span-2 self-end">{props.product.name}</div>
    <div className="text-nowrap self-end justify-self-end">
      <span className="ms-1 text-4xl group-hover:text-destructive">{props.salePrice}</span>
      円
    </div>
    <div className="w-fit col-span-3 justify-self-end">
      {props.children}
    </div>
  </div>
)
