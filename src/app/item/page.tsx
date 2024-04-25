import { trpc } from "@/lib/trpc/server"

export default async () => {
  const { items } = await trpc.item.list({})
  return (
    <>
      {items.map(item => (
        <pre key={item.id}>
          {JSON.stringify({
            ...item,
            product: {},
          }, null, 2)}
        </pre>
      ))}
    </>
  )
}
