import { useEffect, useRef } from "react";

export const TEXTOS = [
  "SIN FOTOS",
  "HORARIO VIEJO",
  '"CERRADO PERMANENTEMENTE"',
  "0 RESEÑAS",
  "RESEÑA SIN RESPONDER",
  "TELÉFONO EQUIVOCADO",
  "SIN DIRECCIÓN",
  '"SITIO NO SEGURO"',
  "NO CARGA EN CELULAR",
  "FICHA INCOMPLETA",
  "FORMULARIO ROTO",
  "LOGO PIXELADO",
  "SIN WHATSAPP",
  "DUPLICADA",
  "FOTO DE 2019",
];

export const CRITICOS = new Set([
  '"CERRADO PERMANENTEMENTE"',
  "FORMULARIO ROTO",
  '"SITIO NO SEGURO"',
]);

type Color = { fondo: string; borde: string; texto: string };

const PALETA: Color[] = [
  { fondo: "#011a40", borde: "#394c6a", texto: "#f6f7f8" },
  { fondo: "#394c6a", borde: "#011a40", texto: "#f6f7f8" },
  { fondo: "#fd5c41", borde: "#c94a32", texto: "#f6f7f8" },
  { fondo: "#afde00", borde: "#8bb300", texto: "#011a40" },
  { fondo: "#dee1e6", borde: "#b5b9c1", texto: "#011a40" },
];

type Particula = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  giro: number;
  fase: number;
  texto: string;
  color: Color;
};

export function Enjambre() {
  const seccion = useRef<HTMLElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = lienzo.current;
    const sec = seccion.current;
    if (!canvas || !sec) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const movil = window.innerWidth < 768;
    const total = movil ? 60 : 140;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particulas: Particula[] = Array.from({ length: total }, (_, i) => {
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.random();
      return {
        x0: 0.5 + Math.cos(ang) * rad * 0.34,
        y0: 0.5 + Math.sin(ang) * rad * 0.42,
        x1: 0.5 + Math.cos(ang) * (1.15 + Math.random()),
        y1: 0.5 + Math.sin(ang) * (1.15 + Math.random()),
        giro: (Math.random() - 0.5) * 0.6,
        fase: Math.random() * 6.28,
        texto: TEXTOS[i % TEXTOS.length]!,
        color: PALETA[Math.floor(Math.random() * PALETA.length)]!,
      };
    });

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
    let visible = true;

    const dibujar = (t: number) => {
      const rect = sec.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - window.innerHeight)),
      );
      const e = p * p;
      const opacidad = Math.max(0, 1 - e * 1.6);

      ctx.clearRect(0, 0, ancho, alto);

      if (opacidad > 0.001) {
        ctx.font = "9px 'IBM Plex Mono', monospace";
        for (const q of particulas) {
          const vai = Math.sin(t / 1000 + q.fase) * 0.006;
          const x = (q.x0 + (q.x1 - q.x0) * e + vai) * ancho;
          const y = (q.y0 + (q.y1 - q.y0) * e + vai) * alto;
          const w = movil ? 44 : Math.max(60, ctx.measureText(q.texto).width + 16);
          const h = movil ? 14 : 20;

          ctx.save();
          ctx.globalAlpha = opacidad;
          ctx.translate(x, y);
          ctx.rotate(q.giro * e);
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
      }

      id = requestAnimationFrame(dibujar);
    };

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting && !visible) {
          visible = true;
          id = requestAnimationFrame(dibujar);
        } else if (!entrada?.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(id);
        }
      },
      { threshold: 0 },
    );
    io.observe(sec);
    id = requestAnimationFrame(dibujar);

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <section ref={seccion} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-hueso">
        <h2 className="rotulo contenedor relative z-[1] text-center text-[clamp(38px,9vw,110px)] text-navy">
          Su mejor cliente
          <br />
          lo buscó en Google
          <br />
          y no lo encontró
        </h2>
        <p className="parrafo relative z-[1] mt-10 px-[var(--borde)] text-center text-gris-texto">
          Eso es lo que hay entre su negocio y alguien que ya estaba listo para
          comprarle.
        </p>
        <canvas
          ref={lienzo}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        />
      </div>
    </section>
  );
}
