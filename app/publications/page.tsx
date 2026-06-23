import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { publishedPublications } from "../site-data";

export const metadata: Metadata = {
  title: "Publications | Yang Yu",
  description: "Publications and selected research outputs by Yang Yu.",
};

export default function PublicationsPage() {
  return (
    <>
      <SiteHeader active="Publications" />

      <main className="subpage-main">
        <PageHero title="Publications">
          <p>
            Published journal articles, project pages, and citation links will be listed here as
            publication details become available.
          </p>
        </PageHero>

        <section className="publication-list-page" aria-label="Publication list">
          {publishedPublications.length > 0 ? (
            publishedPublications.map((item, index) => (
              <article className="publication-detail" key={item.title}>
                <div className="publication-detail-figure">
                  <img src={assetPath(item.imagePath)} alt="" />
                </div>
                <div className="publication-detail-content">
                  <div className="publication-meta">
                    <span>{item.status}</span>
                    <span>Citations: {item.citations}</span>
                  </div>
                  <h2>
                    {String(index + 1).padStart(2, "0")}. {item.title}
                  </h2>
                  <p className="publication-authors">{item.authors}</p>
                  <p>{item.overview}</p>
                  <ul className="detail-list">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))
          ) : (
            <div className="publication-empty publication-empty-page">
              Published articles will be added after publication details are available.
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
