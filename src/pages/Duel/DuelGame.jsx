import { useCallback } from 'react'
import { useArrowKeys } from '../../hooks/useArrowKeys'
import { useDuel } from '../../hooks/useDuel'
import { pluralize } from '../../utils/format'
import DuelCard from './DuelCard'
import DuelResult from './DuelResult'
import styles from './Duel.module.css'

const ARROWS = ['←', '→']

export default function DuelGame({ actresses }) {
  const duel = useDuel(actresses)
  const { choose } = duel

  const chooseLeft = useCallback(() => choose(0), [choose])
  const chooseRight = useCallback(() => choose(1), [choose])
  useArrowKeys({ onLeft: chooseLeft, onRight: chooseRight, enabled: !duel.finished })

  if (duel.finished) {
    return <DuelResult champion={duel.champion} wins={duel.streak} onReplay={duel.restart} />
  }

  return (
    <section className="container page">
      <header className={`page-header ${styles.header}`}>
        <h1 className="page-title">Ton actrice préférée ?</h1>
        <p className="page-subtitle">
          Choisis en cliquant sur une affiche
          <span className={styles.keyboardHint}> ou avec les flèches ← →</span>
        </p>
      </header>

      <div className={styles.arena}>
        {duel.cards.map((actress, side) => (
          <DuelCard
            key={actress.id}
            actress={actress}
            arrow={ARROWS[side]}
            streak={duel.streak}
            isWinner={actress.id === duel.winnerId}
            isLeaving={side === duel.leavingSide}
            onChoose={side === 0 ? chooseLeft : chooseRight}
          />
        ))}
        <span className={styles.versus} aria-hidden="true">
          VS
        </span>
      </div>

      <p className={styles.status} aria-live="polite">
        {duel.champion
          ? `${duel.champion.name} : ${pluralize(duel.streak, 'victoire')} d'affilée`
          : 'Fais ton premier choix !'}
        <span className={styles.remaining}>
          {pluralize(duel.remaining, 'challengeuse restante', 'challengeuses restantes')}
        </span>
      </p>
    </section>
  )
}
