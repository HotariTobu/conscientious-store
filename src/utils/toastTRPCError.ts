import { TRPCClientErrorLike } from "@trpc/client"
import { AnyProcedure } from "@trpc/server"
import { toast } from "sonner"

export const toastTRPCError = <T extends AnyProcedure>(error: TRPCClientErrorLike<T>) => {
  toast.error(error.message)
}
