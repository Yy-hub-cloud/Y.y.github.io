export const profile = {
  name: "Yang Yu",
  role: "PhD Student",
  affiliation: "Nankai University",
  affiliationUrl: "https://www.nankai.edu.cn/",
  email: "e1352120@u.nus.edu",
  phone: "+8615647226966",
  githubUrl: "https://github.com/",
  cvPath: "/cv.pdf",
  portraitPath: "/profile.jpg",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Education", href: "/education" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

export const researchTags = [
  "Flexible Bioelectronics",
  "Underwater Electrophysiology",
  "MEMS",
  "3D Stretchable Devices",
  "Electronic Skin",
  "Signal Analysis",
];

export const researchAreas = [
  {
    label: "01",
    title: "Underwater Electrophysiology",
    summary:
      "Flexible, tissue-adhesive electrodes designed for stable electrophysiological recording in dynamic wet environments.",
    details: [
      "Underwater EMG acquisition and stability evaluation.",
      "Wet tissue-electrode interface design.",
      "Signal fidelity analysis under dynamic motion.",
    ],
  },
  {
    label: "02",
    title: "Flexible & Stretchable Devices",
    summary:
      "Three-dimensional stretchable devices and electronic skin systems for conformal, durable biointerfaces.",
    details: [
      "Three-dimensional stretchable device architectures.",
      "Electronic skin for conformal sensing.",
      "Materials and mechanics for reliable soft systems.",
    ],
  },
  {
    label: "03",
    title: "MEMS & Microfabrication",
    summary:
      "MEMS-enabled device integration, micro/nanofabrication, and materials characterization for stretchable systems.",
    details: [
      "Micro/nanofabrication process development.",
      "MEMS device integration and packaging.",
      "Materials characterization for interface reliability.",
    ],
  },
];

export const publication = {
  status: "In preparation",
  citations: "TBD",
  title: "Underwater Electrophysiological Interface for Stable Muscle Signal Acquisition",
  authors: "Yang Yu, collaborators, and Changsheng Wu",
  imagePath: "/publication-placeholder.svg",
  projectHref: "#",
  highlights: [
    "Stable underwater EMG acquisition with SNR > 30 dB and continuous recording over 30 min.",
    "Flexible tissue-adhesive electrodes for dynamic wet environments.",
    "Signal fidelity evaluation and fatigue-related feature extraction.",
  ],
  overview:
    "This work focuses on stable muscle-signal acquisition in underwater environments through flexible tissue-adhesive electrodes and signal-analysis workflows.",
};

export const educationItems = [
  {
    period: "Present",
    degree: "PhD in Physical Chemistry",
    school: "Nankai University, China",
  },
  {
    period: "2024.7 - 2025.7",
    degree: "MSc in Materials Science and Engineering",
    school: "National University of Singapore, Singapore",
    detail: "GPA: 4.25/5",
  },
  {
    period: "2020.9 - 2024.6",
    degree: "BEng in Materials Science and Engineering",
    school: "Jilin University, China",
    detail: "GPA: 82.51/100",
  },
];

export const awards = [
  {
    name: "Jilin University Single-Item Scholarship",
    year: "2021 - 2023",
  },
  {
    name: "Jilin University Third-Class Scholarship",
    year: "2023",
  },
  {
    name: "Jilin University New Oriental Vision Overseas Scholarship",
    year: "2024",
  },
];
