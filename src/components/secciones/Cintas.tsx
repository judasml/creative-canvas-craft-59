type Rubro = { nombre: string; tipografia: string; colores: string[] };

const FILA1: Rubro[] = [
  { nombre: "Taller mecánico", tipografia: "Saira", colores: ["#C62026", "#1C1C1C", "#F2C200"] },
  { nombre: "Restaurante", tipografia: "Playfair Display", colores: ["#2E1B12", "#C8622D", "#F4EDE2"] },
  { nombre: "Colegio", tipografia: "Poppins", colores: ["#1B4B8F", "#FFC53D", "#FFFFFF"] },
  { nombre: "Ferretería", tipografia: "Barlow Condensed", colores: ["#F26522", "#3A3A3A", "#111111"] },
  { nombre: "Clínica", tipografia: "Manrope", colores: ["#0FA3A3", "#F5FBFB", "#2A3B47"] },
];

const FILA2: Rubro[] = [
  { nombre: "Consultorio dental", tipografia: "DM Sans", colores: ["#0E7C86", "#FFFFFF", "#E6F4F5"] },
  { nombre: "Distribuidora", tipografia: "Bebas Neue", colores: ["#101010", "#C6FF33", "#5A5A5A"] },
  { nombre: "Laboratorio", tipografia: "Bitter", colores: ["#1D8A4E", "#FFFFFF", "#E8F4EC"] },
  { nombre: "Veterinaria", tipografia: "Nunito", colores: ["#3E8E7E", "#FF8B6B", "#FDF6EC"] },
  { nombre: "Salón", tipografia: "Oswald", colores: ["#141414", "#F0E6D2", "#8C3A2B"] },
];

function Ficha({ r }: { r: Rubro }) {
  return (
    <div className="flex h-[150px] w-[260px] shrink-0 flex-col justify-between rounded-[var(--radio)] border border-gris bg-white p-4">
      <p
        className="text-[15px] leading-[1.05]"
        style={{ fontFamily: "var(--display)", fontWeight: 300 }}
      >
        {r.nombre}
      </p>
      <p className="etiqueta text-[11px] text-gris-texto">{r.tipografia}</p>
      <div className="flex gap-2">
        {r.colores.map((c) => (
          <span
            key={c}
            className="size-[22px] rounded-[3px] border border-gris"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

function Pista({ rubros, inversa }: { rubros: Rubro[]; inversa?: boolean }) {
  return (
    <div className="cinta">
      <div className={`pista ${inversa ? "pista--inversa" : ""}`}>
        {[...rubros, ...rubros, ...rubros, ...rubros].map((r, i) => (
          <Ficha key={`${r.nombre}-${i}`} r={r} />
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
        Su negocio no tiene que verse como los demás de su rubro. Tiene que verse
        como el mejor de su rubro.
      </p>
    </section>
  );
}
