const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const GENDER_FEMALE = 1
const MAX_KNOWN_FOR = 3

/** Garde uniquement les actrices avec une photo de profil. */
export function isActress(person) {
  return (
    person.gender === GENDER_FEMALE &&
    person.known_for_department === 'Acting' &&
    Boolean(person.profile_path) &&
    !person.adult
  )
}

/** Transforme une personne TMDB en objet simple utilisé partout dans l'app. */
export function toActress(person) {
  const knownFor = (person.known_for ?? [])
    .map((work) => work.title ?? work.name)
    .filter(Boolean)
    .slice(0, MAX_KNOWN_FOR)

  return {
    id: person.id,
    name: person.name,
    image: `${IMAGE_URL}${person.profile_path}`,
    knownFor,
  }
}

const POSTER_URL = 'https://image.tmdb.org/t/p/w185'
const MAX_MOVIES = 8

/** Transforme la réponse de GET /person/:id (avec movie_credits) pour la fiche actrice. */
export function toActressDetails(person) {
  // Films les plus populaires d'abord, sans doublon (une actrice peut avoir plusieurs rôles)
  const movies = uniqueById(
    [...(person.movie_credits?.cast ?? [])].sort((a, b) => b.popularity - a.popularity),
  )
    .slice(0, MAX_MOVIES)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.slice(0, 4) ?? '',
      poster: movie.poster_path ? `${POSTER_URL}${movie.poster_path}` : '',
    }))

  return {
    id: person.id,
    name: person.name,
    image: person.profile_path ? `${IMAGE_URL}${person.profile_path}` : '',
    knownFor: movies.slice(0, MAX_KNOWN_FOR).map((movie) => movie.title),
    biography: person.biography,
    birthday: person.birthday,
    placeOfBirth: person.place_of_birth,
    movies,
  }
}

export function uniqueById(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

/** Vérifie qu'un objet (ex : lu depuis le localStorage) est une actrice exploitable. */
export function isValidActress(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.image === 'string' &&
    Array.isArray(value.knownFor)
  )
}
