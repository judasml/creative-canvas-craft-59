import { createFileRoute } from "@tanstack/react-router";
import { NOMBRE_LEGAL, CORREO } from "@/lib/site";
import { EnlaceInterno } from "@/components/Telon";

const TITULO = "Términos y condiciones — MK Web Studio";
const DESCRIPCION =
  "Condiciones de contratación de los servicios de ficha de Google, sitio web y servicio mensual de MK Web Studio.";

export const Route = createFileRoute("/terminos")({
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
      <h1 className="editorial text-[clamp(36px,7vw,76px)]">
        Términos y condiciones
      </h1>
      <p className={P}>
        Estas condiciones regulan la contratación de los servicios de {NOMBRE_LEGAL}{" "}
        (MK Web Studio). Al contratar cualquiera de nuestros servicios, usted acepta
        lo que sigue.
      </p>

      <h2 className={H2}>Servicios</h2>
      <p className={P}>
        Ofrecemos la configuración de la ficha de Google de su negocio, el
        desarrollo y publicación de su sitio web, y un servicio mensual de
        mantenimiento. El alcance de cada servicio es el que aparece publicado en
        esta página y el que se confirma por escrito antes de arrancar.
      </p>

      <h2 className={H2}>Precios y pagos</h2>
      <p className={P}>
        Los precios publicados son cerrados y están expresados en lempiras. El
        servicio mensual cuesta L 600 al mes y se cobra L 1,800 cada tres meses, por
        adelantado. El sitio se paga mitad al arrancar y mitad al publicar.
      </p>

      <h2 className={H2}>Propiedad y accesos</h2>
      <p className={P}>
        El sitio, el dominio, la ficha y todos los accesos son del cliente. Se
        entregan por escrito. Si el cliente cancela, no retenemos ningún activo.
      </p>

      <h2 className={H2}>Cancelación</h2>
      <p className={P}>
        El servicio mensual puede cancelarse en cualquier momento. La cancelación
        detiene el servicio al final del período ya pagado; no hay penalidad ni
        cláusula de permanencia.
      </p>

      <h2 className={H2}>Responsabilidad</h2>
      <p className={P}>
        No controlamos las políticas de Google ni sus tiempos de aprobación, ni
        garantizamos posiciones de búsqueda. Nos comprometemos con el trabajo
        descrito, no con resultados de terceros.
      </p>

      <h2 className={H2}>Contacto</h2>
      <p className={P}>Para cualquier consulta sobre estas condiciones: {CORREO}.</p>
      <EnlaceInterno
        to="/"
        className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral"
      >
        ← Volver
      </EnlaceInterno>
    </article>
  );
}
