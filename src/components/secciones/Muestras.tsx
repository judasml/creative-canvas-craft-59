import ficha from "@/assets/muestra-ficha.webp.asset.json";
import celular from "@/assets/muestra-celular.webp.asset.json";
import antesDespues from "@/assets/muestra-antes-despues.webp.asset.json";
import { EnlaceInterno } from "../Telon";

const TARJETAS = [
  {
    titulo: "Cómo se ve una ficha de Google bien hecha",
    etiqueta: "Ficha",
    ruta: "/muestras/ficha-de-google",
    img: ficha.url,
    alt: "Maqueta de una ficha de Google completa y ordenada",
  },
  {
    titulo: "Cómo se ve su negocio en un celular",
    etiqueta: "Sitio",
    ruta: "/muestras/sitio-en-celular",
    img: celular.url,
    alt: "Maqueta de un sitio de negocio abierto en un celular",
  },
  {
    titulo: "La misma ficha, antes y después",
    etiqueta: "Antes / Después",
    ruta: "/muestras/antes-y-despues",
    img: antesDespues.url,
    alt: "Comparación lado a lado de una ficha desordenada y una ordenada",
  },
];

export function Muestras() {
  return (
    <section id="muestras" className="cuadricula contenedor py-[var(--paso)]">
      <p className="etiqueta flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        Así trabajamos. Ábralo y véalo por dentro.
      </p>

      <p className="parrafo mt-6 text-[19px]">
        Abra cada una y fíjese en el detalle: los datos que contesta una ficha sin
        que el cliente pregunte, y la diferencia entre aparecer y que le escriban.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TARJETAS.map((t) => (
          <EnlaceInterno
            key={t.ruta}
            to={t.ruta}
            className="group block overflow-hidden rounded-[var(--radio)] border border-gris bg-white transition-transform duration-[400ms] hover:-translate-y-1.5"
          >
            <div className="aspect-[3/4] overflow-hidden bg-navy">
              <img
                src={t.img}
                alt={t.alt}
                loading="lazy"
                width={912}
                height={1200}
                className="size-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <h3
                className="text-[18px] leading-[1.05]"
                style={{ fontFamily: "var(--display)", fontWeight: 300 }}
              >
                {t.titulo}
              </h3>
              <span className="etiqueta shrink-0 text-[12px] text-gris-texto">
                {t.etiqueta}
              </span>
            </div>
          </EnlaceInterno>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-start gap-4">
        <div>
          <a
            href="/plantillas/catalogo-variantes/index.html"
            className="etiqueta inline-flex items-center gap-3 rounded-[var(--radio)] bg-navy px-7 py-4 text-hueso transition-colors hover:bg-coral hover:text-navy"
          >
            Ver sitios web de su plan
            <span aria-hidden="true">↗</span>
          </a>
          <p className="etiqueta mt-3 text-[13px] text-gris-texto">
            39 diseños para 13 tipos de negocio. Si el suyo no aparece,
            pregúntenos: se adapta.
          </p>
        </div>

        <div>
          <EnlaceInterno
            to="/catalogo-premium"
            className="etiqueta inline-flex items-center gap-3 rounded-[var(--radio)] border border-navy px-7 py-4 text-navy transition-colors hover:bg-navy hover:text-hueso"
          >
            Páginas Premium
            <span aria-hidden="true">→</span>
          </EnlaceInterno>
          <p className="etiqueta mt-3 text-[13px] text-gris-texto">
            Tres muestras con animación. Si quiere un sitio hecho a la medida y no
            una plantilla, ese es el plan Premium de <span className="moneda">L</span>{" "}
            7,500.
          </p>
        </div>
      </div>

    </section>
  );
}
