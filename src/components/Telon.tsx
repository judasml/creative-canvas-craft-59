import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const FILAS = 12;
const RETRASO = 45;
const DURACION = 420;

type Ctx = { navegarConTelon: (url: string, e?: React.MouseEvent) => void };

const TelonContext = createContext<Ctx>({ navegarConTelon: () => {} });

export const useTelon = () => useContext(TelonContext);

export function TelonProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [entrando, setEntrando] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const temporizadores = useRef<number[]>([]);

  useEffect(
    () => () => {
      temporizadores.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const navegarConTelon = useCallback(
    (url: string, e?: React.MouseEvent) => {
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
      e?.preventDefault();

      const reducido =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducido) {
        void navigate({ to: url });
        return;
      }

      setSaliendo(false);
      setEntrando(true);

      const total = DURACION + FILAS * RETRASO;
      temporizadores.current.push(
        window.setTimeout(() => {
          void navigate({ to: url });
          window.scrollTo(0, 0);
          setSaliendo(true);
          setEntrando(false);
          temporizadores.current.push(
            window.setTimeout(() => setSaliendo(false), total),
          );
        }, total),
      );
    },
    [navigate],
  );

  return (
    <TelonContext.Provider value={{ navegarConTelon }}>
      {children}
      <div
        className={`telon ${saliendo ? "saliendo" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: FILAS }, (_, i) => (
          <i
            key={i}
            style={{
              transform: entrando ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: `${(saliendo ? FILAS - 1 - i : i) * RETRASO}ms`,
            }}
          />
        ))}
      </div>
    </TelonContext.Provider>
  );
}

export function EnlaceInterno({
  to,
  children,
  className = "",
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navegarConTelon } = useTelon();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => navegarConTelon(to, e)}
      {...rest}
    >
      {children}
    </a>
  );
}
