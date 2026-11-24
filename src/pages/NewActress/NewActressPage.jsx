import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createProposal } from '../../services/proposals'
import ProposalForm from './ProposalForm'
import styles from './NewActress.module.css'

export default function NewActressPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(proposal) {
    setSubmitting(true)
    setError(null)
    try {
      const created = await createProposal(proposal) // POST
      // Redirection vers la liste, en lui transmettant la proposition créée
      navigate('/actrices', { state: { proposal: { ...proposal, id: created.id } } })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="container page">
      <header className="page-header">
        <h1 className="page-title">Proposer une actrice</h1>
        <p className="page-subtitle">
          Une actrice manque au casting ? Propose-la, on étudiera ta suggestion.
        </p>
      </header>

      {error && (
        <p className={styles.alert} role="alert">
          {error}
        </p>
      )}
      <ProposalForm onSubmit={handleSubmit} submitting={submitting} />
    </section>
  )
}
