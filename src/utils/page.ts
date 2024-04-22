import { ReactNode } from "react";
import { z } from "zod"

export const page = <
  ParamsShape extends z.ZodRawShape,
  SearchParamsShape extends z.ZodRawShape,
>(
  shapes: {
    params?: ParamsShape | undefined,
    searchParams?: SearchParamsShape | undefined,
  },
  render: (props: {
    params: z.infer<z.ZodObject<ParamsShape>>,
    searchParams: z.infer<z.ZodObject<SearchParamsShape>>,
  }) => ReactNode
) => {
  const propsSchema = z.object({
    params: z.object(shapes.params ?? {}),
    searchParams: z.object(shapes.searchParams ?? {}),
  })

  return (props: unknown) => {
    const parsedProps = propsSchema.parse(props)
    return render(parsedProps as never)
  }
}
