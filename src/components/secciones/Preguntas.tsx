import { useState } from "react";

const PREGUNTAS = [
  {
    p: "Nunca he tenido ficha ni sitio y no entiendo de esto.",
    r: "No necesita entender. Usted nos manda por WhatsApp los datos de su negocio, textos y fotos. Nosotros hacemos todo lo demás y le entregamos los accesos por escrito.",
  },
  {
    p: "Ya me pasó que un proveedor se quedó con mi dominio.",
    r: "Aquí el dominio y el sitio están a su nombre desde el primer día. Si un día se va, se los lleva. Lo único que se detiene es el servicio.",
  },
  {
    p: "Ya tengo Facebook. ¿Para qué necesito esto?",
    r: "Facebook no aparece en el mapa cuando alguien busca \u201Ctaller cerca de mí\u201D. La ficha de Google sí, con dirección, horario y teléfono.",
  },
  {
    p: "Mi sobrino me la puede hacer.",
    r: "Sí. La pregunta es quién le cambia el horario el 24 de diciembre y quién contesta cuando el sitio deja de cargar. Nosotros, en 48 horas.",
  },
  {
    p: "Me ofrecieron pago único, sin mensualidad.",
    r: "Pago único quiere decir que después nadie lo mantiene. En dos años el hosting vence, las fotos son viejas y la ficha tiene el horario equivocado. Por eso cobramos mensual, y por eso puede cancelarlo cuando quiera.",
  },
  {
    p: "¿Cuánto tarda?",
    r: "El sitio se publica entre 3 y 5 días hábiles después de que nos manda los textos y las fotos. Esa es la única parte que depende de usted.",
  },
];

export function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <section id="preguntas" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Lo que nos preguntan antes de arrancar
        </p>

        <div className="mt-12 border-t border-gris">
          {PREGUNTAS.map((item, i) => {
            const activa = abierta === i;
            return (
              <div key={item.p} className="border-b border-gris">
                <h3>
                  <button
                    type="button"
                    aria-expanded={activa}
                    aria-controls={`pregunta-${i}`}
                    onClick={() => setAbierta(activa ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="editorial text-[clamp(20px,3vw,26px)]">
                      {item.p}
                    </span>
                    <span
                      className="etiqueta shrink-0 pt-2 text-coral"
                      aria-hidden="true"
                    >
                      {activa ? "—" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`pregunta-${i}`} hidden={!activa}>
                  <p className="parrafo max-w-[62ch] pb-8 text-gris-texto">
                    {item.r}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
