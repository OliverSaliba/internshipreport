// Partner registration page: /careers/partner (EN) → /it/lavora-con-noi-partner (IT)
// Italian content from careersPartner; other languages show "Available in Italian".
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import SEO from "../components/SEO"
import CareersPartnerContent from "../components/CareersPartnerContent"
import { buildPathWithLang } from "../utils/langRouting"

const CareersPartner = () => {
  const { t, i18n } = useTranslation()
  const lang = useMemo(
    () => String(i18n.resolvedLanguage || i18n.language || "en").toLowerCase(),
    [i18n.resolvedLanguage, i18n.language]
  )
  const isIt = lang === "it"
  const pagePath = "/careers/partner"
  const canonical = `https://achiscaffolding.com${buildPathWithLang(lang, pagePath)}`

  if (!isIt) {
    return (
      <>
        <SEO
          title={t("careersPartner.seoTitle", "Partner Registration | ACHI")}
          description={t("careersPartner.seoDescription", "Partner registration is available in Italian.")}
          canonical={canonical}
        />
        <CareersPartnerContent namespace="careersPartner" pagePath={pagePath} />
      </>
    )
  }

  return <CareersPartnerContent namespace="careersPartner" pagePath={pagePath} />
}

export default CareersPartner
