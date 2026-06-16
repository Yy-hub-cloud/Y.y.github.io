import type { ReactNode } from "react";
import { navItems, profile } from "./site-data";

export type ActiveNav = "Home" | "Publications" | "Awards" | "Contact";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const assetPath = (path: string) => `${basePath}${path}`;

export function routePath(path: string) {
  if (path === "/") {
    return basePath ? `${basePath}/` : "/";
  }

  return `${basePath}${path}/`;
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h14a2.5 2.5 0 0 1 2.5 2.5v13A2.5 2.5 0 0 1 19 21H5a2.5 2.5 0 0 1-2.5-2.5v-13Zm2.2-.3 7.3 5.3 7.3-5.3H4.7Zm14.8 2.2-6.8 4.95a1.2 1.2 0 0 1-1.4 0L4.5 7.4v11.1c0 .28.22.5.5.5h14a.5.5 0 0 0 .5-.5V7.4Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function CvIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h8l5 5v15H6V2Zm7 1.8V8h4.2L13 3.8ZM8 11v1.7h8V11H8Zm0 3.5v1.7h8v-1.7H8Zm0 3.5v1.7h5V18H8Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.73c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.36 2.63 2.96 1.88.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.1-2.99 0 0 .94-.3 3.1 1.16a10.65 10.65 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.6 1.56.22 2.71.1 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.64 5.29-5.15 5.57.4.35.76 1.04.76 2.1v3.15c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

export function GraduationCapIcon() {
  return (
    <svg className="edu-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 1.5 8.2 12 13.4l8-3.96V16h2V8.2L12 3Zm-6 8.8v4.1c0 1.9 3.1 3.6 6 3.6s6-1.7 6-3.6v-4.1l-6 3-6-3Z" />
    </svg>
  );
}

export function SiteHeader({
  active,
  variant = "default",
}: {
  active: ActiveNav;
  variant?: "default" | "overlay";
}) {
  return (
    <header className={`topbar${variant === "overlay" ? " topbar-overlay" : ""}`}>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href={routePath("/")}>
          {profile.name}
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a className={item.label === active ? "active" : undefined} href={routePath(item.href)} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href={assetPath(profile.cvPath)}>
          CV
        </a>
      </nav>
    </header>
  );
}

export function ProfileCard() {
  return (
    <aside className="profile-card" id="contact">
      <img className="portrait" src={assetPath(profile.portraitPath)} alt={`Portrait of ${profile.name}`} />
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
      <p className="affiliation">
        <a href={profile.affiliationUrl}>{profile.affiliation}</a>
      </p>
      <div className="contact-list" aria-label="Contact links">
        <a className="contact-link" href={`mailto:${profile.email}`}>
          <EmailIcon />
          <span>Email</span>
        </a>
        <a className="contact-link" href={`tel:${profile.phone}`}>
          <PhoneIcon />
          <span>Phone</span>
        </a>
        <a className="contact-link" href={assetPath(profile.cvPath)}>
          <CvIcon />
          <span>CV</span>
        </a>
        <a className="contact-link" href={profile.githubUrl}>
          <GitHubIcon />
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <span>&copy; 2026 {profile.name}</span>
      <span>Static academic homepage for GitHub Pages</span>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <section className="subpage-hero">
      <p className="subpage-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="subpage-intro">{children}</div>
    </section>
  );
}
