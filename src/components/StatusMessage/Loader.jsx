import styles from './StatusMessage.module.css'

export default function Loader({ label = 'Chargement…' }) {
  return (
    <div className={styles.status} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
