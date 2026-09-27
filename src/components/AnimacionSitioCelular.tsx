import { useEffect, useRef } from "react";
import { reproducirEnPosicion } from "@/lib/reproducirEnPosicion";

/**
 * Animación de la tarjeta 02 "El sitio" (loop de 15 s).
 * La misma persona de la tarjeta 01 compara dos talleres: uno sin sitio propio y otro con sitio.
 * Abre el sitio de Mecánica Express en el celular, revisa servicios y horario, y le escribe.
 * Escena lógica de 320×220 px que se escala al espacio disponible. Pensada para fondo coral.
 * Arranca desde cero cuando la tarjeta queda en posición y visible (ver reproducirEnPosicion).
 */

const D = 15000;
const W = 320;
const H = 220;
const MAX_ESCALA = 2.2;
const MSG = "Hola, quisiera una cita para revisar los frenos.";

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

const CSS = `
.mks{position:relative;width:100%;min-height:0;overflow:hidden}
.mks-escena{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;font-family:inherit;pointer-events:none}
.mks-n,.mks-s,.mks-h{opacity:0;transition:opacity .18s ease}
.mks-escena[data-mood="n"] .mks-n,.mks-escena[data-mood="s"] .mks-s,.mks-escena[data-mood="h"] .mks-h{opacity:1}
.mks-card{position:absolute;left:7px;width:126px;padding:6px 7px;border-radius:10px;background:#fff;border:1px solid ${C.gris};box-sizing:border-box}
.mks-nom{font-size:10px;font-weight:800;letter-spacing:-.01em;color:${C.navyOscuro};line-height:1.2;white-space:nowrap}
.mks-lin{display:flex;align-items:center;gap:3px;margin-top:2px;font-size:8.5px;line-height:1.3;color:${C.navySuave};white-space:nowrap}
.mks-est{font-size:8.5px;letter-spacing:.3px;-webkit-background-clip:text;background-clip:text;color:transparent}
.mks-acc{display:flex;gap:4px;margin-top:5px}
.mks-btn{position:relative;flex:none;display:inline-flex;align-items:center;gap:3px;height:17px;padding:0 6px;border-radius:9px;border:1px solid #C9CFD9;background:#fff;color:${C.navy};font-size:8px;font-weight:700;white-space:nowrap}
.mks-btn.prim{background:${C.navy};border-color:${C.navy};color:#fff}
.mks-btn.vacio{color:#98A0AE;border-style:dashed}
.mks-fila{display:flex;align-items:center;gap:5px;height:20px;margin:0 7px 4px;padding:0 6px;border-radius:7px;background:#fff;font-size:8.5px;font-weight:600;color:${C.navyOscuro}}
.mks-ok{flex:none;width:11px;height:11px;border-radius:50%;background:${C.lima};display:grid;place-items:center}
.mks-rot{margin:9px 7px 4px;font-size:8px;color:${C.grisTexto};text-transform:lowercase}
.mks-tag{position:absolute;left:180px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px 4px;border-radius:6px;font-size:10.5px;font-weight:700;line-height:1.2;white-space:nowrap;opacity:0;box-shadow:2px 3px 0 rgba(1,26,64,.35)}
.mks-tap{position:absolute;left:50%;top:50%;width:24px;height:24px;border-radius:50%;background:rgba(10,35,120,.25);border:1.5px solid #fff;opacity:0;transform:translate(-50%,-50%)}
`;

const IconoWeb = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
);
const IconoChat = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round">
    <path d="M4 5h16v11H9l-5 4z" />
  </svg>
);
const Check = ({ color = C.navyOscuro, size = 7 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13l5 5L20 6" />
  </svg>
);
const Estrellas = ({ pct }: { pct: number }) => (
  <span className="mks-est" style={{ backgroundImage: `linear-gradient(90deg, ${C.coral} ${pct}%, ${C.gris} ${pct}%)` }}>
    ★★★★★
  </span>
);
const Punto = ({ color }: { color: string }) => (
  <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: 3, background: color }} />
);

export function AnimacionSitioCelular({ className = "" }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const escena = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = caja.current;
    const st = escena.current;
    if (!box || !st) return;

    const $ = (k: string) => st.querySelector(`[data-k="${k}"]`) as HTMLElement;
    const $$ = (k: string) => Array.from(st.querySelectorAll(`[data-k="${k}"]`)) as HTMLElement[];

    const fade = $("fade");
    const cards = $$("card");
    const site = $("site");
    const siteScroll = $("siteScroll");
    const loader = $("loader");
    const waBtn = $("wa");
    const chat = $("chat");
    const msg = $("msg");
    const sent = $("sent");
    const sendBtn = $("send");
    const siteBtn = $("siteBtn");
    const tagsBad = $$("tb");
    const tagsGood = $$("tg");
    const head = $("head");
    const sp = $("sp");
    const qm = $("qm");
    const phone = $("phone");
    const taps: [HTMLElement, number][] = [
      [$("tapSite"), 4800],
      [$("tapWa"), 10000],
      [$("tapSend"), 12250],
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
      const m = t < 2000 ? "n" : t < 6800 ? "s" : "h";
      if (m !== mood) {
        st.setAttribute("data-mood", m);
        mood = m;
      }
      const hop = m === "h" ? -Math.abs(Math.sin((t - 6800) / 170)) * 5 * (1 - p(t, 6800, 8000)) : 0;
      const tilt = Math.sin(t / 650) * 2 + (m === "s" ? -5 : 0);
      head.setAttribute("transform", `translate(0 ${hop + (m === "s" ? 2 : 0)}) rotate(${tilt} 50 70)`);
      sp.setAttribute("transform", `rotate(${(t / 18) % 360} 12 12)`);
      qm.style.transform = `translateY(${Math.sin(t / 300) * 2}px)`;

      // teléfono: leve acercamiento al abrir el sitio
      const z = 1 + 0.04 * (ease(p(t, 5200, 5900)) - ease(p(t, 13600, 14300)));
      phone.style.transform = `scale(${z})`;

      // resultados
      cards.forEach((c, i) => {
        const q = out(p(t, 500 + i * 180, 1000 + i * 180));
        c.style.opacity = String(q);
        c.style.transform = `translateY(${(1 - q) * 10}px)`;
      });
      const fb = win(t, 1500, 4700);
      const fs = win(t, 4600, 5600, 200);
      if (cards[0]) cards[0].style.boxShadow = `0 0 0 ${2 * fb}px rgba(253,92,65,${fb})`;
      if (cards[1]) cards[1].style.boxShadow = `0 0 0 ${2 * fs}px rgba(10,35,120,${fs})`;
      setBtn(siteBtn, 0.1 * win(t, 4800, 5050, 120));

      // carga y entrada del sitio
      const l = p(t, 5100, 5700);
      loader.style.width = `${out(l) * 100}%`;
      loader.style.opacity = String(t < 5700 ? (l > 0 ? 1 : 0) : 1 - p(t, 5700, 5900));
      const sIn = out(p(t, 5400, 6100));
      site.style.transform = `translateX(${(1 - sIn) * 100}%)`;
      siteScroll.style.transform = `translateY(${-ease(p(t, 6700, 9500)) * 118}px)`;

      // botón de escribir y conversación
      const wIn = out(p(t, 6200, 6600));
      waBtn.style.opacity = String(wIn);
      waBtn.style.transform = `translateY(${(1 - wIn) * 10}px) scale(${1 - 0.07 * win(t, 10000, 10250, 120)})`;
      const cIn = out(p(t, 10350, 10850));
      chat.style.transform = `translateY(${(1 - cIn) * 100}%)`;
      const n = Math.round(p(t, 10900, 12000) * MSG.length);
      msg.textContent = MSG.slice(0, n);
      (msg.parentElement as HTMLElement).style.opacity = n > 0 ? "1" : "0";
      setBtn(sendBtn, 0.12 * win(t, 12250, 12500, 120));
      sent.style.opacity = String(out(p(t, 12450, 12800)));

      for (const [el, a] of taps) {
        const q = p(t, a, a + 500);
        el.style.opacity = String(q > 0 && q < 1 ? 1 - q : 0);
        el.style.transform = `translate(-50%,-50%) scale(${0.5 + out(q) * 0.9})`;
      }

      const etiquetas = (arr: HTMLElement[], a: number, b: number) =>
        arr.forEach((el, i) => {
          const s = a + i * 360;
          el.style.opacity = String(win(t, s, b, 260));
          el.style.transform = `translateX(${(1 - back(p(t, s, s + 420))) * -10}px) rotate(${i % 2 ? 2 : -2}deg)`;
        });
      etiquetas(tagsBad, 2000, 4700);
      etiquetas(tagsGood, 7000, 13600);
    };

    const detener = reproducirEnPosicion(box, render, D, 13000);

    return () => {
      detener();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={caja}
      className={`mks ${className}`}
      role="img"
      aria-label="Animación: una persona compara dos talleres. Uno no tiene sitio web; el otro sí. Abre el sitio en su celular, revisa servicios y horario, y le escribe para pedir una cita."
    >
      <style>{CSS}</style>
      <div ref={escena} className="mks-escena" data-mood="n" aria-hidden="true">
        {/* Teléfono */}
        <div
          data-k="phone"
          style={{
            position: "absolute",
            left: 14,
            top: 0,
            width: 150,
            height: 220,
            borderRadius: 24,
            background: C.navyOscuro,
            transformOrigin: "50% 50%",
            boxShadow: "0 18px 36px -16px rgba(1,26,64,.75)",
          }}
        >
          <div style={{ position: "absolute", left: 5, top: 5, width: 140, height: 210, borderRadius: 19, background: C.hueso, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 50, top: 5, width: 40, height: 8, borderRadius: 4, background: C.navyOscuro, zIndex: 6 }} />
            <div data-k="loader" style={{ position: "absolute", left: 0, top: 0, height: 2.5, width: 0, background: C.navy, zIndex: 7 }} />

            {/* Vista 1: resultados */}
            <div style={{ position: "absolute", inset: 0 }}>
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 18,
                  width: 126,
                  height: 20,
                  borderRadius: 10,
                  background: "#fff",
                  border: `1px solid ${C.gris}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "0 7px",
                  boxSizing: "border-box",
                  fontSize: 8.5,
                  fontWeight: 500,
                  color: C.navyOscuro,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.grisTexto} strokeWidth="2.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.6-3.6" />
                </svg>
                taller mecánico cerca de mí
              </div>

              <div className="mks-card" data-k="card" style={{ top: 46, opacity: 0 }}>
                <div className="mks-nom">Auto Servicio Norte</div>
                <div className="mks-lin">
                  <b>4.1</b>
                  <Estrellas pct={82} />
                  <span>(35)</span>
                </div>
                <div className="mks-lin">
                  <Punto color={C.lima} />
                  Abierto ahora
                </div>
                <div className="mks-acc">
                  <span className="mks-btn">Llamar</span>
                  <span className="mks-btn vacio">Sin sitio</span>
                </div>
              </div>

              <div className="mks-card" data-k="card" style={{ top: 124, opacity: 0 }}>
                <div className="mks-nom">Mecánica Express</div>
                <div className="mks-lin">
                  <b>4.8</b>
                  <Estrellas pct={96} />
                  <span>(212)</span>
                </div>
                <div className="mks-lin">
                  <Punto color={C.lima} />
                  Abierto ahora
                </div>
                <div className="mks-acc">
                  <span className="mks-btn">Llamar</span>
                  <span className="mks-btn prim" data-k="siteBtn">
                    <IconoWeb />
                    Sitio web
                    <span className="mks-tap" data-k="tapSite" />
                  </span>
                </div>
              </div>
            </div>

            {/* Vista 2: sitio de Mecánica Express */}
            <div data-k="site" style={{ position: "absolute", inset: 0, background: C.hueso, transform: "translateX(100%)", zIndex: 4 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 36,
                  padding: "16px 8px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: C.hueso,
                  zIndex: 2,
                  boxSizing: "border-box",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9.5, fontWeight: 800, color: C.navyOscuro, letterSpacing: "-.01em" }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: C.coral, display: "grid", placeItems: "center" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1z" />
                    </svg>
                  </span>
                  Mecánica Express
                </span>
                <svg width="11" height="9" viewBox="0 0 11 9">
                  <path d="M0 1h11M0 4.5h11M0 8h11" stroke={C.navyOscuro} strokeWidth="1.6" />
                </svg>
              </div>

              <div style={{ position: "absolute", left: 0, right: 0, top: 36, bottom: 0, overflow: "hidden" }}>
                <div data-k="siteScroll" style={{ paddingBottom: 48 }}>
                  <div style={{ position: "relative", margin: "0 7px", padding: "9px 9px 10px", borderRadius: 11, background: C.navy, color: "#fff", height: 92, boxSizing: "border-box", overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.02em", maxWidth: 110 }}>Frenos, motor y A/C</div>
                    <div style={{ marginTop: 5, fontSize: 8, opacity: 0.85, maxWidth: 70 }}>diagnóstico el mismo día</div>
                    <svg width="44" height="30" viewBox="0 0 60 40" style={{ position: "absolute", right: 4, bottom: 2 }}>
                      <rect x="4" y="31" width="52" height="4" rx="2" fill={C.navyOscuro} />
                      <path d="M10 27 L14 17 Q16 13 22 13 H38 Q44 13 47 17 L52 27 Z" fill={C.coral} />
                      <rect x="19" y="16" width="9" height="6" rx="1.5" fill="#fff" />
                      <rect x="31" y="16" width="10" height="6" rx="1.5" fill="#fff" />
                      <circle cx="18" cy="28" r="4.5" fill={C.navyOscuro} />
                      <circle cx="43" cy="28" r="4.5" fill={C.navyOscuro} />
                    </svg>
                  </div>

                  <div className="mks-rot">servicios</div>
                  {["Frenos y suspensión", "Motor y afinado", "Aire acondicionado", "Revisión de viaje"].map((s) => (
                    <div key={s} className="mks-fila">
                      <span className="mks-ok">
                        <Check />
                      </span>
                      {s}
                    </div>
                  ))}

                  <div className="mks-rot">horario</div>
                  <div className="mks-fila" style={{ fontWeight: 500 }}>
                    Lun. a sáb. · 7 a 6 p. m.
                  </div>

                  <div className="mks-rot">cómo llegar</div>
                  <div style={{ margin: "0 7px", height: 40, borderRadius: 8, overflow: "hidden", position: "relative" }}>
                    <svg width="126" height="40" viewBox="0 0 126 40">
                      <rect width="126" height="40" fill="#E6EAF1" />
                      <path d="M0 10 L126 26" stroke="#fff" strokeWidth="4" />
                      <path d="M50 0 L60 40" stroke="#fff" strokeWidth="4" />
                      <path d="M0 32 C40 28 70 14 126 8" stroke="#FCD6CD" strokeWidth="4" fill="none" />
                    </svg>
                    <svg width="12" height="16" viewBox="0 0 24 32" style={{ position: "absolute", left: 57, top: 6 }}>
                      <path d="M12 31s10-11 10-19A10 10 0 0 0 2 12c0 8 10 19 10 19z" fill={C.navy} stroke="#fff" strokeWidth="2.5" />
                      <circle cx="12" cy="12" r="4" fill="#fff" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* botón fijo */}
              <div
                data-k="wa"
                style={{
                  position: "absolute",
                  left: 7,
                  right: 7,
                  bottom: 7,
                  height: 24,
                  borderRadius: 12,
                  background: C.navy,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  fontSize: 9,
                  fontWeight: 800,
                  opacity: 0,
                  zIndex: 3,
                  boxShadow: "0 6px 14px -6px rgba(1,26,64,.7)",
                }}
              >
                <IconoChat color={C.lima} />
                Escribir por WhatsApp
                <span className="mks-tap" data-k="tapWa" />
              </div>

              {/* conversación */}
              <div
                data-k="chat"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 108,
                  borderRadius: "14px 14px 0 0",
                  background: "#fff",
                  boxShadow: "0 -8px 20px -10px rgba(1,26,64,.45)",
                  transform: "translateY(100%)",
                  zIndex: 5,
                  padding: "8px 8px 0",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, fontWeight: 800, color: C.navyOscuro }}>
                  <span style={{ width: 14, height: 14, borderRadius: 7, background: C.coral, display: "grid", placeItems: "center" }}>
                    <IconoChat color="#fff" />
                  </span>
                  Mecánica Express
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 7, minHeight: 34 }}>
                  <div
                    style={{
                      maxWidth: 104,
                      padding: "5px 7px",
                      borderRadius: "9px 9px 2px 9px",
                      background: "#E4EFC4",
                      fontSize: 8.5,
                      lineHeight: 1.3,
                      color: C.navyOscuro,
                      opacity: 0,
                    }}
                  >
                    <span data-k="msg" />
                  </div>
                </div>
                <div data-k="sent" style={{ textAlign: "right", fontSize: 7.5, color: C.grisTexto, marginTop: 2, opacity: 0 }}>
                  enviado
                </div>
                <div style={{ position: "absolute", left: 8, right: 8, bottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ flex: 1, height: 18, borderRadius: 9, background: C.hueso, border: `1px solid ${C.gris}` }} />
                  <div data-k="send" style={{ position: "relative", width: 20, height: 20, borderRadius: 10, background: C.navy, display: "grid", placeItems: "center" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span className="mks-tap" data-k="tapSend" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* etiquetas */}
        {["sin sitio web", "sin servicios", "sigue buscando"].map((txt, i) => (
          <span key={txt} className="mks-tag" data-k="tb" style={{ top: 98 + i * 26, background: C.hueso, color: C.navyOscuro }}>
            {txt}
          </span>
        ))}
        {["servicios claros", "para el celular", "le escriben ya"].map((txt, i) => (
          <span key={txt} className="mks-tag" data-k="tg" style={{ top: 98 + i * 26, background: C.navy, color: "#fff" }}>
            <Check color={C.lima} size={8} />
            {txt}
          </span>
        ))}

        {/* persona (la misma de la tarjeta 01) */}
        <svg width="74" height="74" viewBox="0 0 100 100" style={{ position: "absolute", left: 222, top: 8, overflow: "visible" }}>
          <defs>
            <clipPath id="mks-clip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="48" fill={C.navySuave} stroke={C.hueso} strokeWidth="3" />
          <g clipPath="url(#mks-clip)">
            <path d="M12 104 Q14 80 50 76 Q86 80 88 104 Z" fill={C.navyOscuro} />
            <path d="M43 77 L50 86 L57 77" fill="none" stroke={C.coral} strokeWidth="3" strokeLinejoin="round" />
            <rect x="44" y="66" width="12" height="14" rx="4" fill="#D39A74" />
            <g data-k="head">
              <circle cx="28" cy="52" r="4.5" fill="#D9A07A" />
              <circle cx="72" cy="52" r="4.5" fill="#D9A07A" />
              <ellipse cx="50" cy="50" rx="22" ry="25" fill={C.piel} />
              <path d="M28 46 Q26 22 50 21 Q75 22 72 46 Q68 34 56 32 Q44 31 38 36 Q32 40 28 46 Z" fill={C.navyOscuro} />
              <g stroke={C.navyOscuro} strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path className="mks-n" d="M38 41 L46 40 M54 40 L62 41" />
                <path className="mks-s" d="M38 38 L46 42 M54 42 L62 38" />
                <path className="mks-h" d="M38 41 Q42 37 46 40 M54 40 Q58 37 62 41" />
                <path className="mks-h" d="M39 49 Q42 45 45 49 M55 49 Q58 45 61 49" />
              </g>
              <g fill={C.navyOscuro}>
                <g className="mks-n">
                  <ellipse cx="42" cy="48" rx="2.2" ry="2.8" />
                  <ellipse cx="58" cy="48" rx="2.2" ry="2.8" />
                </g>
                <g className="mks-s">
                  <ellipse cx="42" cy="49" rx="2.2" ry="2.3" />
                  <ellipse cx="58" cy="49" rx="2.2" ry="2.3" />
                </g>
              </g>
              <path d="M50 51 Q53 57 49 58" stroke="#B97E5A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path className="mks-n" d="M45 63 Q50 64.5 55 63" stroke="#7A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path className="mks-s" d="M44 65 Q50 59 56 65" stroke="#7A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path className="mks-h" d="M42 60 Q50 71 58 60 Z" fill="#7A2E22" />
              <g className="mks-h" fill={C.coral} opacity=".45">
                <ellipse cx="35" cy="57" rx="4" ry="2.6" />
                <ellipse cx="65" cy="57" rx="4" ry="2.6" />
              </g>
              <path className="mks-s" d="M70 32 Q73 37 70 40 Q67 37 70 32 Z" fill="#9CC8EE" />
            </g>
          </g>
        </svg>
        <div data-k="qm" className="mks-s" style={{ position: "absolute", left: 298, top: 4, fontSize: 20, fontWeight: 800, color: C.navyOscuro, lineHeight: 1 }}>
          ?
        </div>
        <svg className="mks-h" width="18" height="18" viewBox="0 0 24 24" style={{ position: "absolute", left: 294, top: 2 }}>
          <path data-k="sp" d="M12 1 L14 9 L22 7 L16 12 L22 17 L14 15 L12 23 L10 15 L2 17 L8 12 L2 7 L10 9 Z" fill={C.navy} />
        </svg>

        {/* transición del loop */}
        <div data-k="fade" style={{ position: "absolute", inset: -2, background: C.coral }} />
      </div>
    </div>
  );
}

export default AnimacionSitioCelular;
