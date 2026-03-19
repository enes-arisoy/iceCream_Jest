/**
 * Resolves image path to full URL so images load from the app origin (Vite dev/build).
 */
export function getImageSrc(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return base + (path.startsWith('/') ? path : `/${path}`);
}
