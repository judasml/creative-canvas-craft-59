import { createFileRoute } from "@tanstack/react-router";
import { NOMBRE_LEGAL, CORREO } from "@/lib/site";
import { EnlaceInterno } from "@/components/Telon";

const TITULO = "Política de privacidad — MK Web Studio";
const DESCRIPCION =
  "Cómo trata MK Web Studio los datos de quienes escriben por WhatsApp y de los negocios que contratan sus servicios.";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
    ],
  }),
  component: Pagina,
});

const H2 = "editorial mt-12 text-[28px]";
const P = "parrafo mt-4 text-gris-texto";

function Pagina() {
  return (
    <article className="contenedor py-[var(--paso)]">
      <EnlaceInterno to="/" className="etiqueta text-gris-texto hover:text-coral">
        ← Volver
      </EnlaceInterno>
      <h1 className="editorial mt-10 text-[clamp(36px,7vw,76px)]">
        Política de privacidad
      </h1>
      <p className={P}>
        {NOMBRE_LEGAL} (MK Web Studio) trata con reserva la información de quienes
        nos contactan. Esta página explica qué recogemos y qué hacemos con ello.
      </p>

      <h2 className={H2}>Qué recogemos</h2>
      <p className={P}>
        Este sitio no tiene formularios y no usa analítica de terceros. Solo
        conocemos los datos que usted nos escribe por WhatsApp: su nombre, el
        nombre de su negocio y lo que decida contarnos.
      </p>

      <h2 className={H2}>Para qué lo usamos</h2>
      <p className={P}>
        Únicamente para prepararle el diagnóstico, atenderle y, si contrata,
        prestarle el servicio. No vendemos ni compartimos su información con
        terceros con fines comerciales.
      </p>

      <h2 className={H2}>Servicios de terceros</h2>
      <p className={P}>
        La conversación ocurre dentro de WhatsApp y se rige también por las
        políticas de esa plataforma. Para prestar el servicio podemos administrar,
        con su autorización, su ficha de Google, su dominio y su hosting.
      </p>

      <h2 className={H2}>Sus derechos</h2>
      <p className={P}>
        Puede pedirnos en cualquier momento que borremos la información que tenemos
        suya escribiéndonos a {CORREO}.
      </p>
      <EnlaceInterno
        to="/"
        className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral"
      >
        ← Volver
      </EnlaceInterno>
    </article>
  );
}
