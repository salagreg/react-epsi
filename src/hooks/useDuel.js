import { useCallback, useEffect, useReducer } from 'react'
import { shuffle } from '../utils/shuffle'

// Doit correspondre à la durée de l'animation de sortie dans DuelCard.module.css
export const EXIT_DURATION_MS = 350

function startDuel(actresses) {
  const [first, second, ...queue] = shuffle(actresses)
  return {
    cards: [first, second],
    queue,
    winnerId: null,
    streak: 0,
    leavingSide: null,
    finished: false,
  }
}

function duelReducer(state, action) {
  switch (action.type) {
    case 'choose': {
      if (state.leavingSide !== null || state.finished) return state
      const winner = state.cards[action.side]
      const streak = winner.id === state.winnerId ? state.streak + 1 : 1
      return { ...state, winnerId: winner.id, streak, leavingSide: 1 - action.side }
    }
    case 'replace': {
      const [next, ...queue] = state.queue
      if (!next) return { ...state, leavingSide: null, finished: true }
      const cards = [...state.cards]
      cards[state.leavingSide] = next
      return { ...state, cards, queue, leavingSide: null }
    }
    case 'restart':
      return startDuel(action.actresses)
    default:
      return state
  }
}

/**
 * Logique du duel : la gagnante reste, la perdante est remplacée
 * par une actrice jamais vue (file mélangée au départ).
 */
export function useDuel(actresses) {
  const [state, dispatch] = useReducer(duelReducer, actresses, startDuel)

  // Remplace la carte perdante une fois son animation de sortie terminée.
  useEffect(() => {
    if (state.leavingSide === null) return
    const timer = setTimeout(() => dispatch({ type: 'replace' }), EXIT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [state.leavingSide])

  // Précharge la photo de la prochaine challengeuse pour une entrée fluide.
  useEffect(() => {
    const next = state.queue[0]
    if (next) new Image().src = next.image
  }, [state.queue])

  const choose = useCallback((side) => dispatch({ type: 'choose', side }), [])
  const restart = useCallback(() => dispatch({ type: 'restart', actresses }), [actresses])

  return {
    cards: state.cards,
    winnerId: state.winnerId,
    streak: state.streak,
    leavingSide: state.leavingSide,
    finished: state.finished,
    remaining: state.queue.length,
    champion: state.cards.find((card) => card.id === state.winnerId) ?? null,
    choose,
    restart,
  }
}
