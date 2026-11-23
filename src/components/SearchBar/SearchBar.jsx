import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper} role="search">
      <label htmlFor="actress-search" className="visually-hidden">
        Rechercher une actrice
      </label>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        id="actress-search"
        className={styles.input}
        type="search"
        placeholder="Rechercher une actrice…"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
