import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export default function CardLink({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      {...props}
    >
      <div className="mb-3 text-2xl font-semibold">
        {children}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </div>
    </Link>
  )
}
