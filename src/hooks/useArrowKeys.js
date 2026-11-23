import { useEffect } from 'react'

/** Appelle onLeft / onRight sur les flèches gauche / droite du clavier. */
export function useArrowKeys({ onLeft, onRight, enabled = true }) {
  useEffect(() => {
    if (!enabled) return

    function handleKeyDown(event) {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target.closest?.('input, textarea, select')) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onLeft()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        onRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onLeft, onRight, enabled])
}
