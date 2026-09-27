import { useEffect, useRef } from "react";
import { reproducirEnPosicion } from "@/lib/reproducirEnPosicion";

/**
 * Animación de búsqueda local (loop de 15 s) para la tarjeta 01 "La ficha de Google".
 * Escena lógica de 320×220 px que se escala para llenar el espacio disponible.
 * Arranca desde cero cuando la tarjeta queda en posición y visible (ver reproducirEnPosicion).
 */

const D = 15000;
const Q = "taller mecánico cerca de mí";
const W = 320;
const H = 220;
const MAX_ESCALA = 2.2;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const p = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out = (x: number) => 1 - Math.pow(1 - x, 3);
const back = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const win = (t: number, a: number, b: number, f = 300) => Math.min(p(t, a, a + f), 1 - p(t, b - f, b));

const C = {
  navy: "#0A2378",
  navyOscuro: "#011A40",
  navySuave: "#394C6A",
  coral: "#FD5C41",
  hueso: "#F6F7F8",
  gris: "#DEE1E6",
  grisTexto: "#627189",
  lima: "#AFDE00",
  piel: "#E3AC86",
};

const PINES: [number, number][] = [
  [44, 26],
  [170, 22],
  [130, 48],
  [22, 50],
  [206, 42],
];

const CSS = `
.mkab{position:relative;width:100%;min-height:0;overflow:hidden}
.mkab-escena{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;font-family:inherit;pointer-events:none}
.mkab-n,.mkab-s,.mkab-h{opacity:0;transition:opacity .18s ease}
.mkab-escena[data-mood="n"] .mkab-n,.mkab-escena[data-mood="s"] .mkab-s,.mkab-escena[data-mood="h"] .mkab-h{opacity:1}
.mkab-card{position:absolute;left:0;width:230px;height:88px;padding:8px 10px;border-radius:12px;background:#fff;border:1px solid ${C.gris};box-sizing:border-box}
.mkab-nom{font-size:12.5px;font-weight:800;letter-spacing:-.01em;color:${C.navyOscuro};line-height:1.2}
.mkab-lin{display:flex;align-items:center;gap:4px;margin-top:2px;font-size:10px;line-height:1.3;color:${C.navySuave}}
.mkab-est{font-size:10px;letter-spacing:.5px;-webkit-background-clip:text;background-clip:text;color:transparent}
.mkab-acc{display:flex;gap:5px;margin-top:6px;overflow:hidden}
.mkab-btn{position:relative;flex:none;display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;border-radius:10px;border:1px solid #C9CFD9;background:#fff;color:${C.navy};font-size:9.5px;font-weight:700;white-space:nowrap}
.mkab-btn.prim{background:${C.navy};border-color:${C.navy};color:#fff}
.mkab-btn.vacio{color:#98A0AE;border-style:dashed}
.mkab-thumb{position:absolute;right:10px;top:9px;width:40px;height:40px;border-radius:9px;display:grid;place-items:center;text-align:center}
.mkab-tag{position:absolute;left:236px;padding:3px 8px 4px;border-radius:6px;font-size:10.5px;font-weight:700;line-height:1.2;color:${C.navyOscuro};white-space:nowrap;opacity:0;box-shadow:2px 3px 0 rgba(1,26,64,.35)}
.mkab-tap{position:absolute;left:50%;top:50%;width:26px;height:26px;border-radius:50%;background:rgba(10,35,120,.25);border:1.5px solid #fff;opacity:0;transform:translate(-50%,-50%)}
`;

const IconoLlegar = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
    <path d="M3 11l18-8-8 18-2-8z" />
  </svg>
);
const IconoLlamar = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);
const Estrellas = ({ pct }: { pct: number }) => (
  <span
    className="mkab-est"
    style={{ backgroundImage: `linear-gradient(90deg, ${C.coral} ${pct}%, ${C.gris} ${pct}%)` }}
  >
    ★★★★★
  </span>
);
const Punto = ({ color }: { color: string }) => (
  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 3, background: color }} />
);

export function AnimacionBusquedaLocal({ className = "" }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const escena = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = caja.current;
    const st = escena.current;
    if (!box || !st) return;

    const $ = (k: string) => st.querySelector(`[data-k="${k}"]`) as HTMLElement;
    const $$ = (k: string) => Array.from(st.querySelectorAll(`[data-k="${k}"]`)) as HTMLElement[];

    const fade = $("fade");
    const field = $("field");
    const typed = $("typed");
    const ph = $("ph");
    const caret = $("caret");
    const go = $("go");
    const loader = $("loader");
    const map = $("map");
    const pins = $$("pin");
    const me = $("me");
    const list = $("list");
    const cards = $$("card");
    const tagsBad = $$("tb");
    const tagsGood = $$("tg");
    const head = $("head");
    const callBtn = $("call");
    const toast = $("toast");
    const sp = $("sp");
    const qm = $("qm");
    const taps: [HTMLElement, number][] = [
      [$("tapField"), 800],
      [$("tapGo"), 3150],
      [$("tapCall"), 11200],
    ];

    const fit = () => {
      const cw = box.clientWidth;
      const ch = box.clientHeight;
      if (!cw || !ch) return;
      const s = Math.min(cw / W, ch / H, MAX_ESCALA);
      st.style.transform = `scale(${s})`;
      st.style.top = `${Math.max(0, (ch - H * s) / 2)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    let mood = "";
    const setBtn = (el: HTMLElement, k: number) => (el.style.transform = `scale(${1 - k})`);

    const render = (t: number) => {
      fade.style.opacity = String(t < 450 ? 1 - p(t, 0, 450) : t > 14450 ? p(t, 14450, 15000) : 0);

      // emoción
      const m = t < 5500 ? "n" : t < 9700 ? "s" : "h";
      if (m !== mood) {
        st.setAttribute("data-mood", m);
        mood = m;
      }
      const hop = m === "h" ? -Math.abs(Math.sin((t - 9700) / 170)) * 5 * (1 - p(t, 9700, 10900)) : 0;
      const tilt = Math.sin(t / 650) * 2 + (m === "s" ? -5 : 0);
      head.setAttribute("transform", `translate(0 ${hop + (m === "s" ? 2 : 0)}) rotate(${tilt} 50 70)`);
      sp.setAttribute("transform", `rotate(${(t / 18) % 360} 12 12)`);
      qm.style.transform = `translateY(${Math.sin(t / 300) * 2}px)`;

      // escritura
      const n = Math.round(p(t, 1200, 3000) * Q.length);
      typed.textContent = Q.slice(0, n);
      ph.style.display = n > 0 ? "none" : "";
      const focused = t > 950 && t < 3400;
      field.style.borderColor = focused ? C.coral : C.gris;
      const typing = n > 0 && n < Q.length;
      caret.style.opacity = String(focused ? (typing ? 1 : Math.floor(t / 420) % 2 ? 0 : 1) : 0);
      go.style.background = n >= Q.length ? C.navy : "#C9CFD9";
      setBtn(go, 0.14 * win(t, 3150, 3400, 120));

      for (const [el, a] of taps) {
        const q = p(t, a, a + 500);
        el.style.opacity = String(q > 0 && q < 1 ? 1 - q : 0);
        el.style.transform = `translate(-50%,-50%) scale(${0.5 + out(q) * 0.9})`;
      }

      const l = p(t, 3300, 3800);
      loader.style.width = `${out(l) * 100}%`;
      loader.style.opacity = String(t < 3800 ? (l > 0 ? 1 : 0) : 1 - p(t, 3800, 4000));

      // mapa
      const mp = out(p(t, 3650, 4150));
      map.style.opacity = String(mp);
      map.style.transform = `translateY(${(1 - mp) * 8}px)`;
      const fb = win(t, 5000, 8400);
      const fg = win(t, 9400, 13200);
      pins.forEach((pin, j) => {
        const pq = p(t, 3850 + j * 100, 4250 + j * 100);
        let s = 1;
        if (j === 0) s += 0.45 * fb;
        if (j === 2) s += 0.45 * fg;
        pin.style.opacity = String(Math.min(1, pq * 3));
        pin.style.transform = `translateY(${-(1 - back(pq)) * 16}px) scale(${s})`;
        pin.style.color = j === 0 && fb > 0.5 ? C.coral : j === 2 && fg > 0.5 ? C.navy : pin.dataset["c"] || "";
      });
      const pulse = (t % 1600) / 1600;
      me.style.boxShadow = `0 0 0 ${pulse * 9}px rgba(10,35,120,${0.3 * (1 - pulse)})`;

      // resultados
      const lp = out(p(t, 4150, 4600));
      list.style.opacity = String(lp);
      list.style.transform = `translateY(${(1 - lp) * 14 - ease(p(t, 8500, 9400)) * 188}px)`;
      if (cards[0]) cards[0].style.boxShadow = `0 0 0 ${2 * fb}px rgba(253,92,65,${fb})`;
      if (cards[2]) cards[2].style.boxShadow = `0 0 0 ${2 * fg}px rgba(10,35,120,${fg})`;

      const etiquetas = (arr: HTMLElement[], a: number, b: number) =>
        arr.forEach((el, i) => {
          const s = a + i * 360;
          el.style.opacity = String(win(t, s, b, 260));
          el.style.transform = `translateX(${(1 - back(p(t, s, s + 420))) * -10}px) rotate(${i % 2 ? 2 : -2}deg)`;
        });
      etiquetas(tagsBad, 5300, 8400);
      etiquetas(tagsGood, 9700, 13300);

      setBtn(callBtn, 0.08 * win(t, 11200, 11450, 120));
      toast.style.opacity = String(win(t, 11500, 13900, 280));
      toast.style.transform = `translateX(-50%) translateY(${(1 - out(p(t, 11500, 11850))) * 8}px)`;
    };

    const detener = reproducirEnPosicion(box, render, D, 12400);

    return () => {
      detener();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={caja}
      className={`mkab ${className}`}
      role="img"
      aria-label="Animación: una persona busca un taller mecánico cerca. La primera ficha no tiene horario, fotos ni teléfono; la ficha bien administrada muestra horario, fotos y reseñas, y la persona decide llamar."
    >
      <style>{CSS}</style>
      <div ref={escena} className="mkab-escena" data-mood="n" aria-hidden="true">
        {/* Panel de búsqueda */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 250,
            height: 220,
            borderRadius: 16,
            background: C.hueso,
            overflow: "hidden",
            boxShadow: "0 18px 40px -18px rgba(1,26,64,.8)",
          }}
        >
          {/* barra de búsqueda */}
          <div
            data-k="field"
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              width: 218,
              height: 30,
              borderRadius: 15,
              background: "#fff",
              border: `1.5px solid ${C.gris}`,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 4px 0 10px",
              boxSizing: "border-box",
              transition: "border-color .2s",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.grisTexto} strokeWidth="2.6" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.6-3.6" />
            </svg>
            <div style={{ flex: 1, display: "flex", alignItems: "center", fontSize: 11, fontWeight: 500, color: C.navyOscuro, whiteSpace: "nowrap", overflow: "hidden" }}>
              <span data-k="ph" style={{ color: "#8A93A4" }}>
                Buscar lugares cercanos
              </span>
              <span data-k="typed" />
              <span data-k="caret" style={{ display: "inline-block", width: 1.5, height: 13, marginLeft: 1, background: C.coral }} />
            </div>
            <div data-k="go" style={{ position: "relative", width: 22, height: 22, borderRadius: 11, display: "grid", placeItems: "center", background: "#C9CFD9", flex: "none" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <span className="mkab-tap" data-k="tapGo" />
            </div>
            <span className="mkab-tap" data-k="tapField" />
          </div>
          <div data-k="loader" style={{ position: "absolute", left: 10, top: 42, height: 2, width: 0, maxWidth: 218, background: C.coral, borderRadius: 1 }} />

          {/* mapa */}
          <div data-k="map" style={{ position: "absolute", left: 10, top: 48, width: 230, height: 56, borderRadius: 10, overflow: "hidden", opacity: 0 }}>
            <svg width="230" height="56" viewBox="0 0 230 56">
              <rect width="230" height="56" fill="#E6EAF1" />
              <rect x="150" y="30" width="54" height="22" rx="7" fill="#E4EFC4" />
              <path d="M0 14 L230 34" stroke="#fff" strokeWidth="4" />
              <path d="M86 0 L100 56" stroke="#fff" strokeWidth="5" />
              <path d="M180 0 L196 56" stroke="#fff" strokeWidth="4" />
              <path d="M0 44 C50 40 80 18 130 24 S200 10 230 8" stroke="#fff" strokeWidth="8" fill="none" />
              <path d="M0 44 C50 40 80 18 130 24 S200 10 230 8" stroke="#FCD6CD" strokeWidth="4" fill="none" />
            </svg>
            <span
              data-k="me"
              style={{ position: "absolute", left: 108, top: 36, width: 9, height: 9, margin: "-4.5px 0 0 -4.5px", borderRadius: "50%", background: C.navy, border: "2px solid #fff" }}
            />
            {PINES.map(([x, y], i) => (
              <div
                key={i}
                data-k="pin"
                data-c={i < 3 ? C.navySuave : "#9AA3B3"}
                style={{ position: "absolute", left: x - 6, top: y - 16, width: 12, height: 16, opacity: 0, color: i < 3 ? C.navySuave : "#9AA3B3", transformOrigin: "50% 100%" }}
              >
                <svg width="12" height="16" viewBox="0 0 24 32" style={{ display: "block" }}>
                  <path d="M12 31s10-11 10-19A10 10 0 0 0 2 12c0 8 10 19 10 19z" fill="currentColor" stroke="#fff" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="4" fill="#fff" />
                </svg>
              </div>
            ))}
          </div>

          {/* resultados */}
          <div style={{ position: "absolute", left: 10, top: 112, width: 230, height: 100, overflow: "hidden", borderRadius: 12 }}>
            <div data-k="list" style={{ position: "relative", opacity: 0 }}>
              {/* ficha descuidada */}
              <div className="mkab-card" data-k="card" style={{ top: 0 }}>
                <div className="mkab-nom">Taller Central</div>
                <div className="mkab-lin">
                  <b>2.1</b>
                  <Estrellas pct={42} />
                  <span>(3)</span>
                </div>
                <div className="mkab-lin" style={{ color: C.grisTexto }}>
                  Horario no disponible
                </div>
                <div className="mkab-thumb" style={{ background: "#EDEFF3", color: "#98A0AE", fontSize: 7.5, fontWeight: 700, lineHeight: 1.1 }}>
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3AAB7" strokeWidth="2.2" strokeLinecap="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 3l18 18" />
                    </svg>
                    <br />
                    Sin fotos
                  </div>
                </div>
                <div className="mkab-acc">
                  <span className="mkab-btn">
                    <IconoLlegar />
                    Cómo llegar
                  </span>
                  <span className="mkab-btn vacio">Sin teléfono</span>
                </div>
              </div>

              {/* ficha intermedia */}
              <div className="mkab-card" data-k="card" style={{ top: 94 }}>
                <div className="mkab-nom">Auto Servicio Norte</div>
                <div className="mkab-lin">
                  <b>3.9</b>
                  <Estrellas pct={78} />
                  <span>(18)</span>
                </div>
                <div className="mkab-lin">
                  <Punto color={C.coral} />
                  Cerrado · abre a las 8:00 a. m.
                </div>
                <div className="mkab-acc">
                  <span className="mkab-btn">
                    <IconoLlegar />
                    Cómo llegar
                  </span>
                  <span className="mkab-btn">
                    <IconoLlamar />
                    Llamar
                  </span>
                </div>
              </div>

              {/* ficha bien administrada */}
              <div className="mkab-card" data-k="card" style={{ top: 188 }}>
                <div className="mkab-nom">Mecánica Express</div>
                <div className="mkab-lin">
                  <b>4.8</b>
                  <Estrellas pct={96} />
                  <span>(212)</span>
                </div>
                <div className="mkab-lin" style={{ color: C.navyOscuro, fontWeight: 700 }}>
                  <Punto color={C.lima} />
                  Abierto · cierra 6:00 p. m.
                </div>
                <div className="mkab-thumb" style={{ background: C.coral }}>
                  <svg width="30" height="20" viewBox="0 0 60 40">
                    <rect x="4" y="31" width="52" height="4" rx="2" fill={C.navyOscuro} />
                    <path d="M10 27 L14 17 Q16 13 22 13 H38 Q44 13 47 17 L52 27 Z" fill="#fff" />
                    <rect x="19" y="16" width="9" height="6" rx="1.5" fill={C.navy} />
                    <rect x="31" y="16" width="10" height="6" rx="1.5" fill={C.navy} />
                    <circle cx="18" cy="28" r="4.5" fill={C.navyOscuro} />
                    <circle cx="43" cy="28" r="4.5" fill={C.navyOscuro} />
                  </svg>
                </div>
                <div className="mkab-acc">
                  <span className="mkab-btn prim" data-k="call">
                    <IconoLlamar />
                    Llamar
                    <span className="mkab-tap" data-k="tapCall" />
                  </span>
                  <span className="mkab-btn">
                    <IconoLlegar />
                    Cómo llegar
                  </span>
                  <span className="mkab-btn">Sitio web</span>
                </div>
              </div>
            </div>
          </div>

          {/* aviso de llamada */}
          <div
            data-k="toast"
            style={{
              position: "absolute",
              left: "50%",
              bottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 10px",
              borderRadius: 12,
              background: C.navyOscuro,
              color: "#fff",
              fontSize: 9.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
              opacity: 0,
            }}
          >
            <span style={{ color: C.lima, display: "inline-flex" }}>
              <IconoLlamar />
            </span>
            Llamando a Mecánica Express…
          </div>
        </div>

        {/* etiquetas */}
        {["sin horario", "sin fotos", "sin teléfono"].map((txt, i) => (
          <span key={txt} className="mkab-tag" data-k="tb" style={{ top: 118 + i * 26, background: C.coral }}>
            {txt}
          </span>
        ))}
        {["abierto ahora", "con fotos", "212 reseñas"].map((txt, i) => (
          <span key={txt} className="mkab-tag" data-k="tg" style={{ top: 118 + i * 26, background: C.lima }}>
            {txt}
          </span>
        ))}

        {/* persona */}
        <svg width="74" height="74" viewBox="0 0 100 100" style={{ position: "absolute", left: 240, top: 6, overflow: "visible" }}>
          <defs>
            <clipPath id="mkab-clip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="48" fill={C.navySuave} stroke={C.lima} strokeWidth="3" />
          <g clipPath="url(#mkab-clip)">
            <path d="M12 104 Q14 80 50 76 Q86 80 88 104 Z" fill={C.navyOscuro} />
            <path d="M43 77 L50 86 L57 77" fill="none" stroke={C.coral} strokeWidth="3" strokeLinejoin="round" />
            <rect x="44" y="66" width="12" height="14" rx="4" fill="#D39A74" />
            <g data-k="head">
              <circle cx="28" cy="52" r="4.5" fill="#D9A07A" />
              <circle cx="72" cy="52" r="4.5" fill="#D9A07A" />
              <ellipse cx="50" cy="50" rx="22" ry="25" fill={C.piel} />
              <path d="M28 46 Q26 22 50 21 Q75 22 72 46 Q68 34 56 32 Q44 31 38 36 Q32 40 28 46 Z" fill={C.navyOscuro} />
              <g stroke={C.navyOscuro} strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path className="mkab-n" d="M38 41 L46 40 M54 40 L62 41" />
                <path className="mkab-s" d="M38 38 L46 42 M54 42 L62 38" />
                <path className="mkab-h" d="M38 41 Q42 37 46 40 M54 40 Q58 37 62 41" />
                <path className="mkab-h" d="M39 49 Q42 45 45 49 M55 49 Q58 45 61 49" />
              </g>
              <g fill={C.navyOscuro}>
                <g className="mkab-n">
                  <ellipse cx="42" cy="48" rx="2.2" ry="2.8" />
                  <ellipse cx="58" cy="48" rx="2.2" ry="2.8" />
                </g>
                <g className="mkab-s">
                  <ellipse cx="42" cy="49" rx="2.2" ry="2.3" />
                  <ellipse cx="58" cy="49" rx="2.2" ry="2.3" />
                </g>
              </g>
              <path d="M50 51 Q53 57 49 58" stroke="#B97E5A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path className="mkab-n" d="M45 63 Q50 64.5 55 63" stroke="#7A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path className="mkab-s" d="M44 65 Q50 59 56 65" stroke="#7A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path className="mkab-h" d="M42 60 Q50 71 58 60 Z" fill="#7A2E22" />
              <g className="mkab-h" fill={C.coral} opacity=".45">
                <ellipse cx="35" cy="57" rx="4" ry="2.6" />
                <ellipse cx="65" cy="57" rx="4" ry="2.6" />
              </g>
              <path className="mkab-s" d="M70 32 Q73 37 70 40 Q67 37 70 32 Z" fill="#9CC8EE" />
            </g>
          </g>
        </svg>
        {/* extras de emoción */}
        <div data-k="qm" className="mkab-s" style={{ position: "absolute", left: 304, top: 2, fontSize: 20, fontWeight: 800, color: C.lima, lineHeight: 1 }}>
          ?
        </div>
        <svg className="mkab-h" width="18" height="18" viewBox="0 0 24 24" style={{ position: "absolute", left: 300, top: 2 }}>
          <path
            data-k="sp"
            d="M12 1 L14 9 L22 7 L16 12 L22 17 L14 15 L12 23 L10 15 L2 17 L8 12 L2 7 L10 9 Z"
            fill={C.lima}
          />
        </svg>

        {/* transición del loop */}
        <div data-k="fade" style={{ position: "absolute", inset: -2, background: C.navy }} />
      </div>
    </div>
  );
}

export default AnimacionBusquedaLocal;
