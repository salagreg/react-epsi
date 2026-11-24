import { useCallback, useEffect, useState } from 'react'
import { getActressById } from '../services/tmdb'

/**
 * Charge la fiche d'une actrice. Renvoie les 3 états : loading, error, actress.
 * La réponse est mémorisée avec la clé de la requête qui l'a produite :
 * tant qu'elle ne correspond pas à la requête en cours, on est en chargement.
 */
export function useActress(id) {
  const [attempt, setAttempt] = useState(0) // incrémenté par "Réessayer"
  const requestKey = `${id}-${attempt}`
  const [result, setResult] = useState({ key: null, actress: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    getActressById(id, { signal: controller.signal })
      .then((actress) => setResult({ key: requestKey, actress, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ key: requestKey, actress: null, error: error.message })
        }
      })

    // Si l'id change avant la réponse, on annule la requête précédente.
    return () => controller.abort()
  }, [id, requestKey])

  const retry = useCallback(() => setAttempt((count) => count + 1), [])
  const loading = result.key !== requestKey

  return {
    loading,
    actress: loading ? null : result.actress,
    error: loading ? null : result.error,
    retry,
  }
}
