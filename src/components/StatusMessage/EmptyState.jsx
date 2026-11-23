import styles from './StatusMessage.module.css'

export default function EmptyState({ title, children }) {
  return (
    <div className={styles.status}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  )
}
