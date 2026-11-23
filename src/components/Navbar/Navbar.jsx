import { Link, NavLink } from 'react-router'
import { useFavorites } from '../../hooks/useFavorites'
import styles from './Navbar.module.css'

const LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/duel', label: 'Duel' },
  { to: '/actrices', label: 'Liste' },
  { to: '/favoris', label: 'Favoris' },
]

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`} aria-label="Navigation principale">
        <Link to="/" className={styles.brand}>
          Ciné<span>Duel</span>
        </Link>
        <ul className={styles.links}>
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                {label}
                {to === '/favoris' && favorites.length > 0 && (
                  <span className={styles.badge}>
                    {favorites.length}
                    <span className="visually-hidden"> actrices</span>
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
