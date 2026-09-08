import { useEffect, useRef } from "react";

import { TEXTOS } from "./Enjambre";

type Color = {
  fondo: string;
  borde: string;
  texto: string;
};

const PALETA: Color[] = [
  { fondo: "#011a40", borde: "#394c6a", texto: "#f6f7f8" },
  { fondo: "#394c6a", borde: "#011a40", texto: "#f6f7f8" },
  { fondo: "#fd5c41", borde: "#c94a32", texto: "#f6f7f8" },
  { fondo: "#afde00", borde: "#8bb300", texto: "#011a40" },
  { fondo: "#dee1e6", borde: "#b5b9c1", texto: "#011a40" },
];

type Flotante = {
  x: number;
  y: number;
  vel: number;
  fase: number;
  faseX: number;
  frecX: number;
  ampX: number;
  giro: number;
  vaiven: number;
  texto: string;
  color: Color;
};

export function ParticulasHero() {
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = lienzo.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const movil = window.innerWidth < 768;
    const total = movil ? 2 : 3;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const colorAleatorio = () => PALETA[Math.floor(Math.random() * PALETA.length)]!;

    const particulas: Flotante[] = Array.from({ length: total }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vel: 0.018 + Math.random() * 0.05,
      fase: Math.random() * 6.28,
      faseX: Math.random() * 6.28,
      frecX: 0.35 + Math.random() * 0.9,
      ampX: 0.02 + Math.random() * 0.06,
      giro: (Math.random() - 0.5) * 0.26,
      vaiven: 0.4 + Math.random() * 1.4,
      texto: TEXTOS[(i * 3) % TEXTOS.length]!,
      color: colorAleatorio(),
    }));

    let ancho = 0;
    let alto = 0;
    const medir = () => {
      ancho = canvas.clientWidth;
      alto = canvas.clientHeight;
      canvas.width = ancho * dpr;
      canvas.height = alto * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    window.addEventListener("resize", medir);

    let id = 0;
    let previo = performance.now();

    const dibujar = (t: number) => {
      const dt = Math.min((t - previo) / 1000, 0.05);
      previo = t;
      ctx.clearRect(0, 0, ancho, alto);
      ctx.font = "9px 'IBM Plex Mono', monospace";

      for (const q of particulas) {
        q.y -= q.vel * dt;
        if (q.y < -0.12) {
          q.y = 1.12;
          q.x = Math.random();
          q.texto = TEXTOS[Math.floor(Math.random() * TEXTOS.length)]!;
          q.color = colorAleatorio();
        }
        const seg = t / 1000;
        const deriva =
          Math.sin(seg * q.frecX + q.faseX) * q.ampX +
          Math.sin(seg * q.frecX * 2.3 + q.fase) * q.ampX * 0.35;
        const x = (q.x + deriva) * ancho;
        const y = (q.y + Math.sin(seg * q.vaiven + q.fase) * 0.012) * alto;
        const w = movil ? 44 : Math.max(60, ctx.measureText(q.texto).width + 16);
        const h = movil ? 14 : 20;

        ctx.save();
        ctx.globalAlpha = 0.95;
        ctx.translate(x, y);
        ctx.rotate(q.giro + Math.sin(seg * q.vaiven + q.faseX) * 0.06);
        ctx.fillStyle = q.color.fondo;
        ctx.strokeStyle = q.color.borde;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 6);
        ctx.fill();
        ctx.stroke();
        if (!movil) {
          ctx.fillStyle = q.color.texto;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(q.texto, 0, 1);
        }
        ctx.restore();
      }

      id = requestAnimationFrame(dibujar);
    };

    id = requestAnimationFrame(dibujar);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <canvas
      ref={lienzo}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
