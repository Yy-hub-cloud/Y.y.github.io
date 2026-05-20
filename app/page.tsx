const educationItems = [
  {
    degree: "PhD in Physical Chemistry, Present",
    school: "Nankai University, China",
  },
  {
    degree: "MSc in Materials Science and Engineering, 2024.7 - 2025.7",
    school: "National University of Singapore, Singapore \u00b7 GPA: 4.25/5",
  },
  {
    degree: "BEng in Materials Science and Engineering, 2020.9 - 2024.6",
    school: "Jilin University, China \u00b7 GPA: 82.51/100",
  },
];

const awards = [
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

function SearchIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.8 4a6.8 6.8 0 0 1 5.36 10.98l3.43 3.43-1.18 1.18-3.43-3.43A6.8 6.8 0 1 1 10.8 4Zm0 1.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2Zm0 1.7a6.9 6.9 0 0 1 5.97 10.35h-2.54a2.57 2.57 0 0 0-2.5-1.98h-1.86a2.57 2.57 0 0 0-2.5 1.98H6.03A6.9 6.9 0 0 1 12 5.1Zm-4.67 12.05h2.88l.13-.68a.87.87 0 0 1 .73-.7h1.86c.35.04.64.31.73.7l.13.68h2.88A6.86 6.86 0 0 1 12 18.9a6.86 6.86 0 0 1-4.67-1.75ZM12 7a2.65 2.65 0 1 0 0 5.3A2.65 2.65 0 0 0 12 7Zm0 1.7a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9Z" />
    </svg>
  );
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

function GraduationCapIcon() {
  return (
    <svg className="edu-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 1.5 8.2 12 13.4l8-3.96V16h2V8.2L12 3Zm-6 8.8v4.1c0 1.9 3.1 3.6 6 3.6s6-1.7 6-3.6v-4.1l-6 3-6-3Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="topbar">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#">
            Yang Yu
          </a>
          <div className="nav-links">
            <a className="active" href="#">
              Home
            </a>
            <a href="#publications">Publications</a>
            <a href="#education">Education</a>
            <a href="#awards">Awards</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-icons" aria-label="Utility links">
            <a href="#publications" aria-label="Search sections">
              <SearchIcon />
            </a>
            <a href={assetPath("/cv.pdf")} aria-label="Download CV">
              <ProfileIcon />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <div className="profile-layout">
          <aside className="sidebar" id="contact">
            <img className="portrait" src={assetPath("/profile.jpg")} alt="Portrait of Yang Yu" />
            <h1>Yang Yu</h1>
            <p className="role">PhD Student</p>
            <p className="affiliation">
              <a href="https://www.nankai.edu.cn/">Nankai University</a>
            </p>
            <div className="socials" aria-label="Contact links">
              <a className="social" href="mailto:e1352120@u.nus.edu" aria-label="Email">
                <EmailIcon />
              </a>
              <a className="social" href="tel:+8615647226966" aria-label="Phone">
                <PhoneIcon />
              </a>
              <a className="social" href={assetPath("/cv.pdf")} aria-label="CV">
                <CvIcon />
              </a>
              <a className="social" href="https://github.com/" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </div>
          </aside>

          <div className="content">
            <div className="intro" id="home">
              <p>
                I am a PhD student at Nankai University with materials science training from the
                National University of Singapore and Jilin University. My work focuses on flexible
                electronics, bioelectronic interfaces, MEMS, and stretchable devices. I am
                experienced in micro/nanofabrication, materials characterization,
                electrophysiological signal processing, and Python-based data analysis.
              </p>
            </div>

            <div className="intro-grid">
              <section className="compact-section" id="interests" aria-labelledby="interests-title">
                <h2 id="interests-title">Interests</h2>
                <ul>
                  <li>Flexible bioelectronics and underwater electrophysiology</li>
                  <li>Three-dimensional stretchable devices and electronic skin</li>
                  <li>MEMS, micro/nanofabrication, and device integration</li>
                  <li>Materials characterization and signal/data analysis</li>
                </ul>
              </section>
            </div>

            <section id="publications">
              <div className="section-title">
                <h2>Publications</h2>
                <p>Manuscripts and outputs</p>
              </div>
              <div className="publication-list">
                <article className="publication-card">
                  <div className="publication-figure">
                    <img src={assetPath("/publication-placeholder.svg")} alt="Publication figure placeholder" />
                  </div>
                  <div className="publication-content">
                    <h3>Underwater Electrophysiological Interface for Stable Muscle Signal Acquisition</h3>
                    <p className="publication-authors">Yang Yu, collaborators, and Changsheng Wu</p>
                    <p className="publication-links">
                      <a href="#">Project</a>
                      <span>|</span>
                      <span>
                        <span className="citation-label">Citations:</span> TBD
                      </span>
                      <span>|</span>
                      <span>In preparation</span>
                    </p>
                    <ul>
                      <li>Stable underwater EMG acquisition with SNR &gt; 30 dB and continuous recording over 30 min.</li>
                      <li>Flexible tissue-adhesive electrodes for dynamic wet environments.</li>
                      <li>Signal fidelity evaluation and fatigue-related feature extraction.</li>
                    </ul>
                  </div>
                </article>
              </div>
            </section>

            <section id="education" aria-labelledby="education-title">
              <div className="section-title">
                <h2 id="education-title">Education</h2>
              </div>
              <div className="education-list">
                {educationItems.map((item) => (
                  <div className="education-item" key={item.degree}>
                    <GraduationCapIcon />
                    <div>
                      <p className="degree">{item.degree}</p>
                      <p className="school">{item.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="awards">
              <div className="section-title">
                <h2>Awards</h2>
              </div>
              <div className="award-list">
                {awards.map((award) => (
                  <div className="award-item" key={award.name}>
                    <span className="award-name">{award.name}</span>
                    <span className="award-year">{award.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer>&copy; 2026 Yang Yu &middot; Static academic homepage for GitHub Pages</footer>
    </>
  );
}
