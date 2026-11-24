import { Link, useParams } from 'react-router'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton'
import PosterImage from '../../components/PosterImage/PosterImage'
import ErrorMessage from '../../components/StatusMessage/ErrorMessage'
import Loader from '../../components/StatusMessage/Loader'
import { useActress } from '../../hooks/useActress'
import MovieList from './MovieList'
import styles from './ActressDetail.module.css'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

export default function ActressDetailPage() {
  const { id } = useParams() // l'id vient de l'URL : /actrices/:id
  const { loading, error, actress, retry } = useActress(id)

  // Les 3 états : chargement, erreur (ex : /actrices/99999999), puis la fiche
  if (loading) {
    return (
      <section className="container page">
        <Loader label="Chargement de la fiche…" />
      </section>
    )
  }
  if (error) {
    return (
      <section className="container page">
        <ErrorMessage message={error} onRetry={retry} />
        <p className={styles.back}>
          <Link to="/actrices">← Retour à la liste</Link>
        </p>
      </section>
    )
  }

  return (
    <article className={`container page ${styles.detail}`}>
      <div className={styles.poster}>
        <PosterImage src={actress.image} name={actress.name} eager />
        <FavoriteButton actress={actress} className={styles.favorite} />
      </div>

      <div className={styles.info}>
        <Link to="/actrices" className={styles.backLink}>
          ← Toutes les actrices
        </Link>
        <h1 className="page-title">{actress.name}</h1>
        {(actress.birthday || actress.placeOfBirth) && (
          <p className={styles.meta}>
            {actress.birthday && `Née le ${dateFormatter.format(new Date(actress.birthday))}`}
            {actress.birthday && actress.placeOfBirth && ' · '}
            {actress.placeOfBirth}
          </p>
        )}
        <p className={styles.biography}>
          {actress.biography || 'Pas encore de biographie en français pour cette actrice.'}
        </p>
        <MovieList movies={actress.movies} />
      </div>
    </article>
  )
}
