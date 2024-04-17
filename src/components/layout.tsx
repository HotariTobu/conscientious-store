import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div>
        <Link href="/">Home</Link>
      </div>
      <main>
        {children}
      </main>
    </>
  )
}
