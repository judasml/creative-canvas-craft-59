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
          Todo lo que cuesta está aquí abajo.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radio)] border border-gris bg-white p-8">
            <p className="etiqueta text-gris-texto">Entrada</p>
            <p className="editorial mt-6 text-[64px] leading-none">L 3,750</p>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">
              Mitad al arrancar, mitad al publicar
            </p>
            <ul className="mt-8">
              {[
                "Sitio de una página, hasta 7 secciones, diseñado para su rubro y hecho para el celular",
                "Una ficha de Google, creada o mejorada, para una ubicación",
                "Dominio a nombre suyo, hosting y monitoreo",
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
            <p className="etiqueta text-gris-texto">Sitio web premium</p>
            <p className="editorial mt-6 text-[64px] leading-none">L 7,500</p>
            <p className="etiqueta mt-3 text-[13px] text-gris-texto">
              Mitad al arrancar, mitad al publicar
            </p>
            <ul className="mt-8">
              {[
                "Sitio de hasta 5 páginas, con más secciones y más movimiento",
                "Todo lo demás igual que Entrada: ficha de Google para una ubicación, dominio a su nombre, hosting, monitoreo, accesos por escrito y 2 meses de servicio incluidos",
                "Para negocios con varios servicios o varias áreas que necesitan su propia página",
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
          ¿Necesita más de 5 páginas? Lo conversamos. Colegios, clínicas grandes,
          instituciones.
        </p>
      </div>

      <div className="mt-[var(--paso)] bg-navy py-[var(--paso)] text-white">
        <div className="contenedor">
          <p className="etiqueta text-coral">Un solo nivel. No hay otro.</p>
          <p className="editorial mt-6 text-[clamp(64px,12vw,128px)] leading-none">
            L 600 al mes
          </p>
          <p className="etiqueta mt-4 text-[13px] text-[#8A9BB8]">
             L 1,500 si paga los tres meses por adelantado. equivale a L 500 al mes.
          </p>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {[
              "El rival alcanzable. A quién puede adelantar y cuántas reseñas le faltan para lograrlo.",
              "El mapa de su zona. Quién le gana y a quién le gana, en rojo y verde.",
              "Voz del cliente. Qué elogian y qué critican los clientes de su competencia.",
              "Salud de su ficha, de 0 a 100. Un número que sube cada mes.",
              "Código QR para reseñas. Lo pega en la caja y sus clientes le dejan reseña desde el celular.",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-2 size-[7px] shrink-0 bg-lima" aria-hidden="true" />
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <p className="etiqueta mt-6 text-[13px] text-[#8A9BB8]">
            Incluye además: su ficha atendida, sus reseñas respondidas, y el sitio
            en línea con dominio y hosting al día.
          </p>

          <p className="etiqueta mt-6 text-[13px] text-[#8A9BB8]">
            Incluye 2 cambios al mes en su sitio, resueltos en 48 horas. Un cambio
            es un texto, una foto, un precio o un horario. No incluye secciones
            nuevas.
          </p>

          <p className="etiqueta mt-10 text-[13px] text-[#8A9BB8]">
             ¿necesita más de 2 cambios en un mes? L 200 por cambio. un paquete de 5
             cambios cuesta L 800.


             ¿tiene otra sucursal? su ficha adicional cuesta L 300 al mes.
          </p>

          <div className="mt-10">
            <CtaWhatsApp />
          </div>
        </div>
      </div>

      <div className="contenedor mt-[var(--paso)] grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="editorial text-[28px]">Su precio no sube mientras siga activo.</h3>
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
