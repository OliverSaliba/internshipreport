// Frontend/src/seo/sitemapRoutes.js
import { SERVICE_KEY_TO_SLUG } from "../utils/serviceSlugs"
import { ITALY_ENABLED } from "../utils/featureFlags"

const SITE_ORIGIN = "https://achiscaffolding.com"

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/sectors",
  "/clients",
  "/projects",
  "/products",
  "/blog",
  "/careers",
  "/gallery",
  "/contact",
]

const ITALIAN_ONLY_ROUTES = ["/settori-applicazioni"]

const BLOG_ROUTES = ["/blog-post-1", "/blog-post-2", "/blog-post-3"]

const ITALIAN_BLOG_SLUGS = [
  "/blog/normative-ponteggi-2026-legge-198-2025-badge-cantiere",
  "/blog/come-scegliere-impalcature-per-restauro",
]

const PROJECT_ROUTES = [
  "/project/aishti-mall",
  "/project/beirut-business-center",
  "/project/hotel-le-gray",
  "/project/ambasciata-polonia-via-pietro-paolo-rubens-roma-2025",
  "/project/crypta-giubileo-2025-via-carlo-alberto-cortina-roma",
  "/project/terme-di-diocleziano-restauro-statua-roma-2024",
]

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)))
}

const CAREERS_PARTNER_ROUTE = "/careers/partner"

export function getSitemapRoutes(locale) {
  const slugs = Object.values(SERVICE_KEY_TO_SLUG || {}).filter(Boolean)
  const serviceRoutes = slugs.map((s) => `/services/${s}`)
  const base = uniq([...STATIC_ROUTES, ...serviceRoutes, ...BLOG_ROUTES, ...PROJECT_ROUTES, CAREERS_PARTNER_ROUTE])
  if (locale === "it" && ITALY_ENABLED) {
    return uniq([...base, ...ITALIAN_BLOG_SLUGS, ...ITALIAN_ONLY_ROUTES])
  }
  return base
}

export function getSitemapConfig() {
  const langs = [
    { code: "en", prefix: "" },
    { code: "fr", prefix: "/fr" },
    { code: "ar-LB", prefix: "/lb" },
  ]
  if (ITALY_ENABLED) langs.push({ code: "it", prefix: "/it" })
  return { siteOrigin: SITE_ORIGIN, langs }
}
