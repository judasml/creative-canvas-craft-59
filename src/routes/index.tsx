import { createFileRoute } from "@tanstack/react-router";

import { CtaWhatsApp } from "@/components/CtaWhatsApp";
import { Enjambre } from "@/components/Enjambre";
import { Muestras } from "@/components/secciones/Muestras";
import { TarjetasApiladas } from "@/components/secciones/TarjetasApiladas";
import { Precios } from "@/components/secciones/Precios";
import { Cintas } from "@/components/secciones/Cintas";
import fotoCta from "@/assets/cta-negocio.jpg";

const TITULO =
  "MK Web Studio — Fichas de Google y sitios web para negocios en Tegucigalpa, Honduras";
const DESCRIPCION =
  "Le configuramos su ficha de Google y le hacemos su sitio web para celular. Precios cerrados desde L 3,500. Le mandamos un video gratis mostrándole qué encuentra un cliente cuando busca su negocio.";

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
      <section className="contenedor pb-[var(--paso)] pt-16 md:pt-24">
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
          <CtaWhatsApp />
          <p className="etiqueta mt-4 text-[13px] text-gris-texto">
            Sin formulario. Le escribe por WhatsApp y le mando el video.
          </p>
        </div>
      </section>

      <div className="border-y border-gris py-10">
        <p
          className="contenedor text-[clamp(20px,3.2vw,34px)] italic"
          style={{ fontFamily: "var(--serifa)", fontWeight: 400 }}
        >
          Le muestro en video qué encuentra un cliente cuando busca su negocio en
          Google — y qué encuentra de su competencia.
        </p>
      </div>

      <Muestras />
      <Enjambre />
      <TarjetasApiladas />
      <Precios />
      <Cintas />

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={fotoCta}
          alt="Dueño de un negocio revisando su celular dentro de su local"
          loading="lazy"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/[0.72]" aria-hidden="true" />
        <div className="contenedor relative text-center">
          <p className="etiqueta text-coral">Gratis y sin compromiso</p>
          <h2 className="editorial mx-auto mt-6 max-w-[18ch] text-[clamp(36px,7vw,76px)] text-white">
            Analizamos su negocio y le mandamos un video de diagnóstico.
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-white/80">
            Le grabamos la pantalla buscando su negocio en Google. Va a ver lo que
            ve un cliente — y lo que ve de su competencia. Sin reunión, sin llamada
            y sin que tenga que llenar nada.
          </p>
          <div className="mt-10">
            <CtaWhatsApp />
          </div>
          <p className="etiqueta mt-4 text-[13px] text-white/60">
            Le respondemos el mismo día.
          </p>
        </div>
      </section>
    </>
  );
}
