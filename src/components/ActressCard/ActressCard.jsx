import FavoriteButton from '../FavoriteButton/FavoriteButton'
import KnownFor from '../KnownFor/KnownFor'
import PosterImage from '../PosterImage/PosterImage'
import styles from './ActressCard.module.css'

export default function ActressCard({ actress }) {
  return (
    <article className={styles.card}>
      <div className={styles.poster}>
        <PosterImage src={actress.image} name={actress.name} />
        <FavoriteButton actress={actress} className={styles.favorite} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{actress.name}</h3>
        <KnownFor titles={actress.knownFor} />
      </div>
    </article>
  )
}
