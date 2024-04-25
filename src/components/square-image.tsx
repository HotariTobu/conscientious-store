'use client'

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ImgHTMLAttributes } from "react";

export const SquareImage = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <AspectRatio ratio={1} className={className}>
    <img className="object-cover" {...props} />
  </AspectRatio>
)
