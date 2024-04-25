import NextError from 'next/error';
import { TRPCClientErrorLike, } from '@trpc/client';
import { AnyProcedure } from '@trpc/server';

export const TRPCErrorComponent = <T extends AnyProcedure,>(props: {
  error: TRPCClientErrorLike<T>
}) => (
  <NextError
    title={props.error.message}
    statusCode={props.error.data?.httpStatus ?? 500}
  />
)
