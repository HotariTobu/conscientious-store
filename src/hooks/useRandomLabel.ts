import { useState } from "react"

export const useRandomLabel = (labels: string[]) => {
  const initialIndex = Math.floor(Math.random() * labels.length)
  const [label, setLabel] = useState(labels[(labels.length)])
  return label
}
