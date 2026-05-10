import React, { useMemo } from "react"
import { motion } from "framer-motion"
import Slider from "react-slick"
import { useTranslation } from "react-i18next"
import ImageWebp from "./ImageWebp"
import { useLangRouter } from "../routing/LangRouter"

function SampleNextArrow(props) {
  const { className, style, onClick, assetBase } = props
  return (
    <button
      type="button"
      aria-label="Next client logos"
      onClick={onClick}
      className={`${className} clients-arrow clients-next`}
      style={{ ...style }}
    >
      <img src={`${assetBase}/assets/clients arrow right.svg`} alt="" aria-hidden="true" />
    </button>
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick, assetBase } = props
  return (
    <button
      type="button"
      aria-label="Previous client logos"
      onClick={onClick}
      className={`${className} clients-arrow clients-prev`}
      style={{ ...style }}
    >
      <img src={`${assetBase}/assets/clients arrow left.svg`} alt="" aria-hidden="true" />
    </button>
  )
}

const Clients = ({ direction }) => {
  const { t } = useTranslation()
  const ASSET = process.env.PUBLIC_URL || ""
  const { urlLang } = useLangRouter()
  const isItalian = (urlLang || "").toLowerCase().startsWith("it")

  const italianClientLogos = useMemo(
    () => [
      { src: `${ASSET}/assets/italian version/WhatsApp Image 2026-02-04 at 2.30.08 PM (1).jpeg`, name: t("clients.italianClient1", "Cliente 1") },
      { src: `${ASSET}/assets/italian version/WhatsApp Image 2026-02-04 at 2.30.08 PM (2).jpeg`, name: t("clients.italianClient2", "Cliente 2") },
      { src: `${ASSET}/assets/italian version/WhatsApp Image 2026-02-04 at 2.30.08 PM.jpeg`, name: t("clients.italianClient3", "Cliente 3") },
    ],
    [ASSET, t]
  )

  const defaultLogos = useMemo(
    () => [
      { file: "abc.png", name: "ABC" },
      { file: "aishti.webp", name: "Aishti" },
      { file: "algeco.webp", name: "Algeco" },
      { file: "ambassade.png", name: "Ambassade" },
      { file: "aub.png", name: "American University of Beirut (AUB)" },
      { file: "bankaudi.png", name: "Bank Audi" },
      { file: "bloc.png", name: "Bloc" },
      { file: "chaddad.webp", name: "Chaddad" },
      { file: "croix.webp", name: "Croix" },
      { file: "damac.png", name: "Damac" },
      { file: "general.webp", name: "General" },
      { file: "hicon.png", name: "Hicon" },
      { file: "imar.png", name: "Imar" },
      { file: "jesh.webp", name: "Jesh" },
      { file: "ka.webp", name: "KA" },
      { file: "kbuild.png", name: "KBuild" },
      { file: "kfoury.webp", name: "Kfoury" },
      { file: "mac.webp", name: "MAC" },
      { file: "Man.webp", name: "MAN" },
      { file: "modec.png", name: "Modec" },
      { file: "parissis.webp", name: "Parissis" },
      { file: "solidere.png", name: "Solidere" },
      { file: "spinneys.webp", name: "Spinneys" },
      { file: "vaccum.webp", name: "Vaccum" },
      { file: "zerock.gif", name: "Zerock" }
    ],
    []
  )

  const logos = isItalian ? italianClientLogos : defaultLogos
  const useItalianImages = isItalian

  const settings = useMemo(() => ({
    dots: false,
    infinite: !isItalian,
    autoplay: !isItalian,
    speed: 700,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    swipeToSlide: true,
    swipe: true,
    slidesToShow: isItalian ? 3 : 5,
    slidesToScroll: 1,
    arrows: true,
    rtl: direction === "rtl",
    nextArrow: <SampleNextArrow assetBase={ASSET} />,
    prevArrow: <SamplePrevArrow assetBase={ASSET} />,
    responsive: isItalian
      ? [
          { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "20px" } },
          { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } }
        ]
      : [
          {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "0px", arrows: true }
          },
          { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } }
        ]
  }), [isItalian, direction, ASSET])

  return (
    <section
      id="clients"
      className={`text-center ${useItalianImages ? "pt-[32px] pb-[12px] md:pt-[40px] md:pb-[16px]" : "pt-[50px] pb-[10px] md:pt-[70px] md:pb-[0px]"}`}
      aria-labelledby="home-clients-title"
    >
      <motion.h2
        id="home-clients-title"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className={`font-[Rajdhani] text-h2 font-[700] uppercase leading-[1.15] text-[#003A80] text-center ${useItalianImages ? "mb-[8px]" : "mb-[14px]"}`}
      >
        {t("clients.title")}
      </motion.h2>

      <p className={`hidden md:block font-saira text-body text-[#003A80] opacity-90 max-w-[900px] mx-auto px-[20px] leading-[26px] ${useItalianImages ? "mb-[20px]" : "mb-[40px]"}`}>
        {t("clients.description")}
      </p>

      <div className={`relative max-w-[1250px] mx-auto ${useItalianImages ? "px-[16px] md:px-[24px]" : "px-[40px] md:px-[20px]"}`} aria-label="Client logos carousel">
        <Slider {...settings}>
          {logos.map((item, idx) => {
            const src = useItalianImages ? item.src : `${ASSET}/assets/clients/${item.file}`
            const isGif = !useItalianImages && item.file && item.file.toLowerCase().endsWith(".gif")
            const altText = `${item.name} logo`

            return (
              <div key={useItalianImages ? `it-${idx}` : `${item.file}-${idx}`}>
                <div className="flex items-center justify-center w-full">
                  <div className={`w-full flex items-center justify-center mx-auto ${useItalianImages ? "max-w-[340px] min-h-[200px] md:min-h-[240px]" : "max-w-[220px] h-[120px]"}`}>
                    {useItalianImages || isGif ? (
                      <img
                        src={src}
                        alt={altText}
                        className={useItalianImages ? "max-h-[220px] md:max-h-[260px] max-w-[320px] w-auto h-auto object-contain" : "max-h-[110px] max-w-[200px] w-auto h-auto object-contain"}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <ImageWebp
                        srcWebp={src}
                        src={src}
                        alt={altText}
                        className="max-h-[110px] max-w-[200px] w-auto h-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>

        <style>{`
          #clients .slick-prev,
          #clients .slick-next {
            width: 44px !important;
            height: 44px !important;
            z-index: 50 !important;
          }

          #clients .clients-arrow {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }

          #clients .clients-arrow img {
            width: 28px !important;
            height: 28px !important;
            display: block !important;
          }

          #clients .slick-prev { left: 10px !important; }
          #clients .slick-next { right: 10px !important; }

         @media (max-width: 767px) {
  #clients .slick-prev,
  #clients .slick-next {
    width: 28px !important;
    height: 28px !important;
  }

  #clients .clients-arrow img {
    width: 15px !important;
    height: 15px !important;
    opacity: 0.6 !important;
  }

  #clients .slick-prev { left: -6px !important; }
  #clients .slick-next { right: -6px !important; }
}

        `}</style>
      </div>
    </section>
  )
}

export default Clients
