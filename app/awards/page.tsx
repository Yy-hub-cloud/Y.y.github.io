import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader } from "../site-components";
import { awards } from "../site-data";

export const metadata: Metadata = {
  title: "Awards | Yang Yu",
  description: "Awards and honors received by Yang Yu.",
};

export default function AwardsPage() {
  return (
    <>
      <SiteHeader active="Awards" />

      <main className="subpage-main">
        <PageHero title="Awards">
          <p>
            This page keeps scholarships and recognitions separate from the homepage summary, making
            it easier to expand with certificates, dates, and supporting details later.
          </p>
        </PageHero>

        <section className="award-page-list" aria-label="Awards list">
          {awards.map((award) => (
            <article className="award-page-card" key={award.name}>
              <span>{award.year}</span>
              <h2>{award.name}</h2>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
