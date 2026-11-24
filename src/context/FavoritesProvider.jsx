import { useCallback, useEffect, useMemo, useState } from 'react'
import { isValidActress } from '../utils/actress'
import { FavoritesContext } from './FavoritesContext'

const STORAGE_KEY = 'cine-duel:favorites'

function readFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isValidActress) : []
  } catch {
    // Données corrompues ou localStorage inaccessible (navigation privée...)
    return []
  }
}

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Sauvegarde impossible : les favoris restent disponibles pour la session.
    }
  }, [favorites])

  const toggleFavorite = useCallback((actress) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === actress.id)
        ? current.filter((favorite) => favorite.id !== actress.id)
        : [...current, actress],
    )
  }, [])

  const clearFavorites = useCallback(() => setFavorites([]), [])

  const isFavorite = useCallback(
    (id) => favorites.some((favorite) => favorite.id === id),
    [favorites],
  )

  const value = useMemo(
    () => ({ favorites, toggleFavorite, clearFavorites, isFavorite }),
    [favorites, toggleFavorite, clearFavorites, isFavorite],
  )

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
