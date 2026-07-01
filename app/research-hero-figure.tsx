"use client";

import { useEffect, useRef, useState } from "react";

import { assetPath } from "./site-components";

export function ResearchHeroFigure({ animated = true }: { animated?: boolean }) {
  const figureRef = useRef<HTMLDivElement>(null);
  const [layersReady, setLayersReady] = useState(false);

  useEffect(() => {
    if (!animated || !figureRef.current) return;

    const images = Array.from(figureRef.current.querySelectorAll("img"));
    const markReady = () => {
      if (images.every((image) => image.complete)) setLayersReady(true);
    };

    markReady();
    images.forEach((image) => {
      image.addEventListener("load", markReady);
      image.addEventListener("error", markReady);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", markReady);
        image.removeEventListener("error", markReady);
      });
    };
  }, [animated]);

  return (
    <div
      ref={figureRef}
      className={`research-hero-svg research-structure-figure${
        animated && layersReady ? " is-ready" : ""
      }${animated ? "" : " research-hero-svg-static"
      }`}
      role="img"
      aria-label="A continuous precursor sheet transitions from a flat two-dimensional form into a stable three-dimensional buckling structure."
    >
      {animated ? (
        <>
          <img
            className="research-structure-image research-structure-background"
            src={assetPath("/buckling-stage-background.png")}
            alt=""
          />
          <img
            className="research-structure-image research-structure-flat"
            src={assetPath("/buckling-stage-flat.png")}
            alt=""
          />
          <img
            className="research-structure-image research-structure-arrow"
            src={assetPath("/buckling-animation-start.png")}
            alt=""
          />
          <img
            className="research-structure-image research-structure-buckled"
            src={assetPath("/research-cover-2d-3d-clean.png")}
            alt=""
          />
        </>
      ) : (
        <img
          className="research-structure-image"
          src={assetPath("/buckling-2d-to-3d-hero.png")}
          alt=""
        />
      )}
    </div>
  );
}
