import { Link } from 'react-router'
import EmptyState from '../../components/StatusMessage/EmptyState'

export default function NotFoundPage() {
  return (
    <section className="container page">
      <EmptyState title="Bobine introuvable">
        <p>Cette page n’existe pas, ou elle a été coupée au montage.</p>
        <Link to="/" className="btn btn-primary">
          Retour à l’accueil
        </Link>
      </EmptyState>
    </section>
  )
}
