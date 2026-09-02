import { EnlaceLetras } from "./EnlaceLetras";
import { CtaWhatsApp } from "./CtaWhatsApp";
import { useTelon } from "./Telon";

const ENLACES = [
  { texto: "El método", href: "/#metodo" },
  { texto: "Precios", href: "/#precios" },
  { texto: "Muestras", href: "/#muestras" },
  { texto: "Contacto", href: "/#contacto" },
];

export function Encabezado() {
  const { navegarConTelon } = useTelon();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-gris bg-hueso/95 backdrop-blur">
      <div className="contenedor flex h-full items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") return;
            navegarConTelon("/", e);
          }}
          className="text-[16px] uppercase tracking-[-0.02em] text-navy"
          style={{ fontFamily: "var(--display)", fontWeight: 800 }}
        >
          MK Web Studio
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {ENLACES.map((e) => (
            <EnlaceLetras key={e.href} texto={e.texto} href={e.href} />
          ))}
        </nav>

        <div className="md:hidden">
          <CtaWhatsApp tamano="compacto" />
        </div>
      </div>
    </header>
  );
}
