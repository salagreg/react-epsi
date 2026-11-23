import styles from './StatusMessage.module.css'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={`${styles.status} ${styles.error}`} role="alert">
      <h2 className={styles.title}>Coupez !</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-ghost" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  )
}
