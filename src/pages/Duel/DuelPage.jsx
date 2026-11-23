import { Link } from 'react-router'
import EmptyState from '../../components/StatusMessage/EmptyState'
import ErrorMessage from '../../components/StatusMessage/ErrorMessage'
import Loader from '../../components/StatusMessage/Loader'
import { useActressPool } from '../../hooks/useActressPool'
import DuelGame from './DuelGame'

export default function DuelPage() {
  const { status, actresses, error, retry } = useActressPool()

  if (status === 'success' && actresses.length >= 2) {
    return <DuelGame actresses={actresses} />
  }

  return (
    <section className="container page">
      {status === 'loading' && <Loader label="On prépare le casting…" />}
      {status === 'error' && <ErrorMessage message={error} onRetry={retry} />}
      {status === 'success' && (
        <EmptyState title="Pas assez d'actrices">
          <p>Il faut au moins deux actrices pour lancer un duel.</p>
          <Link to="/" className="btn btn-ghost">
            Retour à l'accueil
          </Link>
        </EmptyState>
      )}
    </section>
  )
}
