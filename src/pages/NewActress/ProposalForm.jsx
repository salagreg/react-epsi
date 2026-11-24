import { useState } from 'react'
import styles from './NewActress.module.css'

const EMPTY_FORM = { name: '', movie: '', reason: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Indique le nom de l’actrice.'
  if (values.movie.trim().length < 1) errors.movie = 'Indique au moins un film.'
  if (values.reason.trim().length < 10) {
    errors.reason = 'Explique ton choix en 10 caractères minimum.'
  }
  return errors
}

/** Formulaire à champs contrôlés : chaque champ lit et écrit dans le state "values". */
export default function ProposalForm({ onSubmit, submitting }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // Un seul handler pour tous les champs, grâce à leur attribut "name".
  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault() // empêche le rechargement de la page
    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit({
      name: values.name.trim(),
      movie: values.movie.trim(),
      reason: values.reason.trim(),
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Nom de l’actrice</label>
        <input
          id="name"
          name="name"
          autoComplete="off"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className={styles.error}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="movie">Film où tu l’as découverte</label>
        <input
          id="movie"
          name="movie"
          autoComplete="off"
          value={values.movie}
          onChange={handleChange}
          aria-invalid={Boolean(errors.movie)}
          aria-describedby={errors.movie ? 'movie-error' : undefined}
        />
        {errors.movie && (
          <p id="movie-error" className={styles.error}>
            {errors.movie}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="reason">Pourquoi elle mérite sa place ?</label>
        <textarea
          id="reason"
          name="reason"
          rows="4"
          value={values.reason}
          onChange={handleChange}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? 'reason-error' : undefined}
        />
        {errors.reason && (
          <p id="reason-error" className={styles.error}>
            {errors.reason}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : 'Envoyer ma proposition'}
      </button>
    </form>
  )
}
