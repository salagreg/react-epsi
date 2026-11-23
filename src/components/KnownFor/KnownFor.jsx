import styles from './KnownFor.module.css'

export default function KnownFor({ titles }) {
  if (titles.length === 0) return null

  return (
    <p className={styles.knownFor}>
      <span className="visually-hidden">Connue pour : </span>
      {titles.join(' · ')}
    </p>
  )
}
