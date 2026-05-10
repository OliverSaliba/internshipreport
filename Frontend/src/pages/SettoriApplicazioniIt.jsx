// Italian-only page: /settori-applicazioni (renders only when lang === "it").
// Redirects non-Italian to /sectors. Content and SEO from it.json + data/settoriApplicazioni.it.js.

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion, useReducedMotion } from "framer-motion"
import { useLangRouter } from "../routing/LangRouter"
import { buildPathWithLang } from "../utils/langRouting"
import { settoriApplicazioniIt } from "../data/settoriApplicazioniIt"
import { ITALY_ENABLED } from "../utils/featureFlags"
import styles from "./SettoriApplicazioniIt.module.css"

const NS = "settoriApplicazioni"
const SCRIPT_URL = process.env.REACT_APP_CONTACT_SCRIPT_URL || ""

const SETTORI_HERO_VIDEO = "WhatsApp Video 2026-02-18 at 2.09.54 PM (1).mp4"

function SettoriApplicazioniIt() {
  const { urlLang } = useLangRouter()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const base = process.env.PUBLIC_URL || ""
  const videoSrc = `${base}/assets/italian version/${SETTORI_HERO_VIDEO}`

  // Italian-only: redirect other languages to sectors page
  useEffect(() => {
    if (!ITALY_ENABLED || urlLang !== "it") {
      navigate(buildPathWithLang(urlLang || "en", "/sectors"), { replace: true })
    }
  }, [urlLang, navigate])

  const formik = useFormik({
    initialValues: {
      contactName: "",
      contactCompany: "",
      contactLocation: "",
      contactService: "",
      contactPhone: "",
      contactMessage: "",
      contactEmail: "",
      website: "",
      gdpr: false,
    },
    validationSchema: Yup.object({
      contactName: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactLocation: Yup.string(),
      contactService: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactMessage: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactEmail: Yup.string().email(t(`${NS}.form.validation.email`)),
      website: Yup.string().max(0, "Invalid"),
      gdpr: Yup.boolean().oneOf([true], t(`${NS}.form.validation.required`)),
    }),
    onSubmit: async (values) => {
      if (values.website) return
      setIsSubmitting(true)
      setSubmitStatus(null)
      try {
        if (!SCRIPT_URL) {
          throw new Error("Missing REACT_APP_CONTACT_SCRIPT_URL")
        }
        const payload = {
          contactName: values.contactName,
          contactSurname: "",
          contactCompany: values.contactCompany || "",
          contactEmail: values.contactEmail || "",
          contactPhone: values.contactPhone || "",
          contactLocation: values.contactLocation || "",
          contactService: values.contactService,
          contactMessage: values.contactMessage,
          website: values.website || "",
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
          files: [],
        }
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        })
        setSubmitStatus("success")
        formik.resetForm()
        setTimeout(() => setSubmitStatus(null), 5000)
      } catch (err) {
        console.error(err)
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus(null), 5000)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  if (!ITALY_ENABLED || urlLang !== "it") {
    return null
  }

  return (
    <main id="settori-applicazioni" className="bg-[#f5f7fb] text-[#1b3155]">
      {/* Hero: video background + liquid glass panel (like single work / Chi Siamo) */}
      <section className={styles.hero} aria-labelledby="settori-applicazioni-h1">
        <div className={styles.heroVideoWrap} aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <motion.div
            className={styles.glassPanel}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          >
            <h1 id="settori-applicazioni-h1" className={styles.heroTitle}>
              {t(`${NS}.h1`)}
            </h1>
            <p className={styles.heroTagline}>
              {t(`${NS}.heroTagline`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro for SEO and context – futuristic card instead of plain text */}
      <section className="py-[32px] md:py-[40px]" aria-label="Introduzione">
        <div className="w-[90%] max-w-[1100px] mx-auto">
          <div className="rounded-[18px] border border-[#d7e2f7] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
            <div className="grid gap-[20px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] px-[22px] md:px-[28px] py-[22px] md:py-[26px]">
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Rajdhani'] text-[11px] tracking-[0.22em] uppercase text-[#64748b]">
                  {t(`${NS}.elencoSettoriH2`)}
                </p>
                <p className="font-['Open_Sans'] text-[14px] md:text-[15px] leading-[1.7] font-[600] text-[#111827]">
                  {t(`${NS}.introAeo`)}
                </p>
              </div>
              <div className="flex flex-col gap-[8px] md:border-l md:border-[#e2e8f0] md:pl-[22px]">
                <p className="font-['Open_Sans'] text-[13px] md:text-[14px] leading-[1.75] text-[#4b5563]">
                  {t(`${NS}.introFull`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[48px]" aria-labelledby="elenco-settori-h2">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <h2
            id="elenco-settori-h2"
            className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2 mb-[24px] text-center md:text-left"
          >
            {t(`${NS}.elencoSettoriH2`)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]" dir="ltr">
            {settoriApplicazioniIt.map((sector, idx) => (
              <motion.article
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[32px] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300 rounded-[0] sectorCard"
              >
                <div className="icon3DBadge mb-[16px]">
                  <i
                    className={`fa-solid ${sector.icon || "fa-building"} text-[#214f9b] text-[24px] md:text-[28px]`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-[Rajdhani] text-[#214f9b] text-h3 font-[700] uppercase mb-[12px]">
                  {sector.title}
                </h3>
                <p className="font-['Open_Sans'] text-[#4a5c7a] text-[15px] leading-[1.7] flex-1">
                  {sector.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[40px] bg-[#eef3fb]" aria-labelledby="cta-list-title">
        <div className="w-[90%] max-w-[1200px] mx-auto text-center md:text-left">
          <h2 id="cta-list-title" className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2">
            {t(`${NS}.ctaListTitle`)}
          </h2>
          <p className="mt-[8px] text-[#4a5c7a] text-[14px] leading-[1.7]">
            {t(`${NS}.ctaListDescription`)}
          </p>
        </div>
      </section>

      <section id="form-preventivo" className="py-[56px] md:py-[64px] bg-[#eef3fb]" aria-labelledby="form-preventivo-title">
        <div className="w-[90%] max-w-[720px] mx-auto">
          <div className="bg-white rounded-[12px] shadow-[0_4px_24px_rgba(33,79,155,0.08)] border border-[#e8ecf4] overflow-hidden">
            <header className="px-[28px] md:px-[36px] pt-[32px] md:pt-[40px] pb-0">
              <h2 id="form-preventivo-title" className="font-[Rajdhani] text-[#214f9b] font-[700] text-[26px] md:text-[30px] leading-[1.2] tracking-tight">
                {t(`${NS}.formTitle`)}
              </h2>
              <p className="mt-[10px] text-[#4a5c7a] text-[15px] leading-[1.6] font-['Open_Sans'] font-[400]">
                {t(`${NS}.formSubtitle`)}
              </p>
              <div className="mt-[24px] border-t border-[#e8ecf4]" aria-hidden="true" />
            </header>

            <div className="px-[28px] md:px-[36px] py-[28px] md:py-[36px]">
              <form onSubmit={formik.handleSubmit} className="w-full" noValidate>
                <input
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactName" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    {t(`${NS}.form.nomeAzienda`)}
                  </label>
                  <input
                    id="settori-contactName"
                    name="contactName"
                    type="text"
                    value={formik.values.contactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full min-h-[44px] px-[16px] py-[12px] bg-[#fafbfc] border text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 focus:border-[#28509E] text-[16px] font-['Open_Sans'] rounded-[8px] transition-colors duration-200 ${
                      formik.errors.contactName && formik.touched.contactName ? "border-red-500" : "border-[#d1d5db] hover:border-[#9ca3af]"
                    }`}
                    aria-invalid={formik.errors.contactName && formik.touched.contactName}
                  />
                  {formik.errors.contactName && formik.touched.contactName && (
                    <p className="text-red-600 text-[13px] mt-[6px] font-['Open_Sans']" role="alert">{formik.errors.contactName}</p>
                  )}
                </div>

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactLocation" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    {t(`${NS}.form.regioneCitta`)}
                  </label>
                  <input
                    id="settori-contactLocation"
                    name="contactLocation"
                    type="text"
                    value={formik.values.contactLocation}
                    onChange={formik.handleChange}
                    className="w-full min-h-[44px] px-[16px] py-[12px] bg-[#fafbfc] border border-[#d1d5db] rounded-[8px] text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 focus:border-[#28509E] text-[16px] font-['Open_Sans'] hover:border-[#9ca3af] transition-colors duration-200"
                  />
                </div>

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactService" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    {t(`${NS}.form.settoreInteresse`)}
                  </label>
                  <select
                    id="settori-contactService"
                    name="contactService"
                    value={formik.values.contactService}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full min-h-[44px] px-[16px] py-[12px] bg-[#fafbfc] border text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 text-[16px] font-['Open_Sans'] rounded-[8px] cursor-pointer transition-colors duration-200 ${
                      formik.errors.contactService && formik.touched.contactService ? "border-red-500" : "border-[#d1d5db] hover:border-[#9ca3af]"
                    }`}
                    aria-invalid={formik.errors.contactService && formik.touched.contactService}
                  >
                    <option value="">— Seleziona —</option>
                    {settoriApplicazioniIt.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {formik.errors.contactService && formik.touched.contactService && (
                    <p className="text-red-600 text-[13px] mt-[6px] font-['Open_Sans']" role="alert">{formik.errors.contactService}</p>
                  )}
                </div>

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactPhone" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    {t(`${NS}.form.tipoLavoroMq`)}
                  </label>
                  <input
                    id="settori-contactPhone"
                    name="contactPhone"
                    type="text"
                    value={formik.values.contactPhone}
                    onChange={formik.handleChange}
                    className="w-full min-h-[44px] px-[16px] py-[12px] bg-[#fafbfc] border border-[#d1d5db] rounded-[8px] text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 focus:border-[#28509E] text-[16px] font-['Open_Sans'] hover:border-[#9ca3af] transition-colors duration-200"
                  />
                </div>

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactMessage" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    {t(`${NS}.form.messaggioDettagli`)}
                  </label>
                  <textarea
                    id="settori-contactMessage"
                    name="contactMessage"
                    value={formik.values.contactMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="5"
                    className={`w-full min-h-[120px] resize-y px-[16px] py-[12px] bg-[#fafbfc] border text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 focus:border-[#28509E] text-[16px] font-['Open_Sans'] rounded-[8px] transition-colors duration-200 ${
                      formik.errors.contactMessage && formik.touched.contactMessage ? "border-red-500" : "border-[#d1d5db] hover:border-[#9ca3af]"
                    }`}
                    aria-invalid={formik.errors.contactMessage && formik.touched.contactMessage}
                  />
                  {formik.errors.contactMessage && formik.touched.contactMessage && (
                    <p className="text-red-600 text-[13px] mt-[6px] font-['Open_Sans']" role="alert">{formik.errors.contactMessage}</p>
                  )}
                </div>

                <div className="mb-[20px]">
                  <label htmlFor="settori-contactEmail" className="block text-[14px] font-[600] text-[#1b3155] mb-[10px] font-['Open_Sans']">
                    Email
                  </label>
                  <input
                    id="settori-contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formik.values.contactEmail}
                    onChange={formik.handleChange}
                    className="w-full min-h-[44px] px-[16px] py-[12px] bg-[#fafbfc] border border-[#d1d5db] rounded-[8px] text-[#1b3155] outline-none focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 focus:border-[#28509E] text-[16px] font-['Open_Sans'] hover:border-[#9ca3af] transition-colors duration-200"
                  />
                  {formik.errors.contactEmail && formik.touched.contactEmail && (
                    <p className="text-red-600 text-[13px] mt-[6px] font-['Open_Sans']" role="alert">{formik.errors.contactEmail}</p>
                  )}
                </div>

                <div className="mb-[28px] flex items-start gap-[14px]">
                  <input
                    id="settori-gdpr"
                    name="gdpr"
                    type="checkbox"
                    checked={formik.values.gdpr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-[3px] w-[20px] h-[20px] min-w-[20px] rounded-[4px] border-2 border-[#d1d5db] text-[#28509E] focus:ring-2 focus:ring-[#28509E] focus:ring-offset-0 cursor-pointer"
                    aria-describedby="settori-gdpr-label"
                  />
                  <label id="settori-gdpr-label" htmlFor="settori-gdpr" className="text-[14px] text-[#4a5c7a] leading-[1.5] font-['Open_Sans'] cursor-pointer">
                    {t(`${NS}.form.gdpr`)}
                  </label>
                </div>
                {formik.errors.gdpr && formik.touched.gdpr && (
                  <p className="text-red-600 text-[13px] mb-[12px] font-['Open_Sans']" role="alert">{formik.errors.gdpr}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] px-[32px] py-[14px] bg-[#ff8a00] text-white font-[Rajdhani] font-[700] text-[17px] uppercase tracking-wide rounded-[8px] hover:bg-[#e77a00] focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Invio in corso…" : t(`${NS}.form.submit`)}
                </button>

                {submitStatus === "success" && (
                  <div className="mt-[20px] p-[16px] bg-[#d1fae5] border border-[#10b981] text-[#065f46] rounded-[8px] text-[14px] font-['Open_Sans']" role="status">
                    Richiesta inviata. Ti contattiamo al più presto.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mt-[20px] p-[16px] bg-[#fee2e2] border border-[#ef4444] text-[#991b1b] rounded-[8px] text-[14px] font-['Open_Sans']" role="alert">
                    Errore nell'invio. Riprova o chiamaci al 331 800 7652.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[32px] bg-[#eef3fb]" aria-label="Disclaimer">
        <div className="w-[90%] max-w-[800px] mx-auto">
          <p className="text-[#4a5c7a] text-[14px] leading-[1.8] font-['Open_Sans']">
            {t(`${NS}.disclaimer`)}
          </p>
        </div>
      </section>

      <section className="py-[55px] bg-[#f5f7fb]" aria-labelledby="cta-final-title">
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[18px]">
          <div className="text-center md:text-left">
            <h2 id="cta-final-title" className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2">
              {t(`${NS}.ctaFinalTitle`)}
            </h2>
            <p className="mt-[8px] text-[#4a5c7a] text-[14px] leading-[1.7]">
              {t(`${NS}.ctaFinalDescription`)}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[12px]">
            <a
              href={t(`${NS}.phoneHref`)}
              className="inline-flex items-center justify-center px-[18px] py-[12px] rounded-[12px] bg-[#28509E] text-white font-[700] uppercase text-[13px] hover:bg-[#1e3a7a] transition"
            >
              Chiama 331 800 7652
            </a>
            <a
              href={t(`${NS}.whatsappHref`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-[18px] py-[12px] rounded-[12px] bg-[#25D366] text-white font-[700] uppercase text-[13px] hover:opacity-90 transition"
            >
              WhatsApp
            </a>
            <a
              href="#form-preventivo"
              className="inline-flex items-center justify-center px-[18px] py-[12px] rounded-[12px] border-2 border-[#28509E] text-[#28509E] font-[700] uppercase text-[13px] hover:bg-[#28509E] hover:text-white transition"
            >
              Invia richiesta
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SettoriApplicazioniIt
