'use client'

import { getRandomItem } from "@/utils/getRandomItem"
import { playAudio } from "@/utils/playAudio"
import { useEffect, useRef } from "react"

export const SoundEffect = (props: {
  sources: string[]
}) => {
  const ref = useRef({
    played: false
  })

  useEffect(() => {
    if (ref.current.played) {
      return
    }

    const source = getRandomItem(props.sources)
    console.trace("play", source)
    playAudio(source)

    ref.current.played = true
  }, [props.sources])

  return null
}
