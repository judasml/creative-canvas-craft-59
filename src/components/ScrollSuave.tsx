import { useEffect } from "react";

export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    let destruir: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const raf = (t: number) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);
      destruir = () => {
        cancelAnimationFrame(id);
        lenis.destroy();
      };
    });

    return () => {
      cancelAnimationFrame(id);
      destruir?.();
    };
  }, []);

  return null;
}
