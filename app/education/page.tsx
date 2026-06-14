import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader } from "../site-components";
import { educationItems } from "../site-data";

export const metadata: Metadata = {
  title: "Education | Yang Yu",
  description: "Education background of Yang Yu.",
};

export default function EducationPage() {
  return (
    <>
      <SiteHeader active="Education" />

      <main className="subpage-main">
        <PageHero eyebrow="Education" title="Academic Path">
          <p>
            Training across physical chemistry, materials science, and engineering supports my work
            on flexible bioelectronics, MEMS, and stretchable device systems.
          </p>
        </PageHero>

        <section className="subpage-timeline" aria-label="Education timeline">
          {educationItems.map((item) => (
            <article className="subpage-timeline-item" key={item.degree}>
              <span className="subpage-time">{item.period}</span>
              <div>
                <h2>{item.degree}</h2>
                <p>{item.school}</p>
                {item.detail ? <p className="subpage-note">{item.detail}</p> : null}
              </div>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
