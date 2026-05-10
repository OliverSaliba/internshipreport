// Frontend/src/components/SectorsBar.js
import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { sectors } from "../data/sectors"
import { settoriApplicazioniIt } from "../data/settoriApplicazioniIt"
import SmartLink from "../seo/SmartLink"
import { buildPathWithLang } from "../utils/langRouting"
import "./SectorsBar.css"

const ACCENT = "#28509E"
const NS = "homeSectors"

const SectorsBar = () => {
  const { t, i18n } = useTranslation()
  const isItalian = String(i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("it")
  const reduceMotion = useReducedMotion()

  const getTitle = (sector) => t(`${NS}.items.${sector.key}.title`)
  const getAriaLabel = (sector) => t(`${NS}.items.${sector.key}.ariaLabel`, { title: getTitle(sector) })
  const getTitleAttr = (sector) => t(`${NS}.items.${sector.key}.titleAttr`, { title: getTitle(sector) })

  // Italian home: futuristic grid, liquid glass cards, staggered scroll animation (no scroll-lock story)
  if (isItalian) {
    const containerVariants = {
      hidden: {},
      visible: {
        transition: reduceMotion
          ? { duration: 0 }
          : { staggerChildren: 0.07, delayChildren: 0.1 }
      }
    }
    const cardVariants = {
      hidden: reduceMotion ? {} : { opacity: 0, y: 28, scale: 0.96 },
      visible: reduceMotion
        ? {}
        : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }
    }

    return (
      <section
        id="sectors-bar"
        className="sectors-italian-section"
        aria-labelledby="sectors-bar-title"
      >
        <div className="sectors-italian-bg" aria-hidden="true" />
        <div className="sectors-italian-container">
          <motion.header
            className="sectors-italian-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="sectors-bar-title" className="sectors-italian-title">
              {t(`${NS}.title`)}
            </h2>
            <div className="sectors-italian-title-accent" />
          </motion.header>

          <p className="sr-only">{t(`${NS}.srDescription`)}</p>

          <motion.ul
            className="sectors-italian-grid"
            aria-label={t(`${NS}.listAriaLabel`)}
            dir="ltr"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px 0px -80px 0px" }}
          >
            {settoriApplicazioniIt.map((sector, idx) => (
              <motion.li key={sector.id} className="sectors-italian-li" variants={cardVariants}>
                <SmartLink
                  to={buildPathWithLang("it", "/settori-applicazioni")}
                  className="sectors-italian-card cursor-pointer"
                  aria-label={`${sector.title} – ${t("nav.sectors")}`}
                  title={sector.title}
                >
                  <span className="sectors-italian-card-icon-wrap">
                    <i
                      className={`fa-solid ${sector.icon || "fa-building"} sectors-italian-card-icon`}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="sectors-italian-card-title">{sector.title}</h3>
                  <span className="sectors-italian-card-cta">
                    {t("nav.sectors")}
                    <svg className="sectors-italian-card-arrow" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </SmartLink>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    )
  }

  // Default layout (non-Italian)
  return (
    <section id="sectors-bar" className="py-[70px] bg-[#f5f7fb]" aria-labelledby="sectors-bar-title">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          id="sectors-bar-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-[Rajdhani] text-h2 font-[700] uppercase mb-[40px] text-[#003A80] text-center"
        >
          {t(`${NS}.title`)}
        </motion.h2>

        <p className="sr-only">{t(`${NS}.srDescription`)}</p>

        <div className="relative md:overflow-visible overflow-x-auto scrollbar-hide pb-[10px] md:pb-0 -mx-[20px] md:mx-0 px-[20px] md:px-0">
          <ul className="flex flex-nowrap gap-[16px] lg:gap-[20px]" aria-label={t(`${NS}.listAriaLabel`)} dir="ltr">
            {sectors.map((sector, idx) => (
              <motion.li
                key={sector.key || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[160px] md:flex-1 md:min-w-0 list-none"
              >
                <SmartLink
                  to="/sectors"
                  className="sectorCard group block bg-white rounded-[0] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[24px] md:p-[28px] h-full flex flex-col items-center text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-[4px] active:scale-[0.98] md:active:scale-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#214f9b] focus:ring-offset-2"
                  aria-label={getAriaLabel(sector)}
                  title={getTitleAttr(sector)}
                >
                  <div className="icon3DBadge mb-[12px] md:mb-[16px] flex-shrink-0">
                    <i
                      className={`fa-solid ${sector.icon || "fa-building"} text-[#214f9b] text-[28px] md:text-[32px] group-hover:text-[#ff8e26] transition-colors duration-300`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-[Rajdhani] text-[#214f9b] text-h6 md:text-h5 lg:text-h4 font-[600] uppercase leading-[1.3] group-hover:text-[#ff8e26] transition-colors duration-300">
                    {getTitle(sector)}
                  </h3>
                </SmartLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectorsBar
