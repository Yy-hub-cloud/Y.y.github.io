import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader } from "../site-components";
import { researchAreas, researchTags } from "../site-data";

export const metadata: Metadata = {
  title: "Research | Yang Yu",
  description:
    "Research interests of Yang Yu, including flexible bioelectronics, underwater electrophysiology, MEMS, and stretchable devices.",
};

export default function ResearchPage() {
  return (
    <>
      <SiteHeader active="Research" />

      <main className="subpage-main">
        <PageHero eyebrow="Research" title="Research Focus">
          <p>
            My work connects flexible materials, micro/nano-fabrication, and electrophysiological
            signal analysis to build reliable bioelectronic interfaces for wet and dynamic
            environments.
          </p>
        </PageHero>

        <section className="detail-grid" aria-label="Research areas">
          {researchAreas.map((area) => (
            <article className="detail-card" key={area.title}>
              <span className="detail-number">{area.label}</span>
              <h2>{area.title}</h2>
              <p>{area.summary}</p>
              <ul className="detail-list">
                {area.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="subpage-section" aria-labelledby="keywords-title">
          <h2 id="keywords-title">Keywords</h2>
          <div className="tag-cloud">
            {researchTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
