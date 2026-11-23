import ActressCard from '../ActressCard/ActressCard'
import styles from './ActressGrid.module.css'

export default function ActressGrid({ actresses }) {
  return (
    <ul className={styles.grid}>
      {actresses.map((actress) => (
        <li key={actress.id}>
          <ActressCard actress={actress} />
        </li>
      ))}
    </ul>
  )
}
