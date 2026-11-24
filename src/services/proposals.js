// TMDB n'accepte pas d'ajout avec notre token (lecture seule).
// Le formulaire envoie donc sa proposition à JSONPlaceholder, une API de test
// qui simule la création : elle répond 201 avec un id, sans rien enregistrer.
const PROPOSALS_URL = 'https://jsonplaceholder.typicode.com/posts'

/** POST d'une proposition d'actrice. Renvoie la proposition créée (avec son id). */
export async function createProposal(proposal) {
  let response
  try {
    response = await fetch(PROPOSALS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposal),
    })
  } catch {
    throw new Error('Impossible d’envoyer la proposition. Vérifie ta connexion internet.')
  }

  if (!response.ok) {
    throw new Error(`L’envoi a échoué (erreur ${response.status}). Réessaie dans un instant.`)
  }
  return response.json()
}
