/**
 * Durée de validation en minutes du jeton d'authentification.
 */
export const TOKEN_VALIDATION_DURATION = 60;

/**
 * Durée de validation en minutes restant avant le rafraichissement du jeton d'authentification.
 */
export const TOKEN_REFRESH_THRESHOLD = TOKEN_VALIDATION_DURATION - 5;