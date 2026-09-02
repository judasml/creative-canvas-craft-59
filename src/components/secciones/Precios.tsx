import { CtaWhatsApp } from "../CtaWhatsApp";

const vinetas = "mt-2 flex gap-3 text-[16px]";

export function Precios() {
  return (
    <section id="precios" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Precios completos. Sin &quot;desde&quot;. Sin letra chiquita.
        </p>
        <h2 className="editorial mt-6 text-[clamp(34px,6vw,64px)]">
          Los dos precios están aquí abajo.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radio)] border border-gris bg-white p-8">
            <p className="etiqueta text-gris-texto">Puerta 1 · Se entrega en días</p>
            <p className="editorial mt-6 text-[64px] leading-none">L 3,500</p>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">Pago único</p>
            <ul className="mt-8">
              {[
                "Su ficha de Google completa y correcta — alcance cerrado de 8 puntos",
                "Los primeros 3 meses de servicio incluidos",
                "Su primer reporte",
              ].map((l) => (
                <li key={l} className={vinetas}>
                  <span className="mt-2 size-[7px] shrink-0 bg-coral" aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radio)] border-2 border-navy bg-white p-8">
            <p className="etiqueta text-gris-texto">Puerta 2 · Sitio propio</p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <p className="editorial text-[64px] leading-none">L 7,500</p>
                <p className="etiqueta text-gris-texto">Presencia</p>
              </div>
              <div className="flex items-baseline gap-4">
                <p className="editorial text-[64px] leading-none">L 12,000</p>
                <p className="etiqueta text-gris-texto">
                  Negocio · más secciones y servicios
                </p>
              </div>
            </div>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">
              Mitad al arrancar, mitad al publicar
            </p>
            <ul className="mt-8">
              {[
                "Sitio publicado y hecho para el celular",
                "Ficha de Google configurada",
                "Dominio del primer año y hosting",
                "Monitoreo",
                "Todos sus accesos entregados por escrito",
                "Los primeros 30 días de servicio incluidos",
              ].map((l) => (
                <li key={l} className={vinetas}>
                  <span className="mt-2 size-[7px] shrink-0 bg-coral" aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-l-[3px] border-coral bg-[#ECEEF1] p-6">
          <p className="parrafo">
            ¿Ya tiene el servicio activo? El sitio le cuesta L 6,000 (Presencia) o
            L 10,000 (Negocio).
          </p>
          <p className="parrafo mt-4 text-gris-texto">
            No es una promoción. Es que la ficha ya está configurada, la reunión ya
            la hicimos y su contenido ya está en mano: son unas cuatro horas menos
            de trabajo, y no se las vamos a cobrar.
          </p>
        </div>

        <p className="etiqueta mt-10 text-center text-gris-texto">
          Colegios, clínicas e instituciones con muchas secciones: lo conversamos.
        </p>
      </div>

      <div className="mt-[var(--paso)] bg-navy py-[var(--paso)] text-white">
        <div className="contenedor">
          <p className="etiqueta text-coral">Un solo nivel. No hay otro.</p>
          <p className="editorial mt-6 text-[clamp(64px,12vw,128px)] leading-none">
            L 600 al mes
          </p>
          <p className="etiqueta mt-4 text-[13px] text-[#8A9BB8]">
            Se cobra L 1,800 cada tres meses, por adelantado
          </p>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {[
              "Su ficha atendida: horarios de feriados, fotos nuevas, publicaciones",
              "Sus reseñas respondidas",
              "Reporte cada mes",
              "2 modificaciones al mes en su sitio, resueltas en 48 horas",
              "Sitio en línea, dominio y hosting al día, monitoreo",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-2 size-[7px] shrink-0 bg-lima" aria-hidden="true" />
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <p className="etiqueta mt-10 text-[13px] text-[#8A9BB8]">
            Si paga 12 meses por adelantado, un mes va incluido: L 6,600.
            <br />
            Modificación adicional: L 200 — o cinco por L 800.
          </p>

          <div className="mt-10">
            <CtaWhatsApp />
          </div>
        </div>
      </div>

      <div className="contenedor mt-[var(--paso)] grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="editorial text-[28px]">Su cuota mensual no le sube nunca.</h3>
          <p className="parrafo mt-4 text-gris-texto">
            El precio que contrata hoy es el que paga en tres años. Si mañana
            subimos el precio, sube para los nuevos, no para usted.
          </p>
        </div>
        <div>
          <h3 className="editorial text-[28px]">Puede cancelar cuando quiera.</h3>
          <p className="parrafo mt-4 text-gris-texto">
            El sitio y el dominio son suyos, no nuestros. Si cancela, se detiene el
            servicio — no se le cae nada ni se le queda nada secuestrado.
          </p>
        </div>
      </div>
    </section>
  );
}
