import { createFileRoute } from "@tanstack/react-router";
import PremiumCatalog from "@/components/PremiumCatalog";
import { EnlaceInterno } from "@/components/Telon";

const TITULO = "Páginas Premium — MK Web Studio";
const DESCRIPCION =
  "Tres experiencias premium en movimiento: Cercanía, Horizonte y Esencia. Véalas completas y abra cada demostración.";

export const Route = createFileRoute("/catalogo-premium")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  return (
    <article className="py-[var(--paso)]">
      <div className="contenedor">
        <EnlaceInterno
          to="/muestras"
          className="etiqueta text-gris-texto hover:text-coral"
        >
          ← Volver
        </EnlaceInterno>

        <p className="etiqueta mt-10 flex items-center gap-3 text-gris-texto">
          <span
            className="inline-block size-[11px] bg-coral"
            aria-hidden="true"
          />
          Páginas Premium
        </p>

        <h1 className="editorial mt-6 text-[clamp(36px,7vw,76px)]">
          Tres experiencias en movimiento.
        </h1>
        <p className="parrafo mt-8 max-w-[62ch] text-[19px]">
          Cercanía, Horizonte y Esencia. Cada una se ve completa aquí abajo y
          puede abrirse a pantalla entera.
        </p>
      </div>

      <div className="mt-14">
        <PremiumCatalog />
      </div>

      <div className="contenedor mt-10">
        <EnlaceInterno
          to="/muestras"
          className="etiqueta inline-flex text-gris-texto hover:text-coral"
        >
          ← Volver a muestras
        </EnlaceInterno>
      </div>
    </article>
  );
}
