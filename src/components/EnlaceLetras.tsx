export function EnlaceLetras({
  texto,
  href,
  onClick,
}: {
  texto: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      aria-label={texto}
      onClick={onClick}
      className="enlace text-[17px] font-bold leading-none"
    >
      <span aria-hidden="true" className="inline-flex">
        {texto.split("").map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="l"
            style={{ transitionDelay: `${i * 22}ms` }}
          >
            <b>{c === " " ? "\u00A0" : c}</b>
            <b>{c === " " ? "\u00A0" : c}</b>
          </span>
        ))}
      </span>
    </a>
  );
}
