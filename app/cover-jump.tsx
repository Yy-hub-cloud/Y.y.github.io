"use client";

import { useEffect } from "react";

const COVER_DISMISSED_CLASS = "cover-dismissed";
const COVER_ACTIVE_CLASS = "cover-active";

export function CoverJump() {
  useEffect(() => {
    const cover = document.getElementById("cover");

    if (!cover) {
      return;
    }

    let locked = false;
    let touchStartY = 0;
    let lockTimer: number | undefined;

    document.body.classList.add(COVER_ACTIVE_CLASS);

    const coverIsActive = () => !document.body.classList.contains(COVER_DISMISSED_CLASS);

    const dismissCover = () => {
      if (locked || !coverIsActive()) {
        return;
      }

      locked = true;
      window.scrollTo({ top: 0, behavior: "auto" });
      document.body.classList.add(COVER_DISMISSED_CLASS);
      cover.setAttribute("aria-hidden", "true");

      lockTimer = window.setTimeout(() => {
        document.body.classList.remove(COVER_ACTIVE_CLASS);
        locked = false;
      }, 950);
    };

    const onWheel = (event: WheelEvent) => {
      if (locked) {
        event.preventDefault();
        return;
      }

      if (!coverIsActive()) {
        return;
      }

      event.preventDefault();

      if (event.deltaY > 0) {
        dismissCover();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key) || !coverIsActive()) {
        return;
      }

      event.preventDefault();

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        dismissCover();
      }
    };

    const onCueClick = (event: Event) => {
      event.preventDefault();
      dismissCover();
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!coverIsActive()) {
        return;
      }

      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (locked || coverIsActive()) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!coverIsActive()) {
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;

      if (touchStartY - touchEndY > 36) {
        dismissCover();
      }
    };

    const cue = cover.querySelector(".scroll-cue");

    cue?.addEventListener("click", onCueClick);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(lockTimer);
      document.body.classList.remove(COVER_ACTIVE_CLASS);
      document.body.classList.remove(COVER_DISMISSED_CLASS);
      cue?.removeEventListener("click", onCueClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
