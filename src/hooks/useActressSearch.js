import { useCallback, useEffect, useState } from 'react'
import { searchActresses } from '../services/tmdb'

const DEBOUNCE_MS = 400
const EMPTY = { query: '', results: [], error: null }

/**
 * Recherche d'actrices avec debounce et annulation des requêtes obsolètes.
 * `state.query` indique à quelle recherche correspondent les résultats affichés.
 */
export function useActressSearch(rawQuery) {
  const query = rawQuery.trim()
  const [state, setState] = useState(EMPTY)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchActresses(query, { signal: controller.signal })
        .then((results) => setState({ query, results, error: null }))
        .catch((error) => {
          if (error.name !== 'AbortError') setState({ query, results: [], error: error.message })
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, attempt])

  const retry = useCallback(() => {
    setState(EMPTY)
    setAttempt((count) => count + 1)
  }, [])

  const isActive = query !== ''
  const isLoading = isActive && state.query !== query

  return {
    isActive,
    isLoading,
    results: isLoading ? [] : state.results,
    error: isLoading ? null : state.error,
    retry,
  }
}
