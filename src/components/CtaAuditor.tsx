import { TEXTO_AUDITOR, URL_AUDITOR } from "@/lib/site";

export function CtaAuditor({
  tamano = "grande",
  className = "",
}: {
  tamano?: "grande" | "compacto";
  tono?: "claro" | "oscuro";
  className?: string;
}) {
  // El diagnóstico es la primera acción del sitio: botón principal.
  const base =
    "inline-flex items-center justify-center rounded-full bg-coral font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5";
  const medida =
    tamano === "grande"
      ? "h-14 px-8 text-[17px]"
      : "h-10 px-4 text-[13px] uppercase tracking-tight";

  return (
    <a
      href={URL_AUDITOR || "#diagnostico"}
      target={URL_AUDITOR ? "_blank" : undefined}
      rel={URL_AUDITOR ? "noreferrer" : undefined}
      className={`${base} ${medida} ${className}`}
    >
      {tamano === "grande" ? TEXTO_AUDITOR : "Auditar"}
    </a>
  );
}
