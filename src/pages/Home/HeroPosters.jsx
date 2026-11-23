import { useActressPool } from '../../hooks/useActressPool'
import PosterImage from '../../components/PosterImage/PosterImage'
import styles from './Home.module.css'

const POSTER_COUNT = 5

/**
 * Éventail d'affiches décoratif. Il précharge aussi le pool pour que le duel démarre vite.
 * En cas d'erreur, il ne s'affiche simplement pas (la page Duel gère l'erreur).
 */
export default function HeroPosters() {
  const { status, actresses } = useActressPool()

  if (status !== 'success' || actresses.length < POSTER_COUNT) {
    return <div className={styles.postersPlaceholder} aria-hidden="true" />
  }

  return (
    <div className={styles.posters} aria-hidden="true">
      {actresses.slice(0, POSTER_COUNT).map((actress) => (
        <div key={actress.id} className={styles.poster}>
          <PosterImage src={actress.image} name={actress.name} eager />
        </div>
      ))}
    </div>
  )
}
