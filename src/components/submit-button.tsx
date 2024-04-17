'use client'

import { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>{children}</Button>
  )
}
