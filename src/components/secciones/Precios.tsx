import { CtaWhatsApp } from "../CtaWhatsApp";

const vinetas = "mt-2 flex gap-3 text-[16px]";

export function Precios() {
  return (
    <section id="precios" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Precios completos. Todo está incluido. Sin letra chiquita.
        </p>
        <h2 className="editorial mt-6 text-[clamp(34px,6vw,64px)]">
          Los dos precios están aquí abajo.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radio)] border border-gris bg-white p-8">
            <p className="etiqueta text-gris-texto">Entrada · Se entrega en días</p>
            <p className="editorial mt-6 text-[64px] leading-none">L 3,750</p>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">
              Pago único · mitad al arrancar, mitad al publicar
            </p>
            <ul className="mt-8">
              {[
                "Sitio publicado y diseñado para su rubro",
                "Creación o mejoramiento de su ficha de Google",
                "Dominio a nombre suyo",
                "Hosting y monitoreo",
                "Todos sus accesos entregados por escrito",
                "Los primeros 2 meses de servicio incluidos",
              ].map((l) => (
                <li key={l} className={vinetas}>
                  <span className="mt-2 size-[7px] shrink-0 bg-coral" aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radio)] border-2 border-navy bg-white p-8">
            <p className="etiqueta text-gris-texto">
              Premium · Lo mismo, con más páginas y secciones
            </p>
            <p className="editorial mt-6 text-[64px] leading-none">L 7,500</p>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">
              Pago único · mitad al arrancar, mitad al publicar
            </p>
            <ul className="mt-8">
              {[
                "Todo lo de Entrada",
                "Más páginas y más secciones",
                "Más servicios o más productos en pantalla",
                "Ficha de Google atendida el primer día",
                "Los primeros 2 meses de servicio incluidos",
              ].map((l) => (
                <li key={l} className={vinetas}>
                  <span className="mt-2 size-[7px] shrink-0 bg-coral" aria-hidden="true" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
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
            Con opción trimestral: L 1,800 por adelantado
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
            Modificación adicional: L 200 — o cinco por L 800. Ficha adicional de
            otra sucursal: L 300 al mes.
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
            El sitio y el dominio están a nombre suyo: si cancela, se los lleva.
            Lo que se detiene es el servicio — el hosting, el monitoreo y la
            atención de su ficha. Lo único que no se puede recuperar después es el
            historial: Google solo guarda unos meses de datos, y los que no se
            hayan sacado se pierden.
          </p>
        </div>
      </div>
    </section>
  );
}
