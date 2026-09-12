import { createFileRoute } from "@tanstack/react-router";

import { CtaWhatsApp } from "@/components/CtaWhatsApp";
import { CtaAuditor } from "@/components/CtaAuditor";
import { Enjambre } from "@/components/Enjambre";
import { ParticulasHero } from "@/components/ParticulasHero";
import { Muestras } from "@/components/secciones/Muestras";
import { TarjetasApiladas } from "@/components/secciones/TarjetasApiladas";
import { Precios } from "@/components/secciones/Precios";
import { Cintas } from "@/components/secciones/Cintas";
import { Preguntas } from "@/components/secciones/Preguntas";
import oficinaAsset from "@/assets/oficina-mk-web.webp.asset.json";

const TITULO =
  "MK Web Studio — Ficha de Google y sitio web para negocios en Honduras";
const DESCRIPCION =
  "Ficha de Google y sitio web hecho para el celular. Precios cerrados: L 3,750 de entrada, L 600 al mes. Vea cómo aparece su negocio en Google, sin registrarse.";

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
      <section className="contenedor relative isolate overflow-hidden pb-[var(--paso)] pt-16 md:pt-24">
        <ParticulasHero />
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Fichas de Google y sitios web para negocios
        </p>

        <h1 className="editorial mt-8 text-[clamp(44px,9vw,104px)]">
          Que lo encuentren.
          <br />Y que le escriban.
        </h1>

        <p className="mt-8 max-w-[46ch] text-[19px]">
          La ficha de Google hace que lo encuentren. El sitio decide si le
          escriben. Uno sin el otro queda a medias.
        </p>

        <div className="mt-10">
          <div className="mb-6 empty:hidden">
            <CtaAuditor />
          </div>
          <CtaWhatsApp secundario />
          <p className="etiqueta mt-4 text-[13px] text-gris-texto">
            Escriba el nombre de su negocio y vea cómo aparece en Google al lado
            de su competencia. Sin registro, sin dejar sus datos. Un minuto.
          </p>
        </div>
      </section>

      <div className="border-y border-gris py-10">
        <p
          className="contenedor text-[clamp(20px,3.2vw,34px)] italic"
          style={{ fontFamily: "var(--serifa)", fontWeight: 400 }}
        >
          Escriba el nombre de su negocio y vea lo que ve un cliente cuando lo
          busca en Google — y lo que ve de su competencia.
        </p>
      </div>

      <Muestras />
      <Enjambre />
      <TarjetasApiladas />
      <Precios />
      <Cintas />
      <Preguntas />


      <section
        id="diagnostico"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <img
          src={oficinaAsset.url}
          alt="Equipo de MK Web Studio en su oficina en Tegucigalpa"
          loading="lazy"
          width={1672}
          height={941}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/[0.72]" aria-hidden="true" />
        <div className="contenedor relative text-center">
          <p className="etiqueta text-coral">Sin costo y sin compromiso</p>
          <h2 className="editorial mx-auto mt-6 max-w-[18ch] text-[clamp(36px,7vw,76px)] text-white">
            Vea su negocio como lo ve un cliente.
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-white/80">
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
      </section>
    </>
  );
}
