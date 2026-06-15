import type { Metadata } from "next";
import { PageHero, ProfileCard, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Yang Yu",
  description: "Contact information for Yang Yu.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(profile.mapQuery)}&output=embed`;

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
            <div className="location-card">
              <div>
                <h3>Location</h3>
                <p>{profile.location}</p>
              </div>
              <iframe
                title={`Map of ${profile.location}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
