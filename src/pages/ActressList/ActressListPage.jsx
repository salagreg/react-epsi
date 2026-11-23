import { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useActressPool } from '../../hooks/useActressPool'
import { useActressSearch } from '../../hooks/useActressSearch'
import { pluralize } from '../../utils/format'
import ActressResults from './ActressResults'
import styles from './ActressList.module.css'

export default function ActressListPage() {
  const [query, setQuery] = useState('')
  const pool = useActressPool()
  const search = useActressSearch(query)

  const results = search.isActive
    ? {
        status: search.isLoading ? 'loading' : search.error ? 'error' : 'success',
        actresses: search.results,
        error: search.error,
        onRetry: search.retry,
        loadingLabel: 'Recherche en cours…',
        emptyText: `Aucune actrice ne correspond à « ${query.trim()} ».`,
      }
    : {
        status: pool.status,
        actresses: pool.actresses,
        error: pool.error,
        onRetry: pool.retry,
        loadingLabel: 'Chargement des actrices…',
        emptyText: 'Aucune actrice disponible pour le moment.',
      }

  return (
    <section className="container page">
      <header className={`page-header ${styles.header}`}>
        <div>
          <h1 className="page-title">Les actrices</h1>
          {results.status === 'success' && (
            <p className="page-subtitle">
              {search.isActive
                ? pluralize(results.actresses.length, 'résultat')
                : `${pluralize(results.actresses.length, 'actrice')} populaires sur TMDB`}
            </p>
          )}
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <ActressResults {...results} />
    </section>
  )
}
