import { createFileRoute } from "@tanstack/react-router";
import { EnlaceInterno } from "@/components/Telon";
import coleccion from "../../public/plantillas/catalogo-variantes/coleccion.json";

const TITULO = "Sitios web de muestra incluidos en su plan — MK Web Studio";
const DESCRIPCION =
  "39 diseños de sitios web para 13 tipos de negocio. Todos incluidos en su plan, sin costo extra.";

export const Route = createFileRoute("/muestras/sitios-web")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
    ],
  }),
  component: Pagina,
});

type Item = {
  key: string;
  rubro: string;
  folder: string;
  name: string;
  style: string;
  detail: string;
};

function Pagina() {
  const items = coleccion as Item[];

  return (
    <article className="contenedor py-[var(--paso)]">
      <a href="/#muestras" className="etiqueta text-gris-texto hover:text-coral">
        ← Volver a muestras
      </a>

      <p className="etiqueta mt-10 flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        Muestras · Sitios web
      </p>

      <h1 className="editorial mt-6 text-[clamp(36px,7vw,76px)]">
        Diseños listos para su negocio
      </h1>
      <p className="parrafo mt-8 max-w-[62ch] text-[19px]">
        39 diseños de muestra para 13 tipos de negocio. Ábralos y véalos por
        dentro: todos están incluidos en su plan.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <a
            key={t.key}
            href={`/plantillas/${t.folder}/index.html`}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-[var(--radio)] border border-gris bg-white transition-transform duration-[400ms] hover:-translate-y-1.5"
          >
            <div className="aspect-[3/2] overflow-hidden bg-hueso">
              <img
                src={`/plantillas/catalogo-variantes/previews/${t.key}.webp`}
                alt={`Vista previa del diseño ${t.name}`}
                loading="lazy"
                width={1440}
                height={960}
                className="size-full object-contain transition-transform duration-[400ms] group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
              <span className="etiqueta inline-block rounded-full border border-lima bg-lima/20 px-3 py-1 text-[11px] text-navy">
                Incluida en tu plan
              </span>
              <h2
                className="mt-4 text-[18px] leading-[1.05]"
                style={{ fontFamily: "var(--display)", fontWeight: 300 }}
              >
                {t.name}
              </h2>
              <p className="etiqueta mt-1 text-[12px] text-gris-texto">{t.style}</p>
              <p className="parrafo mt-3 text-[15px] text-gris-texto">{t.detail}</p>
            </div>
          </a>
        ))}
      </div>

      <a
        href="/#muestras"
        className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral"
      >
        ← Volver a muestras
      </a>
    </article>
  );
}
