import { CtaWhatsApp } from "../CtaWhatsApp";

function volverAtras(e: React.MouseEvent) {
  e.preventDefault();
  if (typeof window === "undefined") return;
  const interno =
    window.history.length > 1 &&
    document.referrer &&
    new URL(document.referrer).origin === window.location.origin;
  if (interno) {
    window.history.back();
    return;
  }
  window.location.href = "/#muestras";
}


export function PaginaMuestra({
  etiqueta,
  titulo,
  entrada,
  puntos,
  img,
  alt,
}: {
  etiqueta: string;
  titulo: string;
  entrada: string;
  puntos: { titulo: string; texto: string }[];
  img: string;
  alt: string;
}) {
  return (
    <article className="contenedor py-[var(--paso)]">
      <EnlaceInterno to="/" className="etiqueta text-gris-texto hover:text-coral">
        ← Volver
      </EnlaceInterno>

      <p className="etiqueta mt-10 flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        {etiqueta}
      </p>

      <h1 className="editorial mt-6 text-[clamp(36px,7vw,76px)]">{titulo}</h1>
      <p className="parrafo mt-8 text-[19px]">{entrada}</p>

      <p className="etiqueta mt-10 text-[12px] text-gris-texto">
        Demostración hecha por nosotros. No es el trabajo de un cliente real.
      </p>

      <div className="mt-6 overflow-x-auto rounded-[var(--radio)] border border-gris bg-navy">
        <img
          src={img}
          alt={alt}
          loading="lazy"
          className="w-full min-w-[720px] object-cover md:min-w-0"
        />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {puntos.map((p) => (
          <div key={p.titulo}>
            <h2 className="editorial text-[28px]">{p.titulo}</h2>
            <p className="parrafo mt-3 text-gris-texto">{p.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-[var(--paso)]">
        <CtaWhatsApp />
      </div>

      <EnlaceInterno
        to="/muestras"
        className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral"
      >
        ← Volver
      </EnlaceInterno>
    </article>
  );
}
