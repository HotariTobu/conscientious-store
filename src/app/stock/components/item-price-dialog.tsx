import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Item } from "@prisma/client"
import { useState } from "react"
import { ItemPriceForm } from "./item-price-form"

type Items = Pick<Item, 'salePrice'>[]

const getPrice = (items: Items) => {
  return {
    minPrice: Math.min(...items.map(({ salePrice }) => salePrice)),
    maxPrice: Math.max(...items.map(({ salePrice }) => salePrice)),
  }
}

export const ItemPriceDialog = (props: {
  productCode: string
  items: Items
}) => {
  const [open, setOpen] = useState(false)

  const { minPrice, maxPrice } = getPrice(props.items)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          {minPrice === maxPrice ? (
            <>
              価格:
              <Button className="ms-1 text-xl p-0" variant="link">{minPrice}</Button>
              円
            </>
          ) : (
            <>
              価格帯:
              <Button className="ms-1 text-xl p-0" variant="link">{minPrice}～{maxPrice}</Button>
              円
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>価格の変更</DialogTitle>
        </DialogHeader>
        <ItemPriceForm productCode={props.productCode} defaultSalePrice={(minPrice + maxPrice) / 2} onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
