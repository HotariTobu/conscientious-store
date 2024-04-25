'use client'

import { cn } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export const ProductImage = ({ className, size, ...props }: {
  size?: 'sm' | 'md' | 'lg' | undefined,
} & ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={cn('object-contain flex-none', className,
    size === 'sm' ? 'w-32 h-32' :
      size === 'md' ? 'w-64 h-64' :
        size === 'lg' ? 'w-96 h-96' :
          ''
  )} {...props} />
)
