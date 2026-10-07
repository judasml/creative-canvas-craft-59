import { createFileRoute } from "@tanstack/react-router";
import { NOMBRE_LEGAL, CORREO } from "@/lib/site";
import { EnlaceInterno } from "@/components/Telon";

const TITULO = "Política de privacidad — MK Web Studio";
const DESCRIPCION =
  "Qué datos conoce MK Web Studio de quienes le escriben y de los negocios que contratan sus servicios, y qué hace con ellos.";

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
      <h1 className="editorial mt-10 text-[clamp(36px,7vw,76px)]">Política de privacidad</h1>
      <p className={P}>Actualizada el 5 de octubre de 2026.</p>
      <p className={P}>
        {NOMBRE_LEGAL} (MK Web Studio) trata con reserva la información de quienes nos contactan y de los negocios
        que atendemos. Esta página explica qué datos conocemos, para qué los usamos y qué puede pedirnos.
      </p>

      <h2 className={H2}>Qué datos conocemos</h2>
      <p className={P}>
        Este sitio no tiene formularios y no usa herramientas de analítica ni de publicidad de terceros. Conocemos lo
        que usted nos escribe por WhatsApp o por correo: su nombre, el nombre de su negocio y lo que decida contarnos.
      </p>
      <p className={P}>
        Si nos contrata, también recibimos lo necesario para prestarle el servicio: textos, fotos y datos de contacto
        de su negocio, los datos para registrar el dominio a su nombre y el acceso de administrador a su ficha de
        Google.
      </p>
      <p className={P}>
        Como cualquier sitio web, el servicio que lo aloja puede registrar datos técnicos de la visita, como la
        dirección IP y el tipo de navegador.
      </p>

      <h2 className={H2}>El diagnóstico</h2>
      <p className={P}>
        Cuando usa el diagnóstico, el nombre del negocio que escribe se usa para consultar la información pública que
        Google muestra de ese negocio y de los negocios de su zona. No le pedimos registrarse ni dejar sus datos
        personales.
      </p>

      <h2 className={H2}>Para qué los usamos</h2>
      <p className={P}>
        Para prepararle el diagnóstico, atender sus consultas y, si contrata, hacer su sitio, atender su ficha y
        enviarle los reportes del servicio mensual. No vendemos su información ni la compartimos con terceros con fines
        comerciales.
      </p>

      <h2 className={H2}>Con quién se comparte</h2>
      <p className={P}>
        Solo con los servicios que hacen falta para el trabajo, y solo lo necesario: Google, donde vive su ficha;
        Cloudflare, donde se registran el dominio y se aloja el sitio; WhatsApp, donde ocurre la conversación; y el
        banco o la plataforma con la que usted elija pagar. Cada uno se rige además por sus propias políticas.
      </p>

      <h2 className={H2}>Cuánto tiempo los guardamos</h2>
      <p className={P}>
        Mientras sea cliente, guardamos su información y el historial de su ficha, porque con él se arman los reportes.
        Si deja de ser cliente o nunca llegó a contratar, la borramos cuando nos lo pida, salvo lo que debamos conservar
        por obligaciones contables o fiscales.
      </p>

      <h2 className={H2}>Sus derechos</h2>
      <p className={P}>
        Puede pedirnos en cualquier momento ver, corregir o borrar la información que tenemos suya. Escríbanos a{" "}
        {CORREO} o por WhatsApp.
      </p>

      <h2 className={H2}>Cambios a esta política</h2>
      <p className={P}>Si esta política cambia, publicamos la nueva versión en esta misma página, con su fecha.</p>

      <EnlaceInterno to="/" className="etiqueta mt-12 inline-flex text-gris-texto hover:text-coral">
        ← Volver
      </EnlaceInterno>
    </article>
  );
}
