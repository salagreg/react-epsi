import { isActress, toActress, toActressDetails, uniqueById } from '../utils/actress'

const API_URL = 'https://api.themoviedb.org/3'
const LANGUAGE = 'fr-FR'
const POOL_PAGES = 10

const token = import.meta.env.VITE_TMDB_TOKEN

/** Indique si un token TMDB a été fourni au moment du build. */
export function hasTmdbToken() {
  return Boolean(token)
}

/**
 * Appel générique à l'API TMDB v3 (authentification par Bearer token).
 * C'est le seul endroit de l'application qui utilise fetch.
 */
async function request(path, params = {}, { signal } = {}) {
  if (!token) {
    throw new Error('Token TMDB manquant : ajoute VITE_TMDB_TOKEN dans le fichier .env.')
  }

  const query = new URLSearchParams({ language: LANGUAGE, ...params })
  let response
  try {
    response = await fetch(`${API_URL}${path}?${query}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Impossible de joindre TMDB. Vérifie ta connexion internet.')
  }

  if (response.status === 401) {
    throw new Error('Token TMDB invalide : vérifie la valeur de VITE_TMDB_TOKEN.')
  }
  if (response.status === 404) {
    throw new Error('Cette actrice est introuvable sur TMDB (erreur 404).')
  }
  if (!response.ok) {
    throw new Error(`TMDB a répondu avec une erreur (${response.status}). Réessaie dans un instant.`)
  }
  return response.json()
}

async function fetchPool() {
  const pages = Array.from({ length: POOL_PAGES }, (_, index) => index + 1)
  const responses = await Promise.all(pages.map((page) => request('/person/popular', { page })))
  const people = responses.flatMap((data) => data.results ?? [])
  return uniqueById(people.filter(isActress).map(toActress))
}

// Le pool est chargé une seule fois par session et partagé entre les pages.
let poolPromise = null

export function getActressPool() {
  if (!poolPromise) {
    poolPromise = fetchPool().catch((error) => {
      poolPromise = null // permet de réessayer après une erreur
      throw error
    })
  }
  return poolPromise
}

export async function searchActresses(query, { signal } = {}) {
  const data = await request('/search/person', { query, include_adult: 'false' }, { signal })
  return uniqueById((data.results ?? []).filter(isActress).map(toActress))
}

/** Fiche d'une actrice : GET /person/:id, avec ses films dans la même requête. */
export async function getActressById(id, { signal } = {}) {
  const data = await request(`/person/${id}`, { append_to_response: 'movie_credits' }, { signal })
  return toActressDetails(data)
}
