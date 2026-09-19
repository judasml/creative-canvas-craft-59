import { CORREO } from "@/lib/site";
import { URL_WHATSAPP } from "@/lib/site";
import { EnlaceInterno } from "./Telon";
const LOGO_BLANCO = "/brand/logo/svg/mkweb-horizontal-una-tinta-blanco.svg";

const enlace =
  "text-[15px] uppercase text-white transition-colors hover:text-coral";
const cabecera = "etiqueta text-[13px] text-[#7a8dad]";

export function PiePagina() {
  return (
    <footer id="contacto" className="overflow-hidden bg-navy pt-[var(--paso)]">
      <div className="contenedor mb-10">
        <img
          src={LOGO_BLANCO}
          alt="MK Web Studio"
          className="h-[34px] w-auto md:h-[42px]"
          width={1114}
          height={120}
          loading="lazy"
        />
        <p className="mt-3 text-[12px] text-[#7a8dad]">
          MK Business Solutions S. de R.L. · [Tegucigalpa], Honduras · Atendemos
          Honduras y Centroamérica
        </p>
      </div>

      <div className="contenedor grid gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className={cabecera}>Menú</p>
          <a href="/#metodo" className={enlace} style={{ fontWeight: 700 }}>
            El método
          </a>
          <a href="/#precios" className={enlace} style={{ fontWeight: 700 }}>
            Precios
          </a>
          <a href="/#muestras" className={enlace} style={{ fontWeight: 700 }}>
            Muestras
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className={cabecera}>Contacto</p>
          <a
            href={URL_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={enlace}
            style={{ fontWeight: 700 }}
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${CORREO}`}
            className={enlace}
            style={{ fontWeight: 700 }}
          >
            Email
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className={cabecera}>Legal</p>
          <EnlaceInterno to="/terminos" className={enlace} style={{ fontWeight: 700 }}>
            Términos y condiciones
          </EnlaceInterno>
          <EnlaceInterno to="/privacidad" className={enlace} style={{ fontWeight: 700 }}>
            Política de privacidad
          </EnlaceInterno>
        </div>
      </div>

      <div className="firma -mx-2" aria-hidden="true">
        MK Web Studio
      </div>
    </footer>
  );
}
