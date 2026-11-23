import FavoriteButton from '../../components/FavoriteButton/FavoriteButton'
import KnownFor from '../../components/KnownFor/KnownFor'
import PosterImage from '../../components/PosterImage/PosterImage'
import { pluralize } from '../../utils/format'
import styles from './DuelCard.module.css'

export default function DuelCard({ actress, arrow, streak, isWinner, isLeaving, onChoose }) {
  const className = [styles.card, isWinner && styles.winner, isLeaving && styles.leaving]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      <div className={styles.poster}>
        <PosterImage src={actress.image} name={actress.name} eager />
        {isWinner && (
          <span className={styles.streak}>{pluralize(streak, 'victoire')} d'affilée</span>
        )}
        <FavoriteButton actress={actress} className={styles.favorite} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{actress.name}</h2>
        <KnownFor titles={actress.knownFor} />
      </div>
      {/* Le bouton s'étend sur toute la carte (voir ::after) : toute l'affiche est cliquable. */}
      <button type="button" className={styles.choose} onClick={onChoose} disabled={isLeaving}>
        <kbd aria-hidden="true">{arrow}</kbd>
        Je choisis <span className="visually-hidden">{actress.name}</span>
      </button>
    </article>
  )
}
