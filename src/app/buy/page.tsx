'use client'

import { useCodeReader } from "@/hooks/useCodeReader"
import { useState } from "react"

export default () => {
  useCodeReader(console.log)

  const [text, setText] = useState('')

  return (
    <div>
      buy
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  )
}
