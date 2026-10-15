import { createFileRoute } from "@tanstack/react-router";

import { CtaWhatsApp } from "@/components/CtaWhatsApp";
import { CtaAuditor } from "@/components/CtaAuditor";
import { Enjambre } from "@/components/Enjambre";
import { ParticulasHero } from "@/components/ParticulasHero";
import { Muestras } from "@/components/secciones/Muestras";
import { TarjetasApiladas } from "@/components/secciones/TarjetasApiladas";
import { Precios } from "@/components/secciones/Precios";
import { ComoEmpezamos } from "@/components/secciones/ComoEmpezamos";
import { Cintas } from "@/components/secciones/Cintas";
import { Preguntas } from "@/components/secciones/Preguntas";

const TITULO =
  "MK Web Studio — Ficha de Google y sitio web para negocios en Honduras";
const DESCRIPCION =
  "Ficha de Google y sitio web hecho para el celular, con precios cerrados y publicados. Vea cómo aparece su negocio en Google al lado de su competencia, sin registrarse.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="contenedor relative isolate overflow-hidden pb-[var(--paso)] pt-16 text-center md:pt-24">
        <ParticulasHero />
        <p className="etiqueta flex items-center justify-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          <span>
            Fichas de Google y sitios web para negocios en{" "}
            <span className="normal-case">Honduras</span>
          </span>
        </p>

        <h1 className="editorial mx-auto mt-8 max-w-[16ch] text-[clamp(46px,10.5vw,140px)]">
          Que lo encuentren.
          <br />Y que le escriban.
        </h1>

        <p className="mx-auto mt-8 max-w-[52ch] text-[22px] font-medium leading-snug md:text-[26px]">
          La ficha de Google hace que lo encuentren. El sitio decide si le
          escriben. Uno sin el otro queda a medias.
        </p>

        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="empty:hidden">
              <CtaAuditor />
            </div>
            <a
              href="/#muestras"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-navy px-8 text-[17px] font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5"
            >
              Ver cómo trabajamos
            </a>
          </div>
          <p className="parrafo mx-auto mt-6 max-w-[62ch] text-[18px] font-medium text-navy">
            Escriba el nombre de su negocio y vea cómo aparece en Google al lado
            de su competencia. Sin registro, sin dejar sus datos. Un minuto.
          </p>
        </div>
      </section>

      <Enjambre />
      <TarjetasApiladas />
      <Muestras />
      <Cintas />
      <Precios />
      <ComoEmpezamos />
      <Preguntas />

      <section id="diagnostico" className="bg-navy py-[var(--paso)]">
        <div className="contenedor grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="text-center md:text-left">
            <p className="etiqueta text-coral">Sin costo y sin compromiso</p>
            <h2 className="editorial mt-6 max-w-[18ch] text-[clamp(36px,7vw,76px)] text-white max-md:mx-auto">
              Vea su negocio como lo ve un cliente.
            </h2>
            <p className="mt-8 max-w-[52ch] text-white/80 max-md:mx-auto">
              Escriba el nombre de su negocio y vea cómo aparece en Google al lado
              de su competencia. Sin registrarse, sin llenar nada y sin que nadie lo
              llame. Si después quiere hablar, aquí está el WhatsApp.
            </p>
            <div className="mt-10">
              <div className="mb-6 empty:hidden">
                <CtaAuditor tono="oscuro" />
              </div>
              <CtaWhatsApp tono="oscuro" secundario />
            </div>
            <p className="etiqueta mt-4 text-[13px] text-white/60">
              Le contesta el equipo de MK Web Studio, no un sistema automático. El
              mismo día.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[640px]">
            <img
              src="/brand/auditor/ejemplo-diagnostico.webp"
              alt="Ejemplo del diagnóstico: puntaje de presencia en Google, comparación con negocios del mismo rubro y lista de lo que se puede corregir"
              loading="lazy"
              width={1448}
              height={1086}
              className="block h-auto w-full rounded-[28px] bg-white shadow-[8px_8px_0_#fd5c41]"
            />
            <figcaption className="etiqueta mt-5 text-center text-[13px] text-white/60">
              Ejemplo con los datos de MK Business Solutions
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
