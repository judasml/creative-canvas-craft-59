import type { ReactNode } from "react";
import { CtaWhatsApp } from "../CtaWhatsApp";
import { EnlaceInterno } from "../Telon";

/*
 * Sección de precios: dos tarjetas lado a lado.
 * 1) Pago único: sitio Pro o sitio web premium, con ficha, dominio, hosting y 2 meses incluidos.
 * 2) Servicio mensual: opcional, explicado completo y sin letra pequeña.
 * Los precios están en estas constantes para cambiarlos en un solo lugar.
 */
const PRECIO_PRO = "3,750";
const PRECIO_PREMIUM = "5,000";
const PRECIO_MES = "600";
const PRECIO_TRIMESTRE = "1,500";

const C = {
  navy: "#0A2378",
  navyOscuro: "#011A40",
  navySuave: "#394C6A",
  coral: "#FD5C41",
  lima: "#AFDE00",
  hueso: "#F6F7F8",
  piel: "#E3AC86",
};

const tarjeta =
  "relative flex flex-col rounded-[28px] border-2 border-navy bg-white px-6 pb-8 pt-20 shadow-[8px_8px_0_#0A2378] md:px-10 md:pb-10";
const titulo = "mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[36px]";
const subtitulo = "mt-8 text-[18px] font-bold";
const texto = "text-[16px] leading-[1.55] md:text-[17px]";

function Punto({ color = C.coral }: { color?: string }) {
  return <span className="mt-[9px] size-[8px] shrink-0" style={{ background: color }} aria-hidden="true" />;
}

function Lista({ items, color }: { items: ReactNode[]; color?: string }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((it, i) => (
        <li key={i} className={`flex gap-3 ${texto}`}>
          <Punto color={color ?? C.coral} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* Rostro del personaje de las animaciones, contento */
function Cara() {
  return (
    <g>
      <path d="M12 104 Q14 80 50 76 Q86 80 88 104 Z" fill={C.navyOscuro} />
      <path d="M43 77 L50 86 L57 77" fill="none" stroke={C.coral} strokeWidth="3" strokeLinejoin="round" />
      <rect x="44" y="66" width="12" height="14" rx="4" fill="#D39A74" />
      <circle cx="28" cy="52" r="4.5" fill="#D9A07A" />
      <circle cx="72" cy="52" r="4.5" fill="#D9A07A" />
      <ellipse cx="50" cy="50" rx="22" ry="25" fill={C.piel} />
      <path d="M28 46 Q26 22 50 21 Q75 22 72 46 Q68 34 56 32 Q44 31 38 36 Q32 40 28 46 Z" fill={C.navyOscuro} />
      <path
        d="M38 41 Q42 37 46 40 M54 40 Q58 37 62 41 M39 49 Q42 45 45 49 M55 49 Q58 45 61 49"
        stroke={C.navyOscuro}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M50 51 Q53 57 49 58" stroke="#B97E5A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M42 60 Q50 71 58 60 Z" fill="#7A2E22" />
      <g fill={C.coral} opacity=".45">
        <ellipse cx="35" cy="57" rx="4" ry="2.6" />
        <ellipse cx="65" cy="57" rx="4" ry="2.6" />
      </g>
    </g>
  );
}

/* Ilustración 1: el personaje con su sitio en la computadora y en el celular */
function IlustracionSitio() {
  return (
    <svg width="168" height="150" viewBox="0 0 168 150" aria-hidden="true">
      <circle cx="84" cy="78" r="66" fill={C.lima} />
      <g transform="translate(34 18)">
        <Cara />
      </g>
      {/* computadora */}
      <rect x="26" y="96" width="74" height="46" rx="6" fill={C.navy} stroke={C.navyOscuro} strokeWidth="2" />
      <rect x="31" y="101" width="64" height="31" rx="3" fill={C.hueso} />
      <rect x="35" y="105" width="30" height="5" rx="2" fill={C.navy} />
      <rect x="35" y="113" width="44" height="3" rx="1.5" fill="#C9D0DC" />
      <rect x="35" y="119" width="20" height="8" rx="3" fill={C.coral} />
      <rect x="18" y="140" width="90" height="6" rx="3" fill={C.navyOscuro} />
      {/* celular */}
      <rect x="112" y="84" width="34" height="58" rx="7" fill={C.navyOscuro} />
      <rect x="115" y="89" width="28" height="48" rx="4" fill={C.hueso} />
      <rect x="118" y="93" width="16" height="4" rx="2" fill={C.navy} />
      <rect x="118" y="100" width="22" height="3" rx="1.5" fill="#C9D0DC" />
      <rect x="118" y="106" width="22" height="14" rx="3" fill={C.lima} />
      <rect x="118" y="124" width="14" height="7" rx="3" fill={C.coral} />
      {/* destello */}
      <path d="M150 30 l3 9 9 -4 -6 8 8 5 -10 1 1 10 -6 -8 -6 7 2 -10 -10 -1 9 -5 -5 -8 9 3 Z" fill={C.coral} />
    </svg>
  );
}

/* Ilustración 2: el personaje recibe su reporte mensual por WhatsApp */
function IlustracionMensual() {
  return (
    <svg width="168" height="150" viewBox="0 0 168 150" aria-hidden="true">
      <circle cx="84" cy="78" r="66" fill={C.coral} />
      <g transform="translate(34 18)">
        <Cara />
      </g>
      {/* celular en la mano */}
      <rect x="96" y="92" width="36" height="54" rx="7" fill={C.navyOscuro} />
      <rect x="99" y="97" width="30" height="44" rx="4" fill={C.hueso} />
      <rect x="102" y="101" width="22" height="9" rx="3" fill="#fff" stroke="#DEE1E6" />
      <rect x="102" y="113" width="24" height="12" rx="3" fill="#fff" stroke="#DEE1E6" />
      <rect x="104" y="116" width="6" height="6" rx="2" fill={C.lima} />
      <rect x="112" y="117" width="11" height="2" rx="1" fill={C.navy} />
      <rect x="112" y="121" width="8" height="2" rx="1" fill="#C9D0DC" />
      <rect x="102" y="128" width="18" height="8" rx="3" fill="#fff" stroke="#DEE1E6" />
      <ellipse cx="96" cy="128" rx="8" ry="10" fill={C.piel} />
      {/* globo de mensaje */}
      <g transform="translate(6 26)">
        <rect width="46" height="30" rx="9" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <path d="M30 29 L38 38 L38 29 Z" fill="#fff" stroke={C.navy} strokeWidth="2" strokeLinejoin="round" />
        <rect x="27" y="27" width="12" height="4" fill="#fff" />
        <path d="M13 15 l6 6 12 -12" stroke={C.navy} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* calendario del mes */}
      <g transform="translate(128 26)">
        <rect width="30" height="30" rx="6" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <rect width="30" height="9" rx="4" fill={C.navy} />
        <text x="15" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill={C.navy} fontFamily="inherit">
          1
        </text>
      </g>
    </svg>
  );
}

export function Precios() {
  return (
    <section id="precios" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Precios completos. Sin letra chiquita.
        </p>
        <h2 className="editorial mt-6 text-[clamp(34px,6vw,64px)]">Todo lo que cuesta está aquí abajo.</h2>
        <p className="parrafo mt-4 max-w-[720px] text-[18px] text-gris-texto">
          Primero paga una sola vez por su sitio y su ficha. La mensualidad es aparte y es opcional.
        </p>

        <div className="mt-24 grid gap-x-10 gap-y-28 md:grid-cols-2">
          {/* Tarjeta 1: pago único */}
          <article className={tarjeta}>
            <div className="absolute -top-[86px] left-1/2 -translate-x-1/2">
              <IlustracionSitio />
            </div>
            <p className="etiqueta text-gris-texto">Pago único</p>
            <h3 className={titulo}>Su sitio y su ficha</h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-hueso p-3 md:p-4">
                <p className="text-[15px] font-bold">Sitio Pro</p>
                <p className="editorial mt-1 whitespace-nowrap text-[clamp(26px,7vw,44px)] leading-none md:text-[clamp(24px,3vw,44px)]">
                  <span className="moneda">L</span> {PRECIO_PRO}
                </p>
              </div>
              <div className="rounded-2xl bg-hueso p-3 md:p-4">
                <p className="text-[15px] font-bold">Sitio web premium</p>
                <p className="editorial mt-1 whitespace-nowrap text-[clamp(26px,7vw,44px)] leading-none md:text-[clamp(24px,3vw,44px)]">
                  <span className="moneda">L</span> {PRECIO_PREMIUM}
                </p>
              </div>
            </div>
            <p className={`mt-4 ${texto} text-gris-texto`}>Mitad al arrancar y mitad al publicar.</p>

            <p className={subtitulo}>Elija su sitio</p>
            <Lista
              items={[
                <>
                  <strong>Sitio Pro:</strong> una página de hasta 7 secciones, diseñado para su rubro y hecho para verse
                  bien en el celular y en la computadora.{" "}
                  <a
                    href="/plantillas/catalogo-variantes/index.html"
                    className="font-bold text-navy underline underline-offset-4"
                  >
                    Ver muestras
                  </a>
                </>,
                <>
                  <strong>Sitio web premium:</strong> hasta 5 páginas, con más secciones, animación y efectos. Para
                  negocios con varios servicios o varias áreas.{" "}
                  <EnlaceInterno to="/catalogo-premium" className="font-bold text-navy underline underline-offset-4">
                    Ver muestras
                  </EnlaceInterno>
                </>,
              ]}
            />

            <p className={subtitulo}>Los dos incluyen</p>
            <Lista
              items={[
                "Una ficha de Google, creada o mejorada, para una ubicación.",
                "Dominio a nombre suyo y hosting.",
                "Todos sus accesos entregados por escrito.",
                "Los primeros 2 meses del servicio mensual, sin costo adicional.",
              ]}
            />

            <p className={`mt-8 ${texto} text-gris-texto`}>
              ¿Necesita más de 5 páginas? Lo conversamos: colegios, clínicas grandes, instituciones.
            </p>
          </article>

          {/* Tarjeta 2: servicio mensual opcional */}
          <article className={tarjeta}>
            <div className="absolute -top-[86px] left-1/2 -translate-x-1/2">
              <IlustracionMensual />
            </div>
            <p className="etiqueta text-gris-texto">Opcional</p>
            <h3 className={titulo}>Servicio mensual</h3>

            <div className="mt-6 rounded-2xl bg-navy p-5 text-white">
              <p className="editorial text-[clamp(34px,4vw,44px)] leading-none">
                <span className="moneda">L</span> {PRECIO_MES} al mes
              </p>
              <p className="mt-2 text-[16px]">
                o <span className="moneda">L</span> {PRECIO_TRIMESTRE} si paga tres meses por adelantado: le quedan en{" "}
                <span className="moneda">L</span> 500 al mes.
              </p>
            </div>

            <p className={`mt-4 ${texto}`}>
              <strong>No es obligatorio.</strong> Los primeros 2 meses ya vienen incluidos con su sitio. Después usted
              decide si sigue, y puede cancelar cuando quiera.
            </p>

            <p className={subtitulo}>Cada mes recibe por WhatsApp un reporte con</p>
            <Lista
              color={C.navy}
              items={[
                <>
                  <strong>A quién puede alcanzar:</strong> qué negocio de su zona puede pasar y cuántas reseñas le
                  faltan.
                </>,
                <>
                  <strong>El mapa de su zona:</strong> quién le gana y a quién le gana usted.
                </>,
                <>
                  <strong>Lo que dicen los clientes de su competencia:</strong> qué elogian y qué critican.
                </>,
                <>
                  <strong>La salud de su ficha:</strong> una nota de 0 a 100 para ver cómo mejora.
                </>,
                <>
                  <strong>Un código QR para reseñas:</strong> lo pone en la caja y sus clientes le dejan reseña desde el
                  celular.
                </>,
              ]}
            />

            <p className={subtitulo}>Y nosotros nos encargamos de</p>
            <Lista
              color={C.navy}
              items={[
                "Mantener su ficha al día: horarios, feriados, fotos y publicaciones.",
                "Responder sus reseñas.",
                "Mantener su sitio en línea, con dominio y hosting al día.",
                "Hacer 2 cambios al mes en su sitio, resueltos en 48 horas. Un cambio es un texto, una foto, un precio o un horario. No incluye secciones nuevas.",
              ]}
            />

            <p className={subtitulo}>Si necesita más</p>
            <Lista
              color={C.navy}
              items={[
                <>
                  Un cambio extra: <span className="moneda">L</span> 200. Cinco cambios: <span className="moneda">L</span>{" "}
                  800.
                </>,
                <>
                  La ficha de otra sucursal: <span className="moneda">L</span> 300 al mes.
                </>,
              ]}
            />

            <p className={`mt-8 rounded-2xl bg-hueso p-4 ${texto}`}>
              <strong>Si no lo contrata,</strong> su sitio sigue en línea hasta completar el primer año, pero sin reportes
              ni cambios. Al cumplir el año le entregamos el sitio y el dominio, que ya están a su nombre, y la renovación
              del dominio (unos <span className="moneda">L</span> 280 al año) pasa a cuenta suya.
            </p>
          </article>
        </div>

        <div className="mt-14 flex justify-center">
          <CtaWhatsApp />
        </div>
      </div>

      <div className="contenedor mt-[var(--paso)] grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="editorial text-[28px]">Su precio no sube mientras siga activo.</h3>
          <p className="parrafo mt-4 text-gris-texto">
            El precio que contrata hoy es el que paga en tres años. Si mañana subimos el precio, sube para los nuevos, no
            para usted.
          </p>
        </div>
        <div>
          <h3 className="editorial text-[28px]">Puede cancelar cuando quiera.</h3>
          <p className="parrafo mt-4 text-gris-texto">
            El sitio y el dominio están a nombre suyo: si cancela, se los entregamos. Lo que se detiene es el servicio:
            los reportes, los cambios y la atención de su ficha. Lo único que no se puede recuperar después es el
            historial: Google solo guarda unos meses de datos, y los que no se hayan sacado se pierden.
          </p>
        </div>
      </div>
    </section>
  );
}
