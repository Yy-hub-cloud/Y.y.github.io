import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { publishedPublications } from "../site-data";

export const metadata: Metadata = {
  title: "Publications | Yang Yu",
  description: "Publications and selected research outputs by Yang Yu.",
};

function renderAuthors(authors: string) {
  const parts = authors.split(/(Yang Yu)/g);

  return parts.map((part, index) =>
    part === "Yang Yu" ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

export default function PublicationsPage() {
  return (
    <>
      <SiteHeader active="Publications" />

      <main className="subpage-main">
        <PageHero title="Publications">
          <p>
            Published journal articles and selected research outputs are listed here. The newest
            online paper is now included below.
          </p>
        </PageHero>

        <section className="publication-list-page" aria-label="Publication list">
          {publishedPublications.length > 0 ? (
            publishedPublications.map((item) => (
              <article className="publication-detail" key={item.title}>
                <div className="publication-detail-figure">
                  <img src={assetPath(item.imagePath)} alt={`Figure 1 for ${item.title}`} />
                </div>
                <div className="publication-detail-content">
                  <h2>{item.title}</h2>
                  <p className="publication-authors publication-authors-emphasis">{renderAuthors(item.authors)}</p>
                  <div className="publication-citation-meta">
                    {item.venue ? <span>{item.venue}</span> : null}
                    {item.publicationDate ? <span>{item.publicationDate.slice(0, 4)}</span> : null}
                  </div>
                  {item.doi ? (
                    <p className="publication-detail-doi">
                      DOI: <a href={`https://doi.org/${item.doi}`}>{item.doi}</a>
                    </p>
                  ) : null}
                  <a className="project-link" href={item.projectHref}>
                    View on publisher website
                  </a>
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
