import { useCallback, useEffect, useState } from 'react'
import { getActressPool } from '../services/tmdb'

const LOADING = { status: 'loading', actresses: [], error: null }

/** Charge le pool d'actrices populaires et expose son état (loading / success / error). */
export function useActressPool() {
  const [state, setState] = useState(LOADING)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    getActressPool()
      .then((actresses) => {
        if (!cancelled) setState({ status: 'success', actresses, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', actresses: [], error: error.message })
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = useCallback(() => {
    setState(LOADING)
    setAttempt((count) => count + 1)
  }, [])

  return { ...state, retry }
}
