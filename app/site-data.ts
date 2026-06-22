import publicationItems from "./publications-data.json";

export type AuthorRole = "first" | "co-first" | "other";

export type PublicationItem = {
  source?: string;
  openAlexId?: string;
  doi?: string;
  publicationDate?: string;
  venue?: string;
  status: string;
  citations: string;
  title: string;
  authors: string;
  imagePath: string;
  projectHref: string;
  highlights: string[];
  overview: string;
  isPlaceholder?: boolean;
  isPublished?: boolean;
  authorRole?: AuthorRole;
};

const authorRolePriority: Record<AuthorRole, number> = {
  first: 0,
  "co-first": 0,
  other: 1,
};

function normalizeAuthorRole(role: string | undefined): AuthorRole {
  if (role === "first" || role === "co-first") {
    return role;
  }

  return "other";
}

function comparePublications(a: PublicationItem, b: PublicationItem) {
  const roleDifference =
    authorRolePriority[normalizeAuthorRole(a.authorRole)] -
    authorRolePriority[normalizeAuthorRole(b.authorRole)];

  if (roleDifference !== 0) {
    return roleDifference;
  }

  return (b.publicationDate ?? "").localeCompare(a.publicationDate ?? "");
}

function isVisiblePublishedPublication(item: PublicationItem) {
  return item.isPublished === true && item.isPlaceholder !== true;
}

const publicationData = publicationItems as PublicationItem[];

export const profile = {
  name: "Yang Yu",
  role: "PhD Student",
  affiliation: "Nankai University",
  affiliationUrl: "https://www.nankai.edu.cn/",
  location: "Nankai University, Tianjin, China",
  mapQuery: "Nankai University, Tianjin, China",
  email: "e1352120@u.nus.edu",
  phone: "+8615647226966",
  githubUrl: "https://github.com/",
  cvPath: "/cv.pdf",
  portraitPath: "/profile.jpg",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Publications", href: "/publications" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

export const researchAreas = [
  {
    label: "01",
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
    label: "02",
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

export const publications = [...publicationData].sort(comparePublications);

export const publishedPublications = publications.filter(isVisiblePublishedPublication);

export const publication = publishedPublications[0] ?? publications[0];

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
  },
  {
    period: "2020.9 - 2024.6",
    degree: "BEng in Materials Science and Engineering",
    school: "Jilin University, China",
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
