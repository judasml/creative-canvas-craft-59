import { createFileRoute } from "@tanstack/react-router";
import { PaginaMuestra } from "@/components/secciones/PaginaMuestra";
import img from "@/assets/muestra-antes-despues.jpg";

const TITULO = "La misma ficha, antes y después — MK Web Studio";
const DESCRIPCION =
  "Comparación lado a lado de una presencia descuidada y una ordenada: datos, fotos, reseñas y sitio. Demostración hecha por MK Web Studio.";

export const Route = createFileRoute("/muestras/antes-y-despues")({
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
      etiqueta="Muestra · Antes / Después"
      titulo="La misma ficha, antes y después"
      entrada="El negocio es el mismo. Lo que cambia es lo que encuentra el cliente. A la izquierda, lo que hay cuando nadie la atiende; a la derecha, lo que hay cuando sí."
      img={img}
      alt="Comparación lado a lado de una ficha desordenada y la misma ficha ordenada"
      puntos={[
        {
          titulo: "Antes: información incompleta",
          texto:
            "Horario viejo, sin fotos, categoría equivocada y reseñas sin responder. El cliente asume que está cerrado.",
        },
        {
          titulo: "Después: todo contestado",
          texto:
            "Datos correctos, fotos propias, servicios listados y reseñas atendidas. El cliente ya no tiene que preguntar nada.",
        },
        {
          titulo: "Antes: sin a dónde llegar",
          texto:
            "La ficha manda a una red social abandonada o a nada. La visita se pierde ahí.",
        },
        {
          titulo: "Después: un sitio que cierra",
          texto:
            "La ficha manda a un sitio propio, rápido y con WhatsApp visible. Ese es el camino completo.",
        },
      ]}
    />
  );
}
