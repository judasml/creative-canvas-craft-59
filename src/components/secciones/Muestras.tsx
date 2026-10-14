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
    <section id="muestras" className="cuadricula py-[var(--paso)]">
      <div className="contenedor">
      <p className="etiqueta flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        Así trabajamos. Ábralo y véalo por dentro.
      </p>

      <p className="parrafo mt-6 text-[22px] font-medium leading-snug md:text-[26px]">
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
              <h3 className="text-[24px] font-bold leading-[1.08] md:text-[28px]">
                {t.titulo}
              </h3>
              <span className="etiqueta shrink-0 text-[12px] text-gris-texto">
                {t.etiqueta}
              </span>
            </div>
          </EnlaceInterno>
        ))}
      </div>

      <div id="disenos" className="mt-12 grid scroll-mt-[96px] gap-6 md:grid-cols-2">
        <div className="flex flex-col rounded-[var(--radio)] border border-gris bg-white p-6 md:p-8">
          <h3 className="text-[24px] font-bold leading-[1.08] md:text-[28px]">Sitio de una página</h3>
          <p className="parrafo mt-3 text-[16px] text-gris-texto">
            45 diseños para 16 tipos de negocio. Si el suyo no aparece, pregúntenos: se adapta.
          </p>
          <a
            href="/plantillas/catalogo-variantes/index.html"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-[var(--radio)] bg-navy px-7 text-[16px] font-semibold text-hueso transition-colors hover:bg-[#011A40]"
          >
            Ver diseños
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex flex-col rounded-[var(--radio)] border border-gris bg-white p-6 md:p-8">
          <h3 className="text-[24px] font-bold leading-[1.08] md:text-[28px]">Sitio web premium</h3>
          <p className="parrafo mt-3 text-[16px] text-gris-texto">
            Hasta 5 páginas, con más secciones y más movimiento.
          </p>
          <EnlaceInterno
            to="/catalogo-premium"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-[var(--radio)] bg-navy px-7 text-[16px] font-semibold text-hueso transition-colors hover:bg-[#011A40]"
          >
            Ver diseños premium
            <span aria-hidden="true">→</span>
          </EnlaceInterno>
        </div>
      </div>
      </div>
    </section>
  );
}
