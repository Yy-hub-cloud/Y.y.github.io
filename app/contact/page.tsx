import type { Metadata } from "next";
import { PageHero, ProfileCard, SiteFooter, SiteHeader } from "../site-components";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Yang Yu",
  description: "Contact information for Yang Yu.",
};

function CartoonCampusMap() {
  return (
    <figure className="cartoon-map" aria-labelledby="cartoon-map-title">
      <svg viewBox="0 0 900 420" role="img">
        <title id="cartoon-map-title">Cartoon map highlighting Tiannan Building at Nankai University</title>
        <rect className="map-bg" x="0" y="0" width="900" height="420" rx="18" />
        <path className="map-water" d="M572 24c54 20 80 68 75 119-5 54 36 83 99 73 51-8 86 9 108 42v138H606c-34-31-49-70-46-116 4-61-43-80-79-98-39-20-45-67-19-100 20-25 58-36 110-58Z" />
        <path className="map-park" d="M88 48h262c33 0 60 27 60 60v106c0 33-27 60-60 60H88c-33 0-60-27-60-60V108c0-33 27-60 60-60Z" />
        <path className="map-park map-park-secondary" d="M654 42h121c44 0 80 36 80 80v25c0 44-36 80-80 80H654c-44 0-80-36-80-80v-25c0-44 36-80 80-80Z" />
        <path className="map-road map-road-wide" d="M-20 332C148 310 278 317 421 339c144 22 266 30 499-12" />
        <path className="map-road map-road-wide" d="M116 4c22 88 26 179 12 272-7 49 0 87 23 134" />
        <path className="map-road" d="M246 28c14 100 10 192-13 275-11 39-6 70 17 93" />
        <path className="map-road" d="M374 64c-16 63-18 126-4 188 8 37 4 81-13 132" />
        <path className="map-road" d="M28 214c158-11 319-6 484 15 122 16 241 17 357 4" />
        <path className="map-road" d="M38 116c123 14 252 16 388 8 75-4 143 0 205 13" />
        <path className="map-path" d="M497 276c45-38 93-51 144-39 49 12 92 6 130-18" />
        <path className="map-path" d="M462 88c38 27 65 63 81 108" />
        <g className="map-building">
          <rect x="170" y="64" width="82" height="52" rx="8" />
          <text x="211" y="96">Library</text>
        </g>
        <g className="map-building">
          <rect x="298" y="143" width="108" height="58" rx="8" />
          <text x="352" y="176">Nankai</text>
        </g>
        <g className="map-building">
          <rect x="676" y="262" width="112" height="54" rx="8" />
          <text x="732" y="295">Campus</text>
        </g>
        <g className="map-building">
          <rect x="530" y="304" width="92" height="52" rx="8" />
          <text x="576" y="335">Labs</text>
        </g>
        <g className="map-building map-building-muted">
          <rect x="58" y="253" width="82" height="46" rx="8" />
          <text x="99" y="281">Gate</text>
        </g>
        <g className="map-pin" transform="translate(448 176)">
          <circle className="map-pin-halo" cx="0" cy="0" r="42" />
          <path className="map-pin-drop" d="M0-40c22 0 40 18 40 40 0 30-40 68-40 68S-40 30-40 0c0-22 18-40 40-40Z" />
          <circle className="map-pin-dot" cx="0" cy="0" r="14" />
          <text x="0" y="6">天</text>
        </g>
        <g className="map-label-card">
          <rect x="486" y="119" width="236" height="76" rx="14" />
          <path d="M492 170 457 178 489 150Z" />
          <text className="map-label-title" x="510" y="150">天南楼</text>
          <text className="map-label-subtitle" x="510" y="174">Tiannan Building</text>
        </g>
        <g className="map-compass" transform="translate(824 70)">
          <circle cx="0" cy="0" r="30" />
          <path d="M0-19 8 7 0 3-8 7Z" />
          <text x="0" y="20">N</text>
        </g>
      </svg>
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
              Cartoon campus map with Tiannan Building marked as the key location.
            </p>
            <CartoonCampusMap />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
