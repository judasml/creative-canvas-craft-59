import { createFileRoute } from "@tanstack/react-router";
import { PaginaMuestra } from "@/components/secciones/PaginaMuestra";
import img from "@/assets/muestra-ficha.jpg";

const TITULO = "Cómo se ve una ficha de Google bien hecha — MK Web Studio";
const DESCRIPCION =
  "La anatomía de una ficha de Google completa: fotos, horarios, servicios, reseñas respondidas y datos correctos. Demostración hecha por MK Web Studio.";

export const Route = createFileRoute("/muestras/ficha-de-google")({
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
      etiqueta="Muestra · Ficha"
      titulo="Cómo se ve una ficha de Google bien hecha"
      entrada="Esto es lo que un cliente ve antes de decidir si le llama. Una ficha completa contesta las preguntas sin que nadie tenga que escribir: dónde está, si está abierto, cómo se ve por dentro y qué dicen los que ya fueron."
      img={img}
      alt="Ficha de Google completa con fotos, horarios, reseñas y mapa"
      puntos={[
        {
          titulo: "Los datos exactos",
          texto:
            "Nombre igual al del rótulo, categoría correcta, dirección que sí abre en el mapa, teléfono que suena y horarios con los feriados puestos.",
        },
        {
          titulo: "Fotos que no son de relleno",
          texto:
            "Fachada, interior, producto y equipo. La foto de fachada es la que hace que el cliente reconozca el local cuando llegue.",
        },
        {
          titulo: "Reseñas respondidas",
          texto:
            "Todas, buenas y malas. Una reseña respondida vale más que una reseña sola, porque muestra que hay alguien atendiendo.",
        },
        {
          titulo: "Servicios y publicaciones",
          texto:
            "La lista de lo que usted vende, escrita como la busca la gente, y publicaciones al día para que la ficha no se vea abandonada.",
        },
      ]}
    />
  );
}
