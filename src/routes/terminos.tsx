import { createFileRoute } from "@tanstack/react-router";
import { NOMBRE_LEGAL, CORREO } from "@/lib/site";
import { EnlaceInterno } from "@/components/Telon";

const TITULO = "Términos y condiciones — MK Web Studio";
const DESCRIPCION =
  "Condiciones de contratación del sitio web, la ficha de Google y el servicio mensual opcional de MK Web Studio.";

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
      <h1 className="editorial mt-10 text-[clamp(36px,7vw,76px)]">Términos y condiciones</h1>
      <p className={P}>Actualizados el 5 de octubre de 2026.</p>
      <p className={P}>
        Estas condiciones regulan la contratación de los servicios de {NOMBRE_LEGAL} (MK Web Studio). Al contratar
        cualquiera de nuestros servicios, usted acepta lo que sigue.
      </p>

      <h2 className={H2}>Servicios</h2>
      <p className={P}>
        Ofrecemos dos sitios web, con pago único. El Sitio Pro es una página de hasta 7 secciones, diseñada para su
        rubro a partir de nuestro catálogo y hecha para verse bien en el celular y en la computadora. El sitio web
        premium tiene hasta 5 páginas, con más secciones, animación y efectos. Los proyectos de más de 5 páginas se
        cotizan aparte.
      </p>
      <p className={P}>
        Los dos incluyen una ficha de Google creada o mejorada para una ubicación, el dominio a nombre suyo, el
        hosting, todos los accesos entregados por escrito y los primeros 2 meses del servicio mensual. El alcance de
        cada servicio es el publicado en la sección de precios de este sitio y el que se confirma por escrito antes de
        arrancar.
      </p>

      <h2 className={H2}>Precios y pagos</h2>
      <p className={P}>
        Los precios publicados son cerrados y están en lempiras. El Sitio Pro cuesta L 3,750 y el sitio web premium
        L 5,000. Se pagan mitad al arrancar y mitad al publicar.
      </p>
      <p className={P}>
        El servicio mensual cuesta L 600 al mes. Si paga tres meses por adelantado, cuesta L 1,500, es decir, L 500 al
        mes.
      </p>

      <h2 className={H2}>Servicio mensual</h2>
      <p className={P}>
        El servicio mensual es opcional. Pagar el sitio y la ficha no obliga a contratarlo. Incluye el reporte mensual
        por WhatsApp, la atención de su ficha y de sus reseñas, el sitio en línea con dominio y hosting al día, y 2
        cambios al mes en su sitio, resueltos en 48 horas.
      </p>
      <p className={P}>
        Un cambio es modificar un texto, una foto, un precio o un horario, o agregar o quitar un elemento de una lista.
        No incluye secciones nuevas ni rediseños. Los cambios que no se usan en un mes no se acumulan para el siguiente.
        Cada cambio adicional cuesta L 200, cinco cambios cuestan L 800, y la ficha de otra sucursal cuesta L 300 al
        mes.
      </p>

      <h2 className={H2}>Si no contrata el servicio mensual</h2>
      <p className={P}>
        Recibe los 2 meses incluidos, con reportes y el estado de su página. Después, su sitio sigue en línea hasta
        completar el primer año, sin reportes, revisiones ni cambios. Al cumplir el año le entregamos el sitio y el
        dominio en una cuenta a su nombre, con aviso de 30 días e instrucciones por escrito. Desde el segundo año, la
        renovación del dominio corre por su cuenta.
      </p>

      <h2 className={H2}>Plazo de entrega</h2>
      <p className={P}>
        El sitio se publica entre 3 y 5 días hábiles después de que recibimos los textos y las fotos aprobados por
        usted.
      </p>

      <h2 className={H2}>Propiedad y accesos</h2>
      <p className={P}>
        El sitio, el dominio, la ficha y todos los accesos son del cliente y se entregan por escrito. Administramos su
        ficha de Google con su autorización, y usted sigue siendo el propietario. No retenemos ningún activo.
      </p>

      <h2 className={H2}>Su precio no sube</h2>
      <p className={P}>
        El precio del servicio mensual no sube mientras usted siga activo. Si cambiamos nuestros precios, el cambio
        aplica a los clientes nuevos.
      </p>

      <h2 className={H2}>Cancelación</h2>
      <p className={P}>
        El servicio mensual puede cancelarse en cualquier momento, sin penalidad ni cláusula de permanencia. El
        servicio se detiene al final del período ya pagado: dejan de llegar los reportes, los cambios y la atención de
        su ficha. Si cancela durante el primer año, su sitio sigue en línea hasta cumplirlo; después le entregamos el
        sitio y el dominio. El historial de su ficha no se puede recuperar después, porque Google solo guarda unos
        meses de datos.
      </p>

      <h2 className={H2}>Contenido que nos entrega</h2>
      <p className={P}>
        Usted es responsable de que los textos, fotos, logos y datos que nos entrega sean suyos o tenga permiso para
        usarlos.
      </p>

      <h2 className={H2}>Responsabilidad</h2>
      <p className={P}>
        No controlamos las políticas de Google ni sus tiempos de verificación y aprobación, y no garantizamos
        posiciones de búsqueda. Nos comprometemos con el trabajo descrito, no con resultados que dependen de terceros.
      </p>

      <h2 className={H2}>Contacto</h2>
      <p className={P}>Para cualquier consulta sobre estas condiciones: {CORREO}.</p>

      <EnlaceInterno to="/" className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral">
        ← Volver
      </EnlaceInterno>
    </article>
  );
}
