'use client'

import { FormEvent, FormHTMLAttributes, useRef } from "react"

export const Form = ({ onSubmit, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target
    if (form instanceof HTMLFormElement) {
      setTimeout(() => {
        form.reset()
      })
    }

    if (typeof onSubmit === 'undefined') {
      return
    }

    onSubmit(event)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...props} />
  )
}
