/**
 * URL normalization utilities for client-side redirects
 * Handles trailing slash normalization and path cleanup
 */

import { stripLocalePrefix } from '../utils/langRouting'

/**
 * Check if current pathname needs normalization
 * Returns normalized pathname if different, null if already normalized
 * 
 * @param {string} currentPathname - Current browser pathname
 * @returns {string|null} - Normalized pathname or null if no change needed
 */


const hasFileExtension = (p) => /\.[a-z0-9]+$/i.test(p)
const ensureLeadingSlash = (p) => (p?.startsWith("/") ? p : `/${p || ""}`)

const ensureTrailingSlash = (p) => {
  if (!p) return "/"
  if (p === "/") return "/"
  if (hasFileExtension(p)) return p
  return p.endsWith("/") ? p : `${p}/`
}
export const getNormalizedPathname = (currentPathname) => {
  const current = ensureLeadingSlash(String(currentPathname || "/"))

  // detect locale prefix (fr/lb/it)
  const m = current.match(/^\/(fr|lb|it)(\/|$)/)
  const localePrefix = m ? `/${m[1]}` : ""

  // strip locale for normalization
  const clean = stripLocalePrefix(current)
  const cleanWithSlash = ensureTrailingSlash(clean)

  // rebuild full path with locale
const finalPath =
  localePrefix
    ? localePrefix + (cleanWithSlash === "/" ? "/" : cleanWithSlash)
    : cleanWithSlash

  // if already equal, do nothing
  if (finalPath === current) return null

  return finalPath
}

/**
 * Optional trailing slash normalization redirect
 * Should be called once on app load
 * Single-hop redirect to normalized version
 * 
 * @param {Function} navigate - React Router navigate function
 * @param {string} currentPathname - Current pathname
 * @returns {boolean} - True if redirect was performed
 */
export const normalizeTrailingSlash = (navigate, currentPathname) => {
  const normalized = getNormalizedPathname(currentPathname)
  if (normalized) {
    navigate(normalized, { replace: true })
    return true
  }
  return false
}

