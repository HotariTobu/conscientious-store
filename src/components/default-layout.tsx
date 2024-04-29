import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex">
        <Button variant='link' asChild>
          <Link href="/">
            <HomeIcon className="w-4 h-4 me-2" />
            Home
          </Link>
        </Button>
      </div>
      <main className="m-4 flex-1 grid">
        {children}
      </main>
      <Toaster richColors />
    </div>
  )
}
