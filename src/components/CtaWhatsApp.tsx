import { TEXTO_CTA, URL_WHATSAPP } from "@/lib/site";

export function CtaWhatsApp({
  tamano = "grande",
  className = "",
}: {
  tamano?: "grande" | "compacto";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full bg-coral font-bold text-navy transition-transform duration-200 hover:-translate-y-0.5";
  const medida =
    tamano === "grande"
      ? "h-14 px-8 text-[17px]"
      : "h-10 px-4 text-[13px] uppercase tracking-tight";

  return (
    <a
      href={URL_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${medida} ${className}`}
    >
      {tamano === "grande" ? TEXTO_CTA : "Diagnóstico"}
    </a>
  );
}
