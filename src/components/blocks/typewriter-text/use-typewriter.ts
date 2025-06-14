import { useEffect, useRef, useState } from 'react'

type TypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'waiting'

export interface UseTypewriterOptions {
  texts: string | string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
  deleteDelay?: number
  loop?: boolean
  startDelay?: number
  shouldDelete?: boolean
  onComplete?: () => void
  onTextChange?: (text: string, index: number) => void
}

export interface UseTypewriterReturn {
  displayText: string
  currentTextIndex: number
  isComplete: boolean
  isTyping: boolean
  isDeleting: boolean
  reset: () => void
}

export function useTypewriter({
  texts,
  typeSpeed = 50,
  deleteSpeed = 30,
  pauseDuration = 1000,
  deleteDelay = 1000,
  loop = true,
  startDelay = 0,
  shouldDelete = true,
  onComplete,
  onTextChange,
}: UseTypewriterOptions): UseTypewriterReturn {
  const textsArray = Array.isArray(texts) ? texts : [texts]
  
  const [displayText, setDisplayText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState<TypewriterPhase>('waiting')
  const [isComplete, setIsComplete] = useState(false)
  
  const timeoutRef = useRef<ReturnType<typeof globalThis.setTimeout>>()
  const phaseRef = useRef<TypewriterPhase>('waiting')
  const mountedRef = useRef(true)

  phaseRef.current = phase

  const currentText = textsArray[currentTextIndex] || ''

  const reset = () => {
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current)
    }
    setDisplayText('')
    setCurrentTextIndex(0)
    setCurrentCharIndex(0)
    setPhase('waiting')
    setIsComplete(false)
  }

  useEffect(() => {
    mountedRef.current = true
    
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mountedRef.current) return

    // Helper functions to reduce cognitive complexity
    const handleWaitingPhase = () => {
      timeoutRef.current = globalThis.setTimeout(() => {
        if (mountedRef.current) {
          setPhase('typing')
        }
      }, startDelay)
    }

    const handleTypingPhase = () => {
      if (currentCharIndex < currentText.length) {
        timeoutRef.current = globalThis.setTimeout(() => {
          if (mountedRef.current) {
            const nextChar = currentCharIndex + 1
            setDisplayText(currentText.slice(0, nextChar))
            setCurrentCharIndex(nextChar)
          }
        }, typeSpeed)
      } else {
        onTextChange?.(currentText, currentTextIndex)
        
        const isLastText = currentTextIndex === textsArray.length - 1
        const shouldComplete = textsArray.length === 1 || (!shouldDelete && isLastText)
        
        if (shouldComplete) {
          setIsComplete(true)
          onComplete?.()
        } else if (!shouldDelete && !isLastText) {
          // For non-deleting mode, move to next text immediately
          timeoutRef.current = globalThis.setTimeout(() => {
            if (mountedRef.current) {
              setCurrentTextIndex(currentTextIndex + 1)
              setCurrentCharIndex(0)
              setDisplayText('')
            }
          }, pauseDuration)
        } else {
          // Normal flow with deletion
          timeoutRef.current = globalThis.setTimeout(() => {
            if (mountedRef.current) {
              setPhase('pausing')
            }
          }, pauseDuration)
        }
      }
    }

    const handlePausingPhase = () => {
      timeoutRef.current = globalThis.setTimeout(() => {
        if (mountedRef.current) {
          setPhase('deleting')
        }
      }, deleteDelay)
    }

    const handleDeletingPhase = () => {
      if (currentCharIndex > 0) {
        timeoutRef.current = globalThis.setTimeout(() => {
          if (mountedRef.current) {
            const nextChar = currentCharIndex - 1
            setDisplayText(currentText.slice(0, nextChar))
            setCurrentCharIndex(nextChar)
          }
        }, deleteSpeed)
      } else {
        const nextIndex = (currentTextIndex + 1) % textsArray.length
        
        if (nextIndex === 0 && !loop) {
          setIsComplete(true)
          onComplete?.()
        } else {
          setCurrentTextIndex(nextIndex)
          setPhase('typing')
        }
      }
    }

    const animate = () => {
      if (!mountedRef.current) return

      const currentPhase = phaseRef.current

      switch (currentPhase) {
        case 'waiting': {
          handleWaitingPhase()
          break
        }
        case 'typing': {
          handleTypingPhase()
          break
        }
        case 'pausing': {
          handlePausingPhase()
          break
        }
        case 'deleting': {
          handleDeletingPhase()
          break
        }
      }
    }

    animate()

    return () => {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current)
      }
    }
  }, [
    currentCharIndex,
    currentTextIndex,
    currentText,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    deleteDelay,
    loop,
    startDelay,
    shouldDelete,
    phase,
    textsArray.length,
    onComplete,
    onTextChange,
  ])

  return {
    displayText,
    currentTextIndex,
    isComplete,
    isTyping: phase === 'typing',
    isDeleting: phase === 'deleting',
    reset,
  }
}