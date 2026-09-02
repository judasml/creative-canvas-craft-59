import ficha from "@/assets/muestra-ficha.jpg";
import celular from "@/assets/muestra-celular.jpg";
import antesDespues from "@/assets/muestra-antes-despues.jpg";
import { EnlaceInterno } from "../Telon";

const TARJETAS = [
  {
    titulo: "Cómo se ve una ficha de Google bien hecha",
    etiqueta: "Ficha",
    ruta: "/muestras/ficha-de-google",
    img: ficha,
    alt: "Maqueta de una ficha de Google completa y ordenada",
  },
  {
    titulo: "Cómo se ve su negocio en un celular",
    etiqueta: "Sitio",
    ruta: "/muestras/sitio-en-celular",
    img: celular,
    alt: "Maqueta de un sitio de negocio abierto en un celular",
  },
  {
    titulo: "La misma ficha, antes y después",
    etiqueta: "Antes / Después",
    ruta: "/muestras/antes-y-despues",
    img: antesDespues,
    alt: "Comparación lado a lado de una ficha desordenada y una ordenada",
  },
];

export function Muestras() {
  return (
    <section id="muestras" className="contenedor py-[var(--paso)]">
      <p className="etiqueta flex items-center gap-3 text-gris-texto">
        <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
        No tenemos testimonios todavía. Tenemos esto.
      </p>

      <p className="parrafo mt-6 text-[19px]">
        Somos nuevos y no vamos a inventar clientes. Lo que sí podemos mostrarle
        es exactamente cómo trabajamos: abra cualquiera de estas tres y véalo por
        dentro.
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
                className="text-[18px] uppercase leading-tight"
                style={{ fontFamily: "var(--display)", fontWeight: 700 }}
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
    </section>
  );
}
