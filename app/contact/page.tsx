import type { Metadata } from "next";
import { PageHero, ProfileCard, SiteFooter, SiteHeader, assetPath } from "../site-components";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Yang Yu",
  description: "Contact information for Yang Yu.",
};

function CartoonCampusMap() {
  return (
    <figure className="cartoon-map generated-map" aria-labelledby="cartoon-map-title">
      <img
        className="generated-map-image"
        src={assetPath("/contact-campus-map.png")}
        alt="Illustrated campus map of the Nankai University and Tianjin University area"
      />
      <figcaption id="cartoon-map-title" className="sr-only">
        Cartoon campus map highlighting Tiannan Building at Nankai University.
      </figcaption>
      <span className="map-location-pin" aria-hidden="true">
        <span>{"\u5929"}</span>
      </span>
      <span className="map-location-card">
        <strong>{"\u5929\u5357\u697C"}</strong>
        <span>Tiannan Building</span>
      </span>
    </figure>
  );
}

export default function ContactPage() {
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
              Cartoon campus map based on the real Nankai-Tianjin University area, with Tiannan
              Building marked near Daxue Road.
            </p>
            <CartoonCampusMap />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
