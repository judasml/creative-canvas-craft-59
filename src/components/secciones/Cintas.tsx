type Rubro = { nombre: string; tipografia: string; colores: string[]; miniatura: string };

const PREVIEWS = "/plantillas/catalogo-variantes/previews/";

const FILA1: Rubro[] = [
  { nombre: "Taller mecánico", tipografia: "Arial", colores: ["#fd6234", "#101112", "#f4f4eb"], miniatura: "taller-a.webp" },
  { nombre: "Restaurante", tipografia: "Georgia", colores: ["#eab67e", "#1e211a", "#f7eedb"], miniatura: "restaurante-a.webp" },
  { nombre: "Colegio", tipografia: "Georgia", colores: ["#2d6754", "#233b32", "#f1eee4"], miniatura: "colegio-a.webp" },
  { nombre: "Ferretería", tipografia: "Georgia", colores: ["#e8bb36", "#161a18", "#f4f0e5"], miniatura: "ferreteria-a.webp" },
  { nombre: "Clínica", tipografia: "Georgia", colores: ["#326b64", "#173c3a", "#f2f5f2"], miniatura: "medico-a.webp" },
];

const FILA2: Rubro[] = [
  { nombre: "Consultorio dental", tipografia: "Georgia", colores: ["#55764d", "#293e34", "#f4f1e9"], miniatura: "consultorio-a.webp" },
  { nombre: "Distribuidora", tipografia: "Georgia", colores: ["#3876f2", "#1f2520", "#f5efe2"], miniatura: "ferreteria-c.webp" },
  { nombre: "Laboratorio", tipografia: "Georgia", colores: ["#2a7d86", "#173a44", "#edf6f6"], miniatura: "laboratorio-a.webp" },
  { nombre: "Veterinaria", tipografia: "Georgia", colores: ["#687d31", "#393c28", "#fcf5e9"], miniatura: "veterinaria-a.webp" },
  { nombre: "Salón", tipografia: "Georgia", colores: ["#83563e", "#3d302a", "#f1eadf"], miniatura: "salon-a.webp" },
];

function Ficha({ r, oscura }: { r: Rubro; oscura?: boolean }) {
  return (
    <div
      className={`flex h-[300px] w-[460px] shrink-0 flex-col justify-between rounded-[var(--radio)] border p-6 md:h-[340px] md:w-[500px] ${
        oscura ? "border-navy bg-navy" : "border-gris bg-white"
      }`}
    >
      <img
        src={`${PREVIEWS}${r.miniatura}`}
        alt={`Vista previa de sitio para ${r.nombre.toLowerCase()}`}
        className="h-[176px] w-full rounded-[4px] border border-gris/40 object-cover object-top md:h-[206px]"
        loading="lazy"
      />
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`rotulo text-[30px] md:text-[34px] ${oscura ? "text-white" : "text-navy"}`}
          >
            {r.nombre}
          </p>
          <p
            className={`etiqueta mt-2 text-[12px] ${oscura ? "text-white/60" : "text-gris-texto"}`}
          >
            {r.tipografia}
          </p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {r.colores.map((c) => (
            <span
              key={c}
              className="size-[26px] rounded-[4px] border border-gris/50"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Pista({ rubros, inversa }: { rubros: Rubro[]; inversa?: boolean }) {
  return (
    <div className="cinta">
      <div className={`pista ${inversa ? "pista--inversa" : ""}`}>
        {[...rubros, ...rubros, ...rubros, ...rubros].map((r, i) => (
          <Ficha key={`${r.nombre}-${i}`} r={r} oscura={i % 2 === (inversa ? 1 : 0)} />
        ))}
      </div>
    </div>
  );
}

export function Cintas() {
  return (
    <section className="cuadricula overflow-x-hidden py-[var(--paso)]">
      <p className="etiqueta contenedor mb-10 text-center text-gris-texto">
        Cada rubro necesita verse distinto. Esto es lo que le recomendamos a cada
        uno.
      </p>

      <div className="flex flex-col gap-4">
        <Pista rubros={FILA1} />
        <Pista rubros={FILA2} inversa />
      </div>

      <p className="mx-auto mt-10 max-w-[54ch] px-[var(--borde)] text-center">
        {`"En un mercado saturado, encajar es fracasar." —Seth Godin. Su negocio no tiene que verse como todos los demás. Tiene que verse como suyo.`}
      </p>
    </section>
  );
}
