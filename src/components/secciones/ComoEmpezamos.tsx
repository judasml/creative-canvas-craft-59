/*
 * Sección "Cómo empezamos": tres pasos, en el mismo estilo de tarjetas de Precios.
 * Sin animaciones. Los textos reflejan el modelo vigente: pago en dos mitades,
 * publicación en 3 a 5 días hábiles desde que llegan los textos y las fotos aprobados.
 */
const PASOS = [
  {
    n: "01",
    titulo: "Usted ve su diagnóstico",
    texto: "Escriba el nombre de su negocio y vea cómo aparece al lado de su competencia.",
  },
  {
    n: "02",
    titulo: "Nos reunimos",
    texto:
      "Conversamos por WhatsApp y nos manda los textos y las fotos de su negocio. Paga la mitad para arrancar.",
  },
  {
    n: "03",
    titulo: "Publicamos",
    texto:
      "En 3 a 5 días hábiles desde que recibimos los textos y las fotos aprobados. Le entregamos todos los accesos por escrito y paga la otra mitad al publicar.",
  },
];

export function ComoEmpezamos() {
  return (
    <section id="como-empezamos" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Cómo empezamos
        </p>
        <h2 className="editorial mt-6 text-[clamp(34px,6vw,64px)]">
          Tres pasos. El trabajo pesado es nuestro.
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PASOS.map((p) => (
            <article
              key={p.n}
              className="relative flex flex-col rounded-[28px] border-2 border-navy bg-white px-6 pb-8 pt-8 shadow-[8px_8px_0_#0A2378] md:px-8"
            >
              <p className="etiqueta text-gris-texto">{p.n}</p>
              <h3 className="mt-3 text-[26px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[30px]">
                {p.titulo}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.55] md:text-[17px]">{p.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
