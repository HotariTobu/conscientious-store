export const playAudio = (source: string) => {
  const audio = new Audio(source)
  return audio.play()
}
