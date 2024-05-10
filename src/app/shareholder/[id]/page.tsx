import { ShareList } from "./components/share-list"
import { page } from "@/utils/page"
import { ShareholderProfile } from "./components/shareholder-profile"
import { shareholderSchema } from "@/server/routers/shareholder/schemas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareCreateDialog } from "./components/share-create-dialog"

export default page({
  params: {
    id: shareholderSchema.shape.id
  }
}, props => {
  const { id } = props.params

  return (
    <div className="space-y-4">
      <ShareholderProfile shareholderId={id} />
      <ShareCreateDialog shareholderId={id} />
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>保有株</CardTitle>
        </CardHeader>
        <CardContent>
          <ShareList shareholderId={id} />
        </CardContent>
      </Card>
    </div>
  )
})
