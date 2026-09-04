import { useEffect, useRef } from "react";

import { TEXTOS, CRITICOS } from "./Enjambre";

type Flotante = {
  x: number;
  y: number;
  vel: number;
  fase: number;
  giro: number;
  texto: string;
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
    const total = movil ? 6 : 12;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particulas: Flotante[] = Array.from({ length: total }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vel: 0.012 + Math.random() * 0.014,
      fase: Math.random() * 6.28,
      giro: (Math.random() - 0.5) * 0.16,
      texto: TEXTOS[(i * 3) % TEXTOS.length]!,
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
        }
        const x = (q.x + Math.sin(t / 2200 + q.fase) * 0.012) * ancho;
        const y = q.y * alto;
        const w = movil ? 44 : Math.max(60, ctx.measureText(q.texto).width + 16);
        const h = movil ? 14 : 20;
        const critico = CRITICOS.has(q.texto);

        ctx.save();
        ctx.globalAlpha = 0.42;
        ctx.translate(x, y);
        ctx.rotate(q.giro);
        ctx.fillStyle = critico ? "#E8D5D5" : "#EDEDED";
        ctx.strokeStyle = critico ? "#D9A5A5" : "#D0D0D0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 6);
        ctx.fill();
        ctx.stroke();
        if (!movil) {
          ctx.fillStyle = "#8A8A8A";
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
      className="pointer-events-none absolute inset-0 -z-[1] h-full w-full"
    />
  );
}
