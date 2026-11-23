import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton'
import KnownFor from '../../components/KnownFor/KnownFor'
import PosterImage from '../../components/PosterImage/PosterImage'
import { pluralize } from '../../utils/format'
import styles from './Duel.module.css'

export default function DuelResult({ champion, wins, onReplay }) {
  const replayRef = useRef(null)

  // Place le focus sur "Rejouer" pour pouvoir relancer directement au clavier.
  useEffect(() => {
    window.scrollTo(0, 0)
    replayRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section className={`container page ${styles.result}`}>
      <p className={styles.eyebrow}>Toutes les actrices sont passées</p>
      <h1 className="page-title">Ta championne</h1>

      <div className={styles.championPoster}>
        <PosterImage src={champion.image} name={champion.name} eager />
        <FavoriteButton actress={champion} className={styles.championFavorite} />
      </div>

      <h2 className={styles.championName}>{champion.name}</h2>
      <p className={styles.wins}>{pluralize(wins, 'victoire')} d'affilée</p>
      <KnownFor titles={champion.knownFor} />

      <div className={styles.actions}>
        <button ref={replayRef} type="button" className="btn btn-primary" onClick={onReplay}>
          Rejouer
        </button>
        <Link to="/actrices" className="btn btn-ghost">
          Voir toutes les actrices
        </Link>
      </div>
    </section>
  )
}
