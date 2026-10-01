import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { EnlaceLetras } from "./EnlaceLetras";
import { Button } from "./ui/button";
import { useTelon } from "./Telon";
const LOGO = "/brand/logo/svg/mkws-logo-horizontal-positivo.svg";

const ENLACES = [
  { texto: "El método", href: "/#metodo" },
  { texto: "Precios", href: "/#precios" },
  { texto: "Muestras", href: "/#muestras" },
  { texto: "Contacto", href: "/#diagnostico" },
];

export function Encabezado() {
  const { navegarConTelon } = useTelon();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const encabezadoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuAbierto) return;
    const cerrarFuera = (e: PointerEvent) => {
      if (!encabezadoRef.current?.contains(e.target as Node)) setMenuAbierto(false);
    };
    const cerrarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    document.addEventListener("pointerdown", cerrarFuera);
    document.addEventListener("keydown", cerrarEscape);
    return () => {
      document.removeEventListener("pointerdown", cerrarFuera);
      document.removeEventListener("keydown", cerrarEscape);
    };
  }, [menuAbierto]);

  return (
    <header ref={encabezadoRef} className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-gris bg-hueso/95 backdrop-blur">
      <div className="contenedor grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <a
          href="/"
          onClick={(e) => {
            setMenuAbierto(false);
            if (window.location.pathname === "/") return;
            navegarConTelon("/", e);
          }}
          className="flex min-w-0 items-center gap-3"
          aria-label="MK Web Studio — inicio"
        >
          <img
            src={LOGO}
            alt="MK Web Studio"
            className="h-[40px] w-auto"
            width={560}
            height={162}
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {ENLACES.map((e) => (
            <EnlaceLetras key={e.href} texto={e.texto} href={e.href} />
          ))}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0 text-navy hover:bg-gris/50 hover:text-navy lg:hidden"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          {menuAbierto ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </Button>
      </div>
      {menuAbierto && (
        <nav id="menu-movil" aria-label="Menú principal" className="absolute inset-x-0 top-full border-b border-gris bg-hueso px-[var(--borde)] py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className="border-b border-gris py-4 text-[22px] font-bold leading-tight text-navy last:border-0 hover:text-coral"
              >
                {enlace.texto}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
