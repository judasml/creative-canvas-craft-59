import { TEXTO_CTA, URL_WHATSAPP } from "@/lib/site";

export function CtaWhatsApp({
  tamano = "grande",
  tono = "claro",
  secundario = false,
  className = "",
}: {
  tamano?: "grande" | "compacto";
  tono?: "claro" | "oscuro";
  secundario?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-bold transition-transform duration-200 hover:-translate-y-0.5";
  const medida =
    tamano === "grande"
      ? "h-14 px-8 text-[17px]"
      : "h-10 px-4 text-[13px] uppercase tracking-tight";

  const estilo = secundario
    ? tono === "oscuro"
      ? "border-2 border-hueso text-hueso"
      : "border-2 border-navy text-navy"
    : "bg-coral text-navy";

  return (
    <a
      href={URL_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${medida} ${estilo} ${className}`}
    >
      {tamano === "grande" ? TEXTO_CTA : "WhatsApp"}
    </a>
  );
}
