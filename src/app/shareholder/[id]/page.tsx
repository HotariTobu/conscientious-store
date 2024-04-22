import { ShareList } from "./components/share-list"
import { page } from "@/utils/page"
import { ShareCreateForm } from "./components/share-create-form"
import { ShareholderProfile } from "./components/shareholder-profile"
import { shareholderSchema } from "@/server/routers/shareholder/schemas"

export default page({
  params: {
    id: shareholderSchema.shape.id
  }
}, props => {
  const { id } = props.params

  return (
    <div>
      <ShareholderProfile shareholderId={id} />
      <ShareCreateForm shareholderId={id} />
      <div>
        <ShareList shareholderId={id} />
      </div>
    </div>
  )
})
