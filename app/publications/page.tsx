import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { publication } from "../site-data";

export const metadata: Metadata = {
  title: "Publications | Yang Yu",
  description: "Publications and selected research outputs by Yang Yu.",
};

export default function PublicationsPage() {
  return (
    <>
      <SiteHeader active="Publications" />

      <main className="subpage-main">
        <PageHero eyebrow="Publications" title="Selected Publications">
          <p>
            This page is structured for future manuscripts, journal articles, project pages, and
            citation links. The current entry highlights the underwater electrophysiological
            interface project.
          </p>
        </PageHero>

        <section className="publication-detail" aria-labelledby="publication-detail-title">
          <div className="publication-detail-figure">
            <img src={assetPath(publication.imagePath)} alt="Publication figure placeholder" />
          </div>
          <div className="publication-detail-content">
            <div className="publication-meta">
              <span>{publication.status}</span>
              <span>Citations: {publication.citations}</span>
            </div>
            <h2 id="publication-detail-title">{publication.title}</h2>
            <p className="publication-authors">{publication.authors}</p>
            <p>{publication.overview}</p>
            <ul className="detail-list">
              {publication.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
