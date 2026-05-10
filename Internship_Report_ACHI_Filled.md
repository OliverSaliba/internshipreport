# CSC 480 – Internship Final Report

**Notre Dame University – Louaize**  
Faculty of Natural and Applied Sciences  
Computer Science Department  

**Student’s Name:** [YOUR FULL NAME]  
**ID:** [YOUR STUDENT ID]  
**Fall 2025**

---

## Preface and Acknowledgment

This internship report documents work performed on the public-facing web application for **ACHI Scaffolding** ([https://achiscaffolding.com/](https://achiscaffolding.com/)), a company that provides engineered scaffolding, temporary works, and related services. The internship focused on **front-end development** of a multilingual marketing and lead-generation website implemented as a **single-page application (SPA)** using **React**.

The main deliverables included implementing and refining user-facing pages (home, projects, services, contact, blog, gallery, product catalog with 3D preview), improving **Italian-market** content and routing, **SEO** and structured data (JSON-LD, sitemap generation), accessibility-oriented UI patterns, and integration of contact flows (**Formik** / **Yup** validation, external script submission).

I acknowledge the supervision and feedback from my internship supervisor and the ACHI team. Finally, I thank Notre Dame University – Louaize and the Computer Science Department for the opportunity to apply coursework in a professional software project.

**Formatting note (if pasting into the Word template):** use **12 pt** body text and **1.5** line spacing; keep total length within the instructor’s **10-page** limit.

---

## Table of Contents

- Preface and Acknowledgment  
- Chapter 1: Introduction  
  - 1.1 Company Background  
  - 1.2 Internship Objectives  
  - 1.3 My Expectations  
  - 1.4 Structure of the Report  
- Chapter 2: Technology Background  
  - 2.1 Software  
  - 2.2 Hardware  
- Chapter 3: Description of the Work  
  - 3.1 Work Done as an Intern  
  - 3.2 Problems Encountered  
  - 3.3 Impact of Your Work  
- Chapter 4: Conclusion  
  - 4.1 Experience Gained During the Internship  
  - 4.2 Self-Evaluation  
- List of Tables  
- List of Figures  

---

## List of Tables

| ID | Title |
|----|--------|
| Table 2.1 | Primary software stack (summary) |

---

## List of Figures

| ID | Title |
|----|--------|
| Figure 3.1 | High-level route diagram (placeholder) |

---

# Chapter 1: Introduction

## 1.1 Company Background

**ACHI Scaffolding** (branded online as ACHI) operates in the construction access sector: scaffolding systems, façade access, temporary structures, and related services. The production website targets Lebanon and broader regions, with additional **Italian-language** experiences and **Italy-specific** routes (for example Italian-only pages such as “Settori di applicazione” and Italian project case studies) controlled by **feature flags** and **language-aware routing** in the codebase.

The internship repository centers on the front-end application under **`Frontend/`**, built with **Create React App** (`react-scripts` 5). The application homepage is configured as **https://achiscaffolding.com/** in `Frontend/package.json`.

## 1.2 Internship Objectives

Primary objectives aligned with the project were:

1. Implement and maintain **React** components and pages with consistent UX.  
2. Support **internationalization** (`i18next`) for multiple languages.  
3. Implement **forms** with validation and safe submission patterns.  
4. Improve **SEO** artifacts (meta tags, canonical URLs, sitemap generation scripts).  
5. Collaborate on **content-heavy** sections (projects, services, AEO/FAQ blocks) without breaking routing or translation keys.

## 1.3 My Expectations

I expected to gain experience with a **real deployed React codebase**, Git-based collaboration, and the full cycle from UI implementation to production build. I also expected exposure to performance and SEO concerns typical of marketing sites (image formats, lazy loading, structured data).

## 1.4 Structure of the Report

**Chapter 2** summarizes the software stack and tooling inferred from `package.json` and project structure. **Chapter 3** describes concrete modules and features implemented or modified in the repository. **Chapter 4** reflects on outcomes and self-evaluation.

---

# Chapter 2: Technology Background

## 2.1 Software

**Operating system:** Windows 10/11 (development environment on the intern workstation). **Runtime:** Node.js with **npm** for dependency management.

**Core framework and libraries** (from `Frontend/package.json`): **React** 18.2, `react-dom`, **react-router-dom** 6.17 for client-side routing, **react-i18next** and **i18next** for translations, **framer-motion** for UI motion, **Formik** and **Yup** for forms, **@mui/material** and **@emotion** for Material UI components, **Tailwind CSS** 3.2 as a utility-first styling layer, **react-slick** and **slick-carousel** for carousels, **three** for optional 3D product visualization (`Product3DView`), **react-helmet-async** for document head management, and testing utilities (**@testing-library/react**). Build tooling is provided by **Create React App** (`react-scripts` 5.0.1).

**Additional scripts:** `generate:sitemap` (`node scripts/generateSitemap.js`) invoked before `build`, **postbuild** copy of a 404 page (`scripts/copy-404.js`), and optional WebP generation (`scripts/generateWebp.js`). **gh-pages** appears as a devDependency for static hosting workflows.

### Table 2.1: Primary software stack (summary)

| Category | Technology |
|----------|------------|
| Language | JavaScript (React) |
| UI | React components, Tailwind CSS, MUI |
| Routing | React Router v6 |
| i18n | i18next / react-i18next |
| Forms | Formik + Yup |
| Motion | Framer Motion |
| SEO | Helmet, JSON-LD components, sitemap script |
| Build | Create React App (webpack/babel via react-scripts) |

## 2.2 Hardware

No specialized industrial hardware was required for this internship. Development used standard office hardware: a PC with sufficient RAM for Node/Webpack builds, a display for UI testing, and network access for dependency installation and deployment verification.

---

# Chapter 3: Description of the Work

## 3.1 Work Done as an Intern

The repository implements a **marketing and lead-generation** website with many routed pages. Key areas observed and worked on in the codebase include:

**Routing and layout:** `Frontend/src/routes/AppRoutes.js` defines the main route tree (Home, About, Products, Product3DView, Projects, Sectors, `SettoriApplicazioniIt` when Italy is enabled, ProjectDetails, Gallery, Blog, BlogItem, Services, SingleService, Careers, PrivacyPolicy, PageNotFound). Language handling is integrated via **LangRouter** and URL language segments.

**Projects experience:** `Projects.js` lists featured projects for Italian vs default locales; `ProjectDetails.js` loads per-project **media** (hero and gallery images) and binds long-form Italian content from translation JSON (`it.json` under `projectDetails.items.*`). `ProjectsOverview.js` renders the projects strip on the home page with **SmartLink** navigation to `/project/:id`.

**Italian market pages:** `SettoriApplicazioniIt.jsx` implements the Italian-only “settori” page with hero video, glass-style hero panel (CSS module), sector cards with **Font Awesome** icons aligned to shared sector data (`settoriApplicazioniIt.js`), and a Formik/Yup contact form posting to a configurable script URL (`REACT_APP_CONTACT_SCRIPT_URL`).

**SEO and quality:** components under `seo/` (e.g., RouteSeo, sitemap routes), JSON-LD in pages like `Home.js` and `About.js`, and defensive helpers such as **mixed content guard** initialization in `AppRoutes.js`.

### 3.1.1 Requirements Analysis

Requirements were inferred from existing routes, translation keys, and stakeholder requests (e.g., correct image mapping per project slug, Italian-only flows, hero/gallery consistency). The codebase separates **content** (JSON translations) from **presentation** (React components), which constrained changes to avoid breaking i18n keys.

### 3.1.2 Software Design

The design follows a **component-based** architecture: reusable UI (Header, Footer, ContactForm), page-level containers, and SEO components. Feature flags (e.g., `ITALY_ENABLED`) gate Italian-only routes and UI.

### 3.1.3 User Interface Design

UI work combined **Tailwind** utility classes with occasional **CSS modules** for complex sections (e.g., Italian hero glass panels, sectors bar styling). Motion was applied via **framer-motion** for scroll reveals and hero animations, with **reduced-motion** awareness in several pages.

### 3.1.4 Coding

Coding tasks included JSX/React updates, translation JSON edits for Italian copy, image path corrections in `ProjectsOverview.js`, `Projects.js`, and `ProjectDetails.js` (`PROJECT_MEDIA` map), and styling adjustments for readability and brand colors (**#28509E** accent appears across UI).

### 3.1.5 Testing

The project includes CRA test scaffolding (@testing-library). Practical testing during internship work centered on **manual** route verification, visual checks for hero/gallery alignment, and form validation behavior in browsers.

### 3.1.6 Documentation

`README.md` in `Frontend/` retains Create React App boilerplate (**note:** resolve any merge markers before submission). SEO documentation is embedded in code via `seoConfig` and sitemap route lists.

### 3.1.7 Preparing Training Manuals

Not a primary deliverable in the repository; any internal handover would be via README/runbook and environment variables documented in code (e.g., `REACT_APP_CONTACT_SCRIPT_URL`).

### 3.1.8 Deployment

Production build pipeline: `npm run build` runs sitemap generation then `react-scripts build`; postbuild copies 404 handling. The configured homepage is **https://achiscaffolding.com/**.

### 3.1.9 Customer Support

The site exposes contact channels (phone, WhatsApp, contact forms) consistent with business schema in `AppRoutes.js` (**+96103322811**, **achi.gr@hotmail.com**) and Italian-specific CTAs where translations provide them.

### Figure 3.1 (placeholder): High-level route diagram

**Browser → React Router → Page components → i18n JSON / public assets → SEO head + JSON-LD.**

*(Replace with an actual diagram in Word if required.)*

## 3.2 Problems Encountered

Challenges included: (1) separating **routing correctness** from **content/media mapping** errors when multiple locales share similar project names; (2) maintaining **SEO** and **translation key** integrity while updating images; (3) balancing decorative motion with **accessibility** (`prefers-reduced-motion` patterns in parts of the app); (4) **merge-conflict** residue in README that should be cleaned for professional repository hygiene.

**Ethical / legal / social considerations:** public websites must present accurate project imagery and truthful service descriptions; forms must respect privacy expectations (GDPR copy on Italian forms) and avoid broken analytics or mixed-content issues (`mixedContentGuard`).

## 3.3 Impact of Your Work

Improved clarity of **Italian** project presentation supports trust for EU-based prospects. SEO and structured data improve **discoverability**. Stable forms and CTAs reduce friction for commercial inquiries, with global reach via multilingual content.

---

# Chapter 4: Conclusion

## 4.1 Experience Gained During the Internship

I strengthened skills in **React**, component composition, router-based **localization**, and pragmatic **SEO** for marketing sites. I learned to navigate a mid-size front-end codebase, trace data from translation files to UI, and validate changes across multiple pages that reuse similar patterns.

## 4.2 Self-Evaluation

**Strengths:** attention to cross-page consistency (home cards vs detail media), willingness to iterate on UI feedback, and systematic tracing of bugs to **data sources** rather than only components.

**Areas to improve:** earlier verification of asset-to-project mapping with stakeholders, automated visual or route tests for critical marketing pages, and keeping repository documentation conflict-free.

---

**Before submission:** replace **[YOUR FULL NAME]** and **[YOUR STUDENT ID]**, and align dates, duration, and supervisor/employer names with your official internship record.
