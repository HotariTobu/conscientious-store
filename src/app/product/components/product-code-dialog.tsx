
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OnProductCodeSubmit, ProductCodeForm } from "./product-code-form"
import { Button } from "@/components/ui/button"
import { useCodeReader } from "@/hooks/useCodeReader"

export const ProductCodeDialog = (props: {
  onProductCodeSubmit: OnProductCodeSubmit
}) => {
  useCodeReader(props.onProductCodeSubmit)
  return (
    <div className="flex items-center">
      <div>バーコードリーダーで商品のバーコードを読み取ってください。</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-0 text-muted-foreground" variant="link">
            商品コードが読み取れない場合
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>商品コードの手入力</DialogTitle>
          </DialogHeader>
          <ProductCodeForm {...props} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
