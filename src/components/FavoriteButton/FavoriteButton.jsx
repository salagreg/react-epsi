import { useFavorites } from '../../hooks/useFavorites'
import styles from './FavoriteButton.module.css'

export default function FavoriteButton({ actress, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(actress.id)
  const label = active
    ? `Retirer ${actress.name} des favoris`
    : `Ajouter ${actress.name} aux favoris`

  return (
    <button
      type="button"
      className={`${styles.button} ${active ? styles.active : ''} ${className}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.stopPropagation()
        toggleFavorite(actress)
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6h2c.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  )
}
