import { getRandomItem } from "@/utils/getRandomItem"
import { playAudio } from "@/utils/playAudio"

export const useSoundEffect = <A extends (...params: never[]) => unknown = () => void>(sources: string[], action?: A | undefined) => {
  console.assert(sources.length > 0, 'At least one sound effect source was needed.')

  type CP = A extends ((...params: infer P) => unknown) ? P : []
  type CR = A extends ((...params: never[]) => infer R) ? R : void

  return (...params: CP) => {
    const source = getRandomItem(sources)
    playAudio(source)

    if (typeof action === 'undefined') {
      return void 0 as CR
    }
    else {
      return action(...params) as CR
    }
  }
}
