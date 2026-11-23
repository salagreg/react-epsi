import { useState } from 'react'
import styles from './PosterImage.module.css'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

/** Photo d'affiche avec repli sur les initiales si l'image ne charge pas. */
export default function PosterImage({ src, name, eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={styles.fallback} role="img" aria-label={name}>
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      className={styles.image}
      src={src}
      alt={name}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
