import Link from "next/link";
import { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
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
