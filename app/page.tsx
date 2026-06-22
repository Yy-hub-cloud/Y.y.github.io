import { CoverJump } from "./cover-jump";
import { ProfileCard, SiteFooter, SiteHeader, assetPath, routePath } from "./site-components";
import { awards, educationItems, publishedPublications, researchAreas } from "./site-data";

export default function Home() {
  const featuredPublications = publishedPublications.slice(0, 5);
  const shouldScrollPublications = featuredPublications.length >= 5;
  const rollingPublications = shouldScrollPublications
    ? [...featuredPublications, ...featuredPublications]
    : featuredPublications;

  return (
    <>
      <CoverJump />

      <section className="landing-hero" id="cover" aria-labelledby="cover-title">
        <img className="landing-hero-image" src={assetPath("/hero-campus.png")} alt="" />
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <h1 id="cover-title">Welcome to Yu Yang's homepage</h1>
          <p className="cover-subtitle" aria-label="Walk with excellence">
            <span className="typewriter-text" aria-hidden="true">
              Walk with excellence
            </span>
          </p>
        </div>
        <button className="scroll-cue" type="button" aria-label="Enter homepage">
          <span />
        </button>
      </section>

      <div className="home-site" id="home-content">
        <SiteHeader active="Home" />

        <main>
          <section className="hero-shell" id="home" aria-labelledby="hero-title">
            <ProfileCard />

            <div className="hero-content">
              <h2 id="hero-title" className="hero-title">
                Welcome to my homepage
              </h2>
              <div className="intro">
                <p>
                  I work at the intersection of materials science, flexible electronics, and
                  bioelectronic interfaces. My current research explores micro/nano-fabrication,
                  MEMS-enabled devices, stretchable systems, and electrophysiological signal
                  acquisition for wet and dynamic environments.
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
            </div>
          </section>

          <section className="focus-strip" id="research" aria-labelledby="research-title">
            <div className="focus-heading">
              <h2 id="research-title">Research Focus</h2>
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
                            <p className="publication-authors">{item.authors}</p>
                            <ul className="highlight-list">
                              {item.highlights.slice(0, 2).map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                              ))}
                            </ul>
                            <a className="project-link" href={routePath("/publications")}>
                              Publication details
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                  {shouldScrollPublications ? (
                    <div className="carousel-note" aria-hidden="true">
                      Auto-scrolling latest 5
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
                  <article className="timeline-item" key={item.degree}>
                    <div className="timeline-marker" aria-hidden="true" />
                    <div>
                      <h3>{item.degree}</h3>
                      <p className="school">{item.school}</p>
                      <p className="timeline-period">{item.period}</p>
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
              <a className="section-more" href={routePath("/awards")}>
                Full awards
              </a>
            </section>
          </div>
        </main>
      </div>

      <SiteFooter />
    </>
  );
}
