'use client'

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { z } from "zod";

const urlSchema = z.string().url()

export const ProductImage = ({ className, size, ...props }: {
  size?: 'sm' | 'md' | 'lg' | undefined
  alt?: string | undefined
} & Omit<ImageProps, 'alt'>) => {
  const { success } = urlSchema.safeParse(props.src)
  if (!success) {
    return
  }

  const sizeClass = size === 'sm' ? 'w-32 h-32' :
    size === 'md' ? 'w-64 h-64' :
      size === 'lg' ? 'w-96 h-96' :
        ''

  return (
    <Image className={cn('m-auto object-contain flex-none', sizeClass, className)} alt="product-image" priority={false} width={512} height={512} unoptimized {...props} />
  )
}
