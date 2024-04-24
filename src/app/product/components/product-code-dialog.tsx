
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { OnProductCodeSubmit, ProductCodeForm } from "./product-code-form"

export const ProductCodeDialog = (props: {
  onProductCodeSubmit: OnProductCodeSubmit
}) => (
  <Dialog>
    <DialogTrigger>
      商品コードが読み取れない場合
    </DialogTrigger>
    <DialogContent>
      <ProductCodeForm {...props} />
    </DialogContent>
  </Dialog>
)
