import { ProfileCard, SiteFooter, SiteHeader, assetPath, routePath } from "./site-components";
import { awards, educationItems, publication, researchAreas, researchTags } from "./site-data";

export default function Home() {
  return (
    <>
      <SiteHeader active="Home" />

      <main>
        <section className="hero-shell" id="home" aria-labelledby="hero-title">
          <ProfileCard />

          <div className="hero-content">
            <h2 id="hero-title" className="hero-title">
              Flexible Bioelectronics and Underwater Electrophysiology
            </h2>
            <div className="intro">
              <p>
                My research focuses on bio-integrated electronics and micro/nano-fabrication
                technologies for next-generation interfaces, including flexible bioelectronics,
                underwater electrophysiology, MEMS sensors, stretchable devices, and electronic
                skin.
              </p>
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href={assetPath("/cv.pdf")}>
                Download CV
              </a>
              <a className="button button-secondary" href="mailto:e1352120@u.nus.edu">
                Email Me
              </a>
              <a className="button button-ghost" href="https://github.com/">
                GitHub
              </a>
            </div>

            <div className="tag-cloud" aria-label="Research keywords">
              {researchTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="focus-strip" id="research" aria-labelledby="research-title">
          <div className="focus-heading">
            <h2 id="research-title">Research Focus</h2>
            <a className="section-more" href={routePath("/research")}>
              View all
            </a>
          </div>
          <div className="research-grid">
            {researchAreas.map((area) => (
              <article className="research-card" key={area.title}>
                <span className="research-mark" aria-hidden="true">
                  {area.label}
                </span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="overview-grid">
          <section className="overview-section publication-section" id="publications" aria-labelledby="publications-title">
            <h2 id="publications-title">Selected Publication</h2>
            <article className="publication-card">
              <div className="publication-figure">
                <img src={assetPath(publication.imagePath)} alt="Publication figure placeholder" />
              </div>
              <div className="publication-content">
                <div className="publication-meta">
                  <span>{publication.status}</span>
                  <span>Citations: {publication.citations}</span>
                </div>
                <h3>{publication.title}</h3>
                <p className="publication-authors">{publication.authors}</p>
                <ul className="highlight-list">
                  {publication.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <a className="project-link" href={routePath("/publications")}>
                  View Publication
                </a>
              </div>
            </article>
          </section>

          <section className="overview-section education-section" id="education" aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <div className="timeline">
              {educationItems.map((item) => (
                <article className="timeline-item" key={item.degree}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div>
                    <h3>{item.degree}</h3>
                    <p className="school">{item.school}</p>
                    <p className="timeline-period">
                      {item.period}
                      {item.detail ? ` / ${item.detail}` : ""}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <a className="section-more" href={routePath("/education")}>
              Full education
            </a>
          </section>

          <section className="overview-section awards-section" id="awards" aria-labelledby="awards-title">
            <h2 id="awards-title">Awards</h2>
            <div className="award-list">
              {awards.map((award) => (
                <article className="award-item" key={award.name}>
                  <span className="award-mark" aria-hidden="true">
                    Award
                  </span>
                  <span className="award-name">{award.name}</span>
                  <span className="award-year">{award.year}</span>
                </article>
              ))}
            </div>
            <a className="section-more" href={routePath("/awards")}>
              Full awards
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
