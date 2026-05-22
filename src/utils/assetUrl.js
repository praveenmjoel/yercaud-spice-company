/**
 * Resolves a public asset path relative to the Vite base URL.
 * Works in both local dev (base = "/") and GitHub Pages (base = "/yercaud-spice-company/").
 */
export const assetUrl = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
