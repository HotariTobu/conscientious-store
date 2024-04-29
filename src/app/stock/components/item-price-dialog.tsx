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
        <Button variant="link">
          {minPrice === maxPrice ? (
            <div>
              価格:
              <span className="ms-1 text-xl">{minPrice}</span>
              円
            </div>
          ) : (
            <div>
              価格帯:
              <span className="ms-1 text-xl">{minPrice}～{maxPrice}</span>
              円
            </div>
          )}
        </Button>
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
