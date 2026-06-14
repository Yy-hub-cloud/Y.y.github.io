import type { Metadata } from "next";
import { PageHero, ProfileCard, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Yang Yu",
  description: "Contact information for Yang Yu.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="Contact" />

      <main className="subpage-main">
        <PageHero eyebrow="Contact" title="Contact">
          <p>
            For academic collaboration, research discussion, or CV requests, please use the contact
            channels below.
          </p>
        </PageHero>

        <section className="contact-page-grid" aria-label="Contact details">
          <ProfileCard />
          <div className="contact-panel">
            <h2>Direct Links</h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            <a href={assetPath(profile.cvPath)}>Download CV</a>
            <a href={profile.githubUrl}>GitHub</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
