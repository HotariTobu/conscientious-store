'use client'

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

export const ProductImage = ({ className, size, ...props }: {
  size?: 'sm' | 'md' | 'lg' | undefined,
} & Omit<ImageProps, 'alt'>) => (
  <Image className={cn('object-contain flex-none', className,
    size === 'sm' ? 'w-32 h-32' :
      size === 'md' ? 'w-64 h-64' :
        size === 'lg' ? 'w-96 h-96' :
          ''
  )} alt="product-image" {...props} />
)
