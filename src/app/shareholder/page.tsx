import { ShareholderCreateForm } from "./components/shareholder-create-form";
import { ShareholderList } from "./components/shareholder-list";

export default async () => {
  return (
    <div>
      <ShareholderCreateForm />
      <div>
        <div>株主たち</div>
        <div>
          <ShareholderList />
        </div>
      </div>
    </div>
  )
}
