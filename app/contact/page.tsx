import type { Metadata } from "next";
import { PageHero, ProfileCard, SiteFooter, SiteHeader } from "../site-components";
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
        <PageHero title="Contact">
          <p>
            Current academic location and campus map for visits, correspondence, and affiliation
            reference.
          </p>
        </PageHero>

        <section className="contact-page-grid" aria-label="Contact details">
          <ProfileCard showContactDetails />
          <div className="contact-panel location-panel">
            <h2>Location</h2>
            <p>{profile.location}</p>
            <p className="location-note">
              Campus map for locating the Nankai University area and nearby academic facilities.
            </p>
            <iframe
              title={`Map of ${profile.location}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
