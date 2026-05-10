// Shared partner-registration layout. Used by Careers (when lang===it) and CareersPartner page.
// Content from t(`${namespace}.xxx`) — namespace is "careers" or "careersPartner".
import React from "react"
import { useTranslation } from "react-i18next"
import SEO from "./SEO"
import { buildPathWithLang } from "../utils/langRouting"
import css from "./LavoraConNoiPortal.module.css"

export default function CareersPartnerContent({ namespace, pagePath }) {
  const { t, i18n } = useTranslation()
  const lang = String(i18n.resolvedLanguage || i18n.language || "en").toLowerCase()
  const isIt = lang === "it"

  const canonical = `https://achiscaffolding.com${buildPathWithLang(lang, pagePath)}`
  const seoTitle = t(`${namespace}.seoTitle`)
  const seoDescription = t(`${namespace}.seoDescription`)
  const h1 = t(`${namespace}.h1`)
  const heroTitle = t(`${namespace}.hero.title`)
  const heroSubtitle = t(`${namespace}.hero.subtitle`)
  const benefits = t(`${namespace}.benefits.items`, { returnObjects: true })
  const ctaMain = t(`${namespace}.ctaMain`)
  const profiles = t(`${namespace}.profiles`, { returnObjects: true })
  const whyTitle = t(`${namespace}.whyRegister.title`)
  const whyItems = t(`${namespace}.whyRegister.items`, { returnObjects: true })
  const howSteps = t(`${namespace}.howItWorks.steps`, { returnObjects: true })
  const howNote = t(`${namespace}.howItWorks.note`)
  const formTitle = t(`${namespace}.form.title`)
  const formCategories = t(`${namespace}.form.categories`, { returnObjects: true })
  const formCta = t(`${namespace}.form.cta`)
  const testimonials = t(`${namespace}.testimonials`, { returnObjects: true })
  const faqItems = t(`${namespace}.faq.items`, { returnObjects: true })
  const disclaimer = t(`${namespace}.disclaimer`)
  const ctaFinal = t(`${namespace}.ctaFinal`)

  const benefitsList = Array.isArray(benefits) ? benefits : []
  const profilesList = Array.isArray(profiles) ? profiles : []
  const whyList = Array.isArray(whyItems) ? whyItems : []
  const howList = Array.isArray(howSteps) ? howSteps : []
  const categoriesList = Array.isArray(formCategories) ? formCategories : []
  const testimonialsList = Array.isArray(testimonials) ? testimonials : []
  const faqList = Array.isArray(faqItems) ? faqItems : []

  if (!isIt) {
    return (
      <main className="w-full min-h-[50vh] flex items-center justify-center bg-[#f5f7fa] px-[20px] py-[60px]">
        <div className="max-w-[600px] text-center">
          <h1 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[32px] font-[700] mb-[16px]">
            {t("careersPartner.availableInItalianTitle", "Partner registration")}
          </h1>
          <p className="font-['Open_Sans'] text-[#2a2a2a] text-[16px] leading-[1.7] mb-[24px]">
            {t("careersPartner.availableInItalianText", "This page is available in Italian. Switch language to view content.")}
          </p>
          <a
            href={buildPathWithLang("it", pagePath)}
            className="inline-flex items-center justify-center px-[24px] py-[12px] bg-[#28509E] text-white font-[Rajdhani] font-[700] text-[16px] rounded-[0] hover:bg-[#214f9b] transition"
          >
            {t("careersPartner.viewInItalian", "View in Italian")}
          </a>
        </div>
      </main>
    )
  }

  const isLavoraConNoiPortal = namespace === "careers"

  if (isLavoraConNoiPortal) {
    return (
      <>
        <SEO title={seoTitle} description={seoDescription} canonical={canonical} />
        <main className={css.root} dir="ltr" aria-label="Lavora con Noi – Portale Partner">
          <section className={css.hero}>
            <div className={css.container}>
              <h1 className={css.heroH1}>{h1}</h1>
              <p className={css.heroLead}>{heroTitle}</p>
              <p className={css.heroSub}>{heroSubtitle}</p>
              <a href="#form-section" className={css.heroCta} aria-label={ctaMain}>{ctaMain}</a>
            </div>
          </section>

          <section className={css.section} aria-labelledby="portal-benefits-heading">
            <div className={css.container}>
              <h2 id="portal-benefits-heading" className={css.sectionTitle}>Vantaggi principali</h2>
              <div className={css.benefitsGrid}>
                {benefitsList.slice(0, 3).map((item, idx) => (
                  <div key={idx} className={css.benefitCard}>
                    <h3 className={css.benefitTitle}>{typeof item === "object" && item?.title != null ? item.title : item}</h3>
                    <p className={css.benefitText}>{typeof item === "object" && item?.desc != null ? item.desc : typeof item === "object" ? item.title : item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={css.sectionAlt} aria-labelledby="portal-profiles-heading">
            <div className={css.container}>
              <h2 id="portal-profiles-heading" className={css.sectionTitle}>{t("careers.profilesTitle")}</h2>
              <ul className={css.profilesList}>
                {profilesList.map((profile, idx) => (
                  <li key={idx} className={css.profileItem}>
                    <h3 className={css.profileTitle}><span className={css.profileNum}>{profile.number}</span> {profile.title}</h3>
                    <ul className={css.profileList}>
                      {(profile.items || []).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <p className={css.profilesCtaWrap}>
                <a href="#form-section" className={css.profilesCta}>{t("careers.ctaFinalButton")}</a>
              </p>
            </div>
          </section>

          <section className={css.section} aria-labelledby="portal-why-how">
            <div className={css.container}>
              <div className={css.twoCol}>
                <div className={css.glassCard}>
                  <h2 id="portal-why-how" className={css.sectionTitle}>{whyTitle}</h2>
                  <ul className={css.whyList}>
                    {whyList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={css.glassCard}>
                  <h2 className={css.sectionTitle}>{t("careers.howItWorksTitle")}</h2>
                  <ol className={css.howList}>
                    {howList.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                  {howNote && <p className={css.howNote}>{howNote}</p>}
                </div>
              </div>
            </div>
          </section>

          <section id="form-section" className={css.section} aria-labelledby="portal-form-heading">
            <div className={css.formWrap}>
              <div className={css.container}>
                <h2 id="portal-form-heading" className={css.formTitle}>{formTitle}</h2>
                <form className={css.formCard} onSubmit={(e) => e.preventDefault()} aria-label="Registrazione partner">
                  <div className={css.formBlock}>
                    <span className={css.formLegend}>{t("careers.form.categoriesLabel")}</span>
                    <div className={css.checkboxGroup}>
                      {categoriesList.map((cat, idx) => (
                        <label key={idx} className={css.checkboxLabel}>
                          <input type="checkbox" name="category" value={cat?.value || cat} aria-label={cat?.label || cat} />
                          <span>{cat?.label || cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className={css.formBlock}>
                    <div className={css.formRow}>
                      <div>
                        <label htmlFor="portal-ragione" className={css.formLabel}>{t("careers.form.ragioneSociale")}</label>
                        <input id="portal-ragione" type="text" name="ragioneSociale" className={css.formInput} placeholder="Ragione sociale" />
                      </div>
                      <div>
                        <label htmlFor="portal-piva" className={css.formLabel}>{t("careers.form.piva")}</label>
                        <input id="portal-piva" type="text" name="piva" className={css.formInput} placeholder="P.IVA / CF" />
                      </div>
                      <div className={css.formRowFull}>
                        <label htmlFor="portal-pec" className={css.formLabel}>{t("careers.form.pec")}</label>
                        <input id="portal-pec" type="email" name="pec" className={css.formInput} placeholder="PEC" />
                      </div>
                      <div>
                        <label htmlFor="portal-regione" className={css.formLabel}>{t("careers.form.regione")}</label>
                        <input id="portal-regione" type="text" name="regione" className={css.formInput} placeholder="Regione / Province" />
                      </div>
                      <div>
                        <label htmlFor="portal-telefono" className={css.formLabel}>{t("careers.form.telefono")}</label>
                        <input id="portal-telefono" type="tel" name="telefono" className={css.formInput} placeholder="Telefono / WhatsApp" />
                      </div>
                      <div>
                        <label htmlFor="portal-email" className={css.formLabel}>{t("careers.form.email")}</label>
                        <input id="portal-email" type="email" name="email" className={css.formInput} placeholder="Email" />
                      </div>
                    </div>
                  </div>
                  <div className={css.formBlock}>
                    <span className={css.formLegend}>{t("careers.form.documentsLabel")}</span>
                    <ul className={css.docList}>
                      {(t("careers.form.documents", { returnObjects: true }) || []).map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                    <input type="file" name="documents" multiple accept=".pdf,.jpg,.jpeg,.png" className={css.fileInput} aria-label="Carica documenti" />
                  </div>
                  <button type="submit" className={css.formSubmit}>{formCta}</button>
                </form>
              </div>
            </div>
          </section>

          {testimonialsList.length > 0 && (
            <section className={`${css.section} ${css.sectionAlt}`} aria-labelledby="portal-testimonials-heading">
              <div className={css.container}>
                <h2 id="portal-testimonials-heading" className={css.sectionTitle}>{t("careers.testimonialsTitle")}</h2>
                <div className={css.testiGrid}>
                  {testimonialsList.map((tst, idx) => (
                    <blockquote key={idx} className={css.testiCard}>
                      <p className={css.testiQuote}>"{tst.quote}"</p>
                      <footer className={css.testiAuthor}>— {tst.author}</footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className={css.section} aria-labelledby="portal-faq-heading">
            <div className={css.container}>
              <h2 id="portal-faq-heading" className={css.sectionTitle}>{t("careers.faqTitle")}</h2>
              <div className={css.faqWrap}>
                {faqList.map((item, idx) => (
                  <details key={idx} className={css.faqItem}>
                    <summary className={css.faqSummary}>{item.q}</summary>
                    <div className={css.faqContent}>
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className={css.disclaimer} aria-label="Note legali">
            <div className={css.container}>
              <p className={css.disclaimerText}>{disclaimer}</p>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} canonical={canonical} />
      <main className="w-full bg-white" dir="ltr">
        {/* Hero */}
        <section className="w-full bg-gradient-to-br from-[#28509E] to-[#1b3155] text-white px-[20px] md:px-[40px] py-[48px] md:py-[64px]">
          <div className="w-full max-w-[1400px] mx-auto">
            <h1 className="font-[Rajdhani] font-[700] uppercase text-[28px] md:text-[40px] lg:text-[48px] leading-[1.15]">
              {h1}
            </h1>
            <p className="font-[Rajdhani] text-[22px] md:text-[28px] font-[600] mt-[16px] text-white/95">
              {heroTitle}
            </p>
            <p className="font-['Open_Sans'] text-white/90 text-[16px] md:text-[18px] leading-[1.8] mt-[12px] max-w-[800px]">
              {heroSubtitle}
            </p>
            <a
              href="#form-section"
              className="inline-flex items-center justify-center mt-[28px] px-[28px] py-[14px] bg-[#ff8a00] text-white font-[Rajdhani] font-[800] uppercase text-[16px] rounded-[0] hover:bg-[#e67a00] transition"
            >
              {ctaMain}
            </a>
          </div>
        </section>

        {/* Benefits 3 columns */}
        <section className="w-full bg-[#f5f7fa] py-[48px] md:py-[60px] border-b border-[#e0e6ee]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {benefitsList.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white border border-[#e0e6ee] rounded-[0] p-[24px]">
                  <h3 className="font-[Rajdhani] text-[#1b3155] text-[18px] font-[800] uppercase">
                    {typeof item === "object" && item?.title != null ? item.title : item}
                  </h3>
                  <p className="mt-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.75]">
                    {typeof item === "object" && item?.desc != null ? item.desc : typeof item === "object" ? item.title : item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chi può registrarsi / Profili */}
        <section className="w-full bg-white py-[48px] md:py-[60px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[28px]">
              {t(`${namespace}.profilesTitle`, "Chi può registrarsi")}
            </h2>
            <div className="space-y-[24px]">
              {profilesList.map((profile, idx) => (
                <div key={idx} className="border border-[#e0e6ee] rounded-[0] p-[22px] md:p-[28px]">
                  <h3 className="font-[Rajdhani] text-[#1b3155] text-[20px] md:text-[22px] font-[800] uppercase">
                    {profile.number}. {profile.title}
                  </h3>
                  <ul className="mt-[12px] space-y-[6px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.75] list-disc pl-[20px]">
                    {(profile.items || []).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perché registrarsi */}
        <section className="w-full bg-[#f5f7fa] py-[48px] md:py-[60px] border-y border-[#e0e6ee]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[20px]">
              {whyTitle}
            </h2>
            <ul className="space-y-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.8] list-disc pl-[22px]">
              {whyList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Come funziona */}
        <section className="w-full bg-white py-[48px] md:py-[60px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[24px]">
              {t(`${namespace}.howItWorksTitle`, "Come funziona")}
            </h2>
            <ol className="list-decimal list-inside space-y-[16px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] md:text-[16px] leading-[1.8]">
              {howList.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            {howNote && (
              <p className="mt-[20px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8]">
                {howNote}
              </p>
            )}
          </div>
        </section>

        {/* Form */}
        <section id="form-section" className="w-full bg-[#f5f7fa] py-[48px] md:py-[60px] border-t border-[#e0e6ee]">
          <div className="w-full max-w-[900px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[28px]">
              {formTitle}
            </h2>
            <form className="bg-white border border-[#e0e6ee] rounded-[0] p-[28px] md:p-[36px] space-y-[24px]" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-[Rajdhani] text-[#1b3155] font-[700] text-[16px] mb-[8px]">
                  {t(`${namespace}.form.categoriesLabel`, "Scegli la tua categoria")}
                </label>
                <div className="flex flex-wrap gap-[12px]">
                  {categoriesList.map((cat, idx) => (
                    <label key={idx} className="inline-flex items-center gap-[8px] font-['Open_Sans'] text-[15px]">
                      <input type="checkbox" name="category" value={cat?.value || cat} className="rounded border-[#28509E]" />
                      <span>{cat?.label || cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.ragioneSociale`, "Ragione Sociale")}</label>
                  <input type="text" name="ragioneSociale" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.piva`, "P.IVA / Codice Fiscale")}</label>
                  <input type="text" name="piva" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.pec`, "PEC")}</label>
                  <input type="email" name="pec" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.regione`, "Regione/Province operative")}</label>
                  <input type="text" name="regione" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.telefono`, "Telefono / WhatsApp")}</label>
                  <input type="tel" name="telefono" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.email`, "Email")}</label>
                  <input type="email" name="email" className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
              </div>
              {t(`${namespace}.form.descrizione`, "") && (
                <div>
                  <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.descrizione`)}</label>
                  <textarea name="descrizione" rows={3} className="w-full border border-[#e0e6ee] px-[14px] py-[10px] rounded-[0] font-['Open_Sans'] text-[15px]" />
                </div>
              )}
              <div>
                <label className="block font-['Open_Sans'] text-[#1b3155] font-[600] text-[14px] mb-[6px]">{t(`${namespace}.form.documentsLabel`, "Documenti da caricare")}</label>
                <ul className="list-disc pl-[20px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.7] space-y-[4px]">
                  {(t(`${namespace}.form.documents`, { returnObjects: true }) || []).map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
                <div className="mt-[12px]">
                  <input type="file" name="documents" multiple accept=".pdf,.jpg,.jpeg,.png" className="font-['Open_Sans'] text-[14px]" />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-[32px] py-[16px] bg-[#28509E] text-white font-[Rajdhani] font-[800] uppercase text-[18px] rounded-[0] hover:bg-[#214f9b] transition"
              >
                {formCta}
              </button>
            </form>
          </div>
        </section>

        {/* Testimonials */}
        {testimonialsList.length > 0 && (
          <section className="w-full bg-white py-[48px] md:py-[60px] border-t border-[#e0e6ee]">
            <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
              <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[24px]">
                {t(`${namespace}.testimonialsTitle`, "Testimonianze Partner")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {testimonialsList.map((tst, idx) => (
                  <blockquote key={idx} className="border-l-4 border-[#28509E] pl-[20px] py-[12px] font-['Open_Sans'] text-[#2a2a2a] text-[15px] leading-[1.8] italic">
                    "{tst.quote}" – {tst.author}
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="w-full bg-[#f5f7fa] py-[48px] md:py-[60px] border-t border-[#e0e6ee]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px]">
            <h2 className="font-[Rajdhani] text-[#1b3155] text-[28px] md:text-[34px] font-[800] uppercase mb-[24px]">
              {t(`${namespace}.faqTitle`, "FAQ – Domande frequenti")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {faqList.map((item, idx) => (
                <details key={idx} className="bg-white border border-[#e0e6ee] rounded-[0] px-[20px] py-[14px]">
                  <summary className="cursor-pointer font-[Rajdhani] font-[800] text-[#1b3155] text-[15px]">
                    {item.q}
                  </summary>
                  <p className="mt-[10px] font-['Open_Sans'] text-[#2a2a2a] text-[14px] leading-[1.8]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="w-full bg-[#fff8f0] border border-[#e8dcc8] py-[28px] px-[20px] md:px-[40px]">
          <div className="w-full max-w-[1400px] mx-auto">
            <p className="font-['Open_Sans'] text-[#2a2a2a] text-[14px] md:text-[15px] leading-[1.8]">
              {disclaimer}
            </p>
          </div>
        </section>

        {/* CTA finale */}
        <section className="w-full bg-[#28509E] text-white py-[48px] md:py-[60px]">
          <div className="w-full max-w-[1400px] mx-auto px-[20px] md:px-[40px] text-center">
            <p className="font-['Open_Sans'] text-[18px] md:text-[20px] leading-[1.7] max-w-[720px] mx-auto mb-[24px]">
              {ctaFinal}
            </p>
            <a
              href="#form-section"
              className="inline-flex items-center justify-center px-[32px] py-[16px] bg-[#ff8a00] text-white font-[Rajdhani] font-[800] uppercase text-[18px] rounded-[0] hover:bg-[#e67a00] transition"
            >
              {t(`${namespace}.ctaFinalButton`, "Registrati ora")}
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
