# OpenNucMed

**An open-source, vendor-neutral educational web platform for Nuclear Medicine patients, students, and clinical trainees.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-React-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)

---

## Why OpenNucMed?

Nuclear Medicine combines clinical healthcare, radiochemistry, and radiation physics—yet accessible, modern, open-source educational tools are scarce:

- **For patients:** Undergoing a PET/CT, SPECT/CT, scintigraphy, or radionuclide therapy often triggers unnecessary anxiety around radioactivity and preparation rules. Most patients only receive static hospital PDFs or dense text leaflets.
- **For students & trainees:** Medical imaging students and nuclear medicine interns lack free, interactive, vendor-neutral platforms to practice clinical imaging review, decay physics, hotlab workflows, and radiation safety outside expensive proprietary training suites.

**OpenNucMed** is designed to fill this gap with a lightweight, modular open-source application that hospitals, universities, and educators worldwide can freely use, adapt, translate, and self-host.

---

## Implemented Modules

### Patient Information Center
- **What is Nuclear Medicine & Procedures:** Accessible guides covering common diagnostic exams and radionuclide therapies.
- **Scan Preparation & Practical Info:** Clear patient walkthroughs for preparation steps, practical expectations, and frequently asked questions.
- **Radiation Safety:** Plain-language explanations putting medical radiation exposure and safety guidelines into perspective.
- **Interactive Hospital Map & Search:** Built-in navigation and site-wide search to help patients quickly find relevant exam information.

### Student & Trainee Academy
- **PACS Simulator:** Interactive viewer featuring a viewport grid, patient browser, tooltips, and clinical reporting layout for practicing image review workflows.
- **Radioactive Decay Simulator:** Interactive exploration of radionuclide half-life and activity decay behavior.
- **Hotlab Module:** Educational overview of radiopharmacy and hotlab workflows.
- **Diagnostic Atlas, Anatomy Viewer & Physiology:** Visual reference modules connecting scan techniques with clinical anatomy and physiology.
- **Academy Dashboard & Knowledge Quiz:** Structured learning dashboard with interactive self-assessment quizzes.

---

## Tech Stack & Project Structure

- **Framework:** React + TypeScript
- **Build Tool:** Vite

```text
├── App.tsx                 # Main application entry & routing
├── components/
│   ├── pacs/               # Modular PACS simulator (ViewportGrid, PatientBrowser, ClinicalReport)
│   ├── pages/              # Patient & informational pages (Procedures, Preparation, Therapy, Safety, FAQ)
│   ├── DecaySimulator.tsx  # Interactive isotope decay simulator
│   ├── HotlabPage.tsx      # Radiopharmacy / hotlab module
│   ├── DiagnosticAtlas.tsx # Clinical diagnostic reference
│   ├── AnatomyViewer.tsx   # Interactive anatomy module
│   ├── AcademyDashboard.tsx# Student learning hub
│   └── KnowledgeQuiz.tsx   # Interactive knowledge checks
├── data/
│   └── constants.ts        # Structured clinical & educational datasets
└── public/                 # Static visual assets
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone [https://github.com/merijncampo/](https://github.com/merijncampo/)<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Run the local development server
npm run dev

# 4. Build for production
npm run build
```

---

## Roadmap

- [x] Core React/TypeScript/Vite platform with patient guides and interactive student simulators
- [ ] **Architecture Cleanup:** Consolidate duplicated components and decouple clinical data into clean, typed schemas
- [ ] **Internationalization (i18n):** Separate all text into translation files so international departments can localize content without editing code
- [ ] **Accessibility & Testing:** Add automated tests and full WCAG accessibility compliance for patients
- [ ] **Self-Hosting Templates:** Add one-click deployment templates (GitHub Pages, Netlify, Docker) for hospitals and universities

---

## Contributing

Contributions are welcome from both clinical and technical backgrounds:

- **Nuclear Medicine Technologists, Physicians & Physicists:** Review clinical accuracy, expand procedure guides, or propose new trainee cases.
- **Translators:** Help localize patient and student content into additional languages.
- **Developers & Designers:** Help refactor components, improve accessibility, add tests, and expand interactive simulators.

Please open an [Issue](../../issues) first to discuss larger changes before submitting a Pull Request.

---

## Medical Disclaimer

> All content, simulators, and tools in this repository are provided strictly for **educational and informational purposes**. They do **not** constitute medical advice, diagnosis, or treatment, and do not replace local hospital protocols or guidance from qualified healthcare professionals. Patients should always follow the specific instructions provided by their own Nuclear Medicine department.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
