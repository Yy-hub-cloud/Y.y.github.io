import { CoverJump } from "./cover-jump";
import { COVER_SEEN_KEY } from "./cover-session";
import { ResearchHeroFigure } from "./research-hero-figure";
import { ProfileCard, SiteFooter, SiteHeader, assetPath, routePath } from "./site-components";
import { awards, educationItems, profile, publishedPublications } from "./site-data";

const valueSteps = [
  {
    label: "01",
    title: "3D formability",
    summary: "A flat precursor becomes a stable three-dimensional structure through controlled release.",
  },
  {
    label: "02",
    title: "Stress as a design tool",
    summary: "Structure and stress are tuned together instead of relying only on intrinsic material selection.",
  },
  {
    label: "03",
    title: "More tunable performance",
    summary: "Mechanical and functional behavior gain a broader adjustment space during three-dimensional formation.",
  },
];

function MailIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6.5h15v11h-15v-11Zm1.4 1.4 6.1 4.5 6.1-4.5H5.9Zm12.2 1.8-5.4 4a1.18 1.18 0 0 1-1.4 0l-5.4-4v6.4h12.2V9.7Z" />
    </svg>
  );
}

function GitHubButtonIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.73c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.36 2.63 2.96 1.88.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.1-2.99 0 0 .94-.3 3.1 1.16a10.65 10.65 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.6 1.56.22 2.71.1 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.64 5.29-5.15 5.57.4.35.76 1.04.76 2.1v3.15c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function CvButtonIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h8l5 5v15H6V2Zm7 1.8V8h4.2L13 3.8ZM8 11v1.7h8V11H8Zm0 3.5v1.7h8v-1.7H8Zm0 3.5v1.7h5V18H8Z" />
    </svg>
  );
}

function renderAuthors(authors: string) {
  return authors.split(/(Yang Yu)/g).map((part, index) =>
    part === "Yang Yu" ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

export default function Home() {
  const featuredPublications = publishedPublications.slice(0, 5);
  const shouldScrollPublications = featuredPublications.length > 1;
  const rollingPublications = shouldScrollPublications
    ? [...featuredPublications, ...featuredPublications]
    : featuredPublications;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(window.sessionStorage.getItem(${JSON.stringify(COVER_SEEN_KEY)})==="true"){document.body.classList.add("cover-dismissed");}}catch(e){}`,
        }}
      />
      <CoverJump />

      <section
        className="landing-hero research-cover research-cover-reference"
        id="cover"
        aria-label="Controlled buckling from a flat precursor to a three-dimensional structure"
      >
        <div className="research-cover-campus" aria-hidden="true">
          <img src={assetPath("/hero-campus.png")} alt="" />
        </div>
        <div className="research-cover-layout">
          <div className="research-cover-intro">
            <h1>
              <span>Welcome to Yu Yang&apos;s</span>
              <span>homepage</span>
            </h1>
            <p className="research-cover-typewriter">Walk with excellence</p>
          </div>
          <div className="research-cover-art">
            <ResearchHeroFigure />
          </div>
        </div>
      </section>

      <div className="home-site home-site-redesign" id="home-content">
        <SiteHeader active="Home" />

        <main>
          <section className="hero-shell" id="home" aria-labelledby="hero-title">
            <ProfileCard />

            <div className="hero-content">
              <h2 id="hero-title" className="hero-title">
                Welcome to my homepage
              </h2>
              <p className="welcome-motto">Walk with excellence</p>
              <div className="intro">
                <p>
                  I work at the intersection of materials science, flexible electronics, and
                  bioelectronic interfaces. My current research explores micro/nano-fabrication,
                  MEMS-enabled devices, stretchable systems, and electrophysiological signal
                  acquisition for wet and dynamic environments.
                </p>
              </div>

              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${profile.email}`}>
                  <MailIcon />
                  Email Me
                </a>
                <a className="button button-secondary" href={profile.githubUrl}>
                  <GitHubButtonIcon />
                  GitHub
                </a>
                <a className="button button-ghost" href={assetPath(profile.cvPath)}>
                  <CvButtonIcon />
                  Download CV
                </a>
              </div>
            </div>
          </section>

          <section className="value-stage" id="research" aria-labelledby="value-stage-title">
            <span className="section-eyebrow">Why this work matters</span>

            <div className="value-stage-grid">
              <div className="value-stage-copy">
                <h2 id="value-stage-title">
                  Using structural stress control to expand the space of tunable performance
                </h2>
                <p>
                  Three-dimensional buckling is not only a change in shape. It turns a problem that often depends
                  on intrinsic material choice into one that can also be designed through structure and stress.
                </p>
                <p>
                  That shift opens a more controllable route for tuning behavior during formation, while keeping the
                  narrative grounded in the work that has already been completed and can be supported by figures.
                </p>
              </div>

              <div className="value-steps" aria-label="Research value pathway">
                {valueSteps.map((step) => (
                  <article className="value-step-card" key={step.label}>
                    <span className="value-step-label">{step.label}</span>
                    <h3>{step.title}</h3>
                    <p>{step.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div className="overview-grid">
            <section
              className="overview-section publication-section"
              id="publications"
              aria-labelledby="publications-title"
            >
              <div className="section-title-row">
                <h2 id="publications-title">Latest Publications</h2>
                <a className="section-more" href={routePath("/publications")}>
                  View all
                </a>
              </div>
              {featuredPublications.length > 0 ? (
                <>
                  <div className="publication-carousel" aria-label="Latest published publications">
                    <div
                      className={`publication-track${
                        shouldScrollPublications ? " publication-track-scrolling" : ""
                      }`}
                    >
                      {rollingPublications.map((item, index) => (
                        <article className="publication-card publication-slide" key={`${item.title}-${index}`}>
                          <div className="publication-figure">
                            <img src={assetPath(item.imagePath)} alt="" />
                          </div>
                          <div className="publication-content">
                            <div className="publication-meta">
                              <span>{item.status}</span>
                              <span>Citations: {item.citations}</span>
                            </div>
                            <h3>{item.title}</h3>
                            <p className="publication-authors">{renderAuthors(item.authors)}</p>
                            {item.doi ? (
                              <p className="publication-doi">
                                DOI:{" "}
                                <a href={`https://doi.org/${item.doi}`}>{item.doi}</a>
                              </p>
                            ) : null}
                            <ul className="highlight-list">
                              {item.highlights.slice(0, 2).map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                              ))}
                            </ul>
                            <a className="project-link" href={item.projectHref}>
                              View article
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                  {shouldScrollPublications ? (
                    <div className="carousel-note" aria-hidden="true">
                      Auto-scrolling latest publications
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="publication-empty">
                  Published articles will appear here after publication details are available.
                </div>
              )}
            </section>

            <section className="overview-section education-section" id="education" aria-labelledby="education-title">
              <h2 id="education-title">Education</h2>
              <div className="timeline">
                {educationItems.map((item) => (
                  <article className="timeline-item" key={`${item.school}-${item.degree}`}>
                    <div className="timeline-marker" aria-hidden="true" />
                    <div>
                      <h3>
                        {item.school}{" \u00b7 "}{item.degree}
                      </h3>
                      <p className="timeline-detail">
                        {item.major}{" \u00b7 "}{item.period}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
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
            </section>
          </div>
        </main>
      </div>

      <SiteFooter />
    </>
  );
}
