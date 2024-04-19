import { useEffect, useRef } from "react"

type HistoryItem = {
  time: number
  key: string
}

export const useCodeReader = (onRead: (code: string) => void, threshold = 100) => {
  const ref = useRef({
    history: [] as HistoryItem[]
  })

  const handleKeyPress = (event: KeyboardEvent) => {
    const { history } = ref.current
    if (event.code === 'Enter') {
      const text = history.filter(({ time }) => event.timeStamp - time < threshold).map(({ key }) => key).join('')
      history.splice(0)
      if (text.length > 0) {
        onRead(text)
      }
    }
    else {
      history.push({
        time: event.timeStamp,
        key: event.key,
      })
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress)
    return () => {
      document.removeEventListener("keypress", handleKeyPress)
    }
  }, [])
}
