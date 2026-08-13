import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

type DeferredSectionProps = {
  children: ReactNode
  minHeight?: CSSProperties['minHeight']
  rootMargin?: string
}

function DeferredSection({
  children,
  minHeight = '40rem',
  rootMargin = '400px 0px',
}: DeferredSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container || isVisible) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [isVisible, rootMargin])

  return (
    <div ref={containerRef}>
      {isVisible ? (
        children
      ) : (
        <div
          className="deferred-section-placeholder"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default DeferredSection
