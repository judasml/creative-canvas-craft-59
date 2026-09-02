const TARJETAS = [
  {
    n: "01",
    titulo: "La ficha de Google",
    cuerpo:
      "Es lo primero que ve un cliente, y casi siempre es lo único que ve. Si su horario está mal o no hay fotos, ya perdió la visita — y ni se enteró. Aquí es donde arranca todo, porque es lo más barato de arreglar y lo que más rápido se nota.",
    clase: "bg-navy text-white",
    top: "6vh",
  },
  {
    n: "02",
    titulo: "El sitio",
    cuerpo:
      "La ficha lo hace aparecer. El sitio es donde deciden si le escriben o siguen buscando. Sin sitio propio, su negocio se ve igual que los otros ocho de la lista. Hecho para el celular, porque ahí es donde lo van a abrir.",
    clase: "bg-coral text-navy",
    top: "9vh",
  },
  {
    n: "03",
    titulo: "El servicio mensual",
    cuerpo:
      "Una ficha se desactualiza sola: cambian los horarios, entran reseñas, Google mueve cosas. Un sitio sin mantenimiento se cae, se vence el dominio o deja de ser seguro. Esto es lo que hace que el trabajo del primer mes siga sirviendo en el mes veinte.",
    clase: "bg-hueso text-navy border border-gris",
    top: "12vh",
  },
  {
    n: "04",
    titulo: "Identidad y publicaciones",
    cuerpo:
      "Cuando su ficha y su sitio ya están firmes, el siguiente paso es que todo lo que publique se vea del mismo negocio: colores, tipografía y plantillas propias. Todavía no lo vendemos. Se lo decimos ahora para que sepa hacia dónde va esto.",
    clase: "bg-navy text-white",
    top: "15vh",
    proximamente: true,
  },
];

export function TarjetasApiladas() {
  return (
    <section id="metodo" className="py-[var(--paso)]">
      <div className="contenedor">
        <p className="etiqueta flex items-center gap-3 text-gris-texto">
          <span className="inline-block size-[11px] bg-coral" aria-hidden="true" />
          Por qué estas cuatro cosas y en este orden
        </p>
      </div>

      <div className="contenedor mt-12">
        {TARJETAS.map((t) => (
          <div
            key={t.n}
            className={`sticky mx-auto mb-6 flex h-[85vh] w-[92%] flex-col justify-between rounded-2xl p-8 shadow-[0_-8px_30px_-12px_rgba(0,0,0,.35)] md:p-14 ${t.clase}`}
            style={{ top: t.top }}
          >
            <div className="flex items-center justify-between">
              <span className="etiqueta opacity-70">{t.n}</span>
              {t.proximamente && (
                <span className="etiqueta text-[12px] text-lima">
                  Próximamente
                </span>
              )}
            </div>
            <div>
              <h3 className="editorial text-[clamp(34px,6vw,44px)]">
                {t.titulo}
              </h3>
              <p className="parrafo mt-6 text-[18px] opacity-90">{t.cuerpo}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[40vh]" aria-hidden="true" />
    </section>
  );
}
