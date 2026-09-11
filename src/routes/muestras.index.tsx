import { createFileRoute } from "@tanstack/react-router";
import { EnlaceInterno } from "@/components/Telon";
import ficha from "@/assets/muestra-ficha.jpg";
import celular from "@/assets/muestra-celular.jpg";

const TITULO = "Muestras: fichas de Google y sitios web — MK Web Studio";
const DESCRIPCION =
  "Elija qué quiere ver: nuestras muestras de fichas de Google o el catálogo de sitios web incluidos en su plan.";

export const Route = createFileRoute("/muestras/")({
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

const OPCIONES = [
  {
    titulo: "Fichas de Google",
    detalle:
      "Cómo se ve una ficha bien hecha, cómo luce en un celular y la misma ficha antes y después.",
    ruta: "/#muestras",
    img: ficha,
    alt: "Ficha de Google completa y ordenada",
  },
  {
    titulo: "Sitios web",
    detalle:
      "18 diseños de muestra para 6 tipos de negocio. Todos incluidos en su plan.",
    ruta: "/muestras/sitios-web",
    img: celular,
    alt: "Sitio de negocio abierto en un celular",
  },
  {
    titulo: "Páginas Premium",
    detalle:
      "Tres experiencias en movimiento: efectos, video y animación para marcas que quieren destacar.",
    ruta: "/catalogo-premium",
    img: "/premium/assets/preview-aurai.webp",
    alt: "Vista previa de una página premium con movimiento",
  },
];

function Pagina() {
  return (
    <article className="contenedor py-[var(--paso)]">
      <EnlaceInterno to="/" className="etiqueta text-gris-texto hover:text-coral">
        ← Volver
      </EnlaceInterno>

      <p className="etiqueta mt-10 flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        Muestras
      </p>

      <h1 className="editorial mt-6 text-[clamp(36px,7vw,76px)]">
        ¿Qué quiere ver primero?
      </h1>
      <p className="parrafo mt-8 max-w-[62ch] text-[19px]">
        Todo lo que sigue lo hicimos nosotros. Elija por dónde empezar.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {OPCIONES.map((o) => (
          <EnlaceInterno
            key={o.ruta}
            to={o.ruta}
            className="group block overflow-hidden rounded-[var(--radio)] border border-gris bg-white transition-transform duration-[400ms] hover:-translate-y-1.5"
          >
            <div className="aspect-[16/10] overflow-hidden bg-navy">
              <img
                src={o.img}
                alt={o.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <h2
                className="text-[22px] uppercase leading-tight"
                style={{ fontFamily: "var(--display)", fontWeight: 700 }}
              >
                {o.titulo}
              </h2>
              <p className="parrafo mt-3 text-gris-texto">{o.detalle}</p>
              <span className="etiqueta mt-5 inline-flex items-center gap-2 text-[13px] text-coral">
                Ver <span aria-hidden="true">→</span>
              </span>
            </div>
          </EnlaceInterno>
        ))}
      </div>
    </article>
  );
}
