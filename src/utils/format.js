/** pluralize(3, 'victoire') → "3 victoires" */
export function pluralize(count, word, plural = `${word}s`) {
  return `${count} ${count > 1 ? plural : word}`
}
