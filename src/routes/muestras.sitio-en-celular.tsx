import { createFileRoute } from "@tanstack/react-router";
import { PaginaMuestra } from "@/components/secciones/PaginaMuestra";
import img from "@/assets/muestra-celular.webp.asset.json";

const TITULO = "Cómo se ve su negocio en un celular — MK Web Studio";
const DESCRIPCION =
  "La anatomía de un sitio hecho para el celular: carga rápida, un solo botón, información clara y WhatsApp a un toque. Demostración hecha por MK Web Studio.";

export const Route = createFileRoute("/muestras/sitio-en-celular")({
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

function Pagina() {
  return (
    <PaginaMuestra
      etiqueta="Muestra · Sitio"
      titulo="Cómo se ve su negocio en un celular"
      entrada="Su cliente no va a abrir el sitio en una computadora. Lo abre con una mano, en la calle y con datos móviles. Ese es el sitio que hay que hacer bien."
      img={img.url}
      alt="Sitio de un negocio abierto en la pantalla de un celular"
      puntos={[
        {
          titulo: "Carga antes de que se aburra",
          texto:
            "Sin peso de más ni animaciones que traban el teléfono. Si tarda más de tres segundos, ya se regresó a Google.",
        },
        {
          titulo: "Una sola acción",
          texto:
            "Un botón visible que lleva a WhatsApp con el mensaje listo. Nada de formularios que nadie llena.",
        },
        {
          titulo: "Lo que buscan, arriba",
          texto:
            "Qué hace usted y que ofrece. En ese orden y sin tener que bajar tres pantallas.",
        },
        {
          titulo: "Se ve como su negocio",
          texto:
            "Sus colores, sus fotos y su tono. Diseñado para su rubro, no para cualquier negocio.",
        },
      ]}
    />
  );
}
