'use client'

import { Button, ButtonProps } from './ui/button'
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-hook-form'

export const SubmitButton = (props: ButtonProps) => {
  const { disabled, isValid } = useFormState()
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={disabled || !isValid || pending} {...props} />
  )
}
