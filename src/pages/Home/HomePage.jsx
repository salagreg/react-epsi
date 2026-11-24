import { Link } from 'react-router'
import { hasTmdbToken } from '../../services/tmdb'
import HeroPosters from './HeroPosters'
import MissingTokenNotice from './MissingTokenNotice'
import styles from './Home.module.css'

const STEPS = [
  { title: 'Deux affiches', text: 'Deux actrices populaires apparaissent face à face.' },
  { title: 'Un choix', text: 'Clique sur ta préférée, ou utilise les flèches ← → du clavier.' },
  { title: 'Une championne', text: 'La gagnante reste en lice jusqu’à la dernière challengeuse.' },
]

export default function HomePage() {
  return (
    <section className={`container ${styles.home}`}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Le casting, c’est toi</p>
        <h1 className={styles.title}>
          Ciné<span>Duel</span>
        </h1>
        <p className={styles.tagline}>
          Deux actrices, une seule place sous les projecteurs. Choisis ta préférée, duel après
          duel, jusqu’à couronner ta championne.
        </p>
        <div className={styles.actions}>
          <Link to="/duel" className="btn btn-primary">
            Lancer un duel
          </Link>
          <Link to="/actrices" className="btn btn-ghost">
            Voir la liste des actrices
          </Link>
        </div>
      </div>

      {hasTmdbToken() ? <HeroPosters /> : <MissingTokenNotice />}

      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
