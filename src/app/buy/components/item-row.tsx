export const ItemRow = (props: {
  product: {
    name: string,
    image: string,
  },
  salePrice: number,
}) => (
  <div className="flex">
    <img className="w-32" src={props.product.image} />
    <div>{props.product.name}</div>
    <div>{props.salePrice}円</div>
  </div>
)
