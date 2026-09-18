import { EnlaceLetras } from "./EnlaceLetras";
import { CtaWhatsApp } from "./CtaWhatsApp";
import { useTelon } from "./Telon";
const LOGO = "/brand/logo/svg/mkweb-horizontal-color.svg";

const ENLACES = [
  { texto: "El método", href: "/#metodo" },
  { texto: "Precios", href: "/#precios" },
  { texto: "Muestras", href: "/muestras" },
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
          className="flex items-center gap-3"
          aria-label="MK Web Studio — inicio"
        >
          <img
            src={LOGO}
            alt="MK Web Studio"
            className="h-[26px] w-auto md:h-[30px]"
            width={1114}
            height={120}
          />
          <span className="etiqueta hidden text-[12px] text-gris-texto lg:inline">
            sitios web y fichas de Google
          </span>
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
