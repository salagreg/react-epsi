import PosterImage from '../../components/PosterImage/PosterImage'
import styles from './ActressDetail.module.css'

export default function MovieList({ movies }) {
  if (movies.length === 0) return null

  return (
    <section>
      <h2 className={styles.moviesTitle}>Films populaires</h2>
      <ul className={styles.movies}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movie}>
            <div className={styles.moviePoster}>
              <PosterImage src={movie.poster} name={movie.title} />
            </div>
            <p className={styles.movieTitle}>{movie.title}</p>
            {movie.year && <p className={styles.movieYear}>{movie.year}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
