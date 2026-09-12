import { TEXTO_AUDITOR, URL_AUDITOR } from "@/lib/site";

export function CtaAuditor({
  tamano = "grande",
  tono = "claro",
  className = "",
}: {
  tamano?: "grande" | "compacto";
  tono?: "claro" | "oscuro";
  className?: string;
}) {
  if (!URL_AUDITOR) return null;

  // El diagnóstico es la primera acción del sitio: botón principal.
  const base =
    "inline-flex items-center justify-center rounded-full bg-coral font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5";
  const medida =
    tamano === "grande"
      ? "h-14 px-8 text-[17px]"
      : "h-10 px-4 text-[13px] uppercase tracking-tight";
  const nota = tono === "oscuro" ? "text-white/60" : "text-gris-texto";

  return (
    <>
      <a
        href={URL_AUDITOR}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${medida} ${className}`}
      >
        {tamano === "grande" ? TEXTO_AUDITOR : "Auditar"}
      </a>
      <p className={`etiqueta mt-3 text-[13px] ${nota}`}>
        Sin dejar sus datos. Se hace en un minuto.
      </p>
    </>
  );
}
