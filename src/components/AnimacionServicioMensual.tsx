import { useEffect, useRef } from "react";
import { reproducirEnPosicion } from "@/lib/reproducirEnPosicion";

/**
 * Animación de la tarjeta 03 "El servicio mensual" (loop de 15 s).
 * Pasan los meses: la ficha y el sitio piden atención (horario, reseñas, dominio, seguridad)
 * y el equipo lo resuelve. Llega por WhatsApp el reporte del mes. En el mes 20, la misma
 * persona de las tarjetas 01 y 02 vuelve a encontrar el taller igual de bien.
 * Escena lógica de 320×220 px, pensada para fondo hueso. Si el espacio disponible es tan
 * chico que la escena no se leería, se oculta.
 * Arranca desde cero cuando la tarjeta queda en posición y visible (ver reproducirEnPosicion).
 */

const D = 15000;
const W = 320;
const H = 220;
const MAX_ESCALA = 2.2;
const MIN_ESCALA = 0.55;

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

// Tiempos de cada aviso: aparece como problema y se resuelve cuando llega el mensaje del equipo.
const AVISOS = [
  { problema: "cambió el horario", resuelto: "horario al día", mensaje: "Horario actualizado", t: 800 },
  { problema: "reseña nueva", resuelto: "reseña respondida", mensaje: "3 reseñas respondidas", t: 2000 },
  { problema: "dominio por vencer", resuelto: "dominio renovado", mensaje: "Dominio renovado", t: 3200 },
  { problema: "sitio sin revisar", resuelto: "sitio seguro", mensaje: "Sitio revisado y seguro", t: 4400 },
];
const RESUELVE = 1000;
const REPORTE = 6600;
const MES_20 = 11400;
const FINAL = 12200;

const CSS = `
.mksm{position:relative;width:100%;min-height:0;overflow:hidden}
.mksm-escena{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;font-family:inherit;pointer-events:none}
.mksm-burbuja{position:absolute;left:7px;display:inline-flex;align-items:center;gap:5px;max-width:124px;padding:5px 8px 5px 6px;border-radius:2px 9px 9px 9px;background:#fff;font-size:8.5px;font-weight:650;color:${C.navyOscuro};white-space:nowrap;opacity:0;box-shadow:0 1px 0 rgba(1,26,64,.08)}
.mksm-ok{flex:none;width:11px;height:11px;border-radius:50%;background:${C.lima};display:grid;place-items:center}
.mksm-fila{display:flex;gap:6px;align-items:flex-start;margin-top:6px;opacity:0}
.mksm-ico{flex:none;width:15px;height:15px;border-radius:5px;display:grid;place-items:center}
.mksm-lbl{font-size:7.5px;line-height:1.2;color:${C.grisTexto};text-transform:lowercase}
.mksm-val{font-size:8.5px;line-height:1.25;font-weight:800;color:${C.navyOscuro}}
.mksm-tag{position:absolute;left:180px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px 4px;border-radius:6px;font-size:10px;font-weight:700;line-height:1.2;white-space:nowrap;opacity:0;box-shadow:2px 3px 0 rgba(1,26,64,.25)}
.mksm-punto{width:4px;height:4px;border-radius:2px;background:${C.gris}}
`;

const Check = ({ color = C.navyOscuro, size = 7 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13l5 5L20 6" />
  </svg>
);
const IsotipoMK = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20">
    <path d="M4 5 L11 10" stroke={C.navy} strokeWidth="3.2" strokeLinecap="round" />
    <path d="M4 15 L11 10" stroke={C.coral} strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="16" cy="10" r="2" fill={C.lima} />
  </svg>
);

export function AnimacionServicioMensual({ className = "" }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const escena = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = caja.current;
    const st = escena.current;
    if (!box || !st) return;

    const $ = (k: string) => st.querySelector(`[data-k="${k}"]`) as HTMLElement;
    const $$ = (k: string) => Array.from(st.querySelectorAll(`[data-k="${k}"]`)) as HTMLElement[];

    const fade = $("fade");
    const lista = $("lista");
    const area = $("area");
    const burbujas = $$("msg");
    const reporte = $("reporte");
    const filas = $$("fila");
    const escribiendo = $("escribiendo");
    const tags = $$("tag");
    const tagsTxt = $$("tagTxt");
    const tagsChk = $$("tagChk");
    const mesNum = $("mesNum");
    const puntos = $$("punto");
    const final = $("final");
    const cara = $("cara");
    const dice = $("dice");
    const ficha = $("ficha");
    const sp = $("sp");

    let scrollMax = 0;
    const medir = () => {
      scrollMax = Math.max(0, reporte.offsetTop + reporte.offsetHeight + 6 - area.clientHeight);
    };

    const fit = () => {
      medir();
      const cw = box.clientWidth;
      const ch = box.clientHeight;
      if (!cw || !ch) return;
      const s = Math.min(cw / W, ch / H, MAX_ESCALA);
      st.style.visibility = s < MIN_ESCALA ? "hidden" : "visible";
      st.style.transform = `scale(${s})`;
      st.style.top = `${Math.max(0, (ch - H * s) / 2)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    let mesPrevio = 0;
    let cambioMes = 0;

    const render = (t: number) => {
      fade.style.opacity = String(t < 450 ? 1 - p(t, 0, 450) : t > 14450 ? p(t, 14450, 15000) : 0);

      // contador de meses
      const mes =
        t < MES_20
          ? 1 + Math.floor(p(t, 600, MES_20 - 400) * 11)
          : 12 + Math.round(ease(p(t, MES_20, MES_20 + 900)) * 8);
      if (mes !== mesPrevio) {
        mesNum.textContent = String(mes);
        mesPrevio = mes;
        cambioMes = t;
      }
      const pop = 1 + 0.18 * (1 - out(p(t, cambioMes, cambioMes + 260)));
      mesNum.style.transform = `scale(${t < 300 ? 1 : pop})`;
      mesNum.style.color = mes >= 20 ? C.coral : C.navy;
      puntos.forEach((d, i) => {
        d.style.background = i < mes ? (mes >= 20 ? C.coral : C.navy) : C.gris;
      });

      // avisos: problema → resuelto
      AVISOS.forEach((a, i) => {
        const el = tags[i];
        const txt = tagsTxt[i];
        const chk = tagsChk[i];
        const msg = burbujas[i];
        if (!el || !txt || !chk || !msg) return;
        const ok = t >= a.t + RESUELVE;
        el.style.opacity = String(win(t, a.t, MES_20, 280));
        el.style.transform = `translateX(${(1 - back(p(t, a.t, a.t + 420))) * -10}px) rotate(${i % 2 ? 2 : -2}deg) scale(${1 + 0.12 * win(t, a.t + RESUELVE - 60, a.t + RESUELVE + 260, 160)})`;
        el.style.background = ok ? C.navy : C.coral;
        el.style.color = ok ? "#fff" : C.navyOscuro;
        txt.textContent = ok ? a.resuelto : a.problema;
        chk.style.display = ok ? "inline-flex" : "none";

        const m = out(p(t, a.t + RESUELVE - 200, a.t + RESUELVE + 150));
        msg.style.opacity = String(m);
        msg.style.transform = `translateY(${(1 - m) * 6}px) scale(${0.96 + 0.04 * m})`;
      });

      // reporte del mes
      escribiendo.style.opacity = String(win(t, REPORTE - 700, REPORTE + 50, 150));
      const r = out(p(t, REPORTE, REPORTE + 450));
      reporte.style.opacity = String(r);
      reporte.style.transform = `translateY(${(1 - r) * 8}px) scale(${0.96 + 0.04 * r})`;
      filas.forEach((f, i) => {
        const q = out(p(t, REPORTE + 600 + i * 800, REPORTE + 1000 + i * 800));
        f.style.opacity = String(q);
        f.style.transform = `translateX(${(1 - q) * -6}px)`;
      });
      lista.style.transform = `translateY(${-ease(p(t, REPORTE, REPORTE + 700)) * scrollMax}px)`;

      // mes 20: la persona lo vuelve a encontrar
      const fIn = out(p(t, FINAL, FINAL + 500));
      final.style.opacity = String(fIn);
      cara.style.transform = `translateY(${(1 - back(p(t, FINAL, FINAL + 550))) * 14 - Math.abs(Math.sin((t - FINAL) / 170)) * 4 * win(t, FINAL + 400, FINAL + 1600, 200)}px)`;
      const dIn = out(p(t, FINAL + 500, FINAL + 900));
      dice.style.opacity = String(dIn);
      dice.style.transform = `scale(${0.85 + 0.15 * back(p(t, FINAL + 500, FINAL + 900))})`;
      const fiIn = out(p(t, FINAL + 250, FINAL + 700));
      ficha.style.opacity = String(fiIn);
      ficha.style.transform = `translateY(${(1 - fiIn) * 10}px)`;
      sp.setAttribute("transform", `rotate(${(t / 18) % 360} 12 12)`);
    };

    if (document.fonts?.ready) void document.fonts.ready.then(fit);
    const detener = reproducirEnPosicion(box, render, D, 13400);

    return () => {
      detener();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={caja}
      className={`mksm ${className}`}
      role="img"
      aria-label="Animación: pasan los meses; cambian horarios, llegan reseñas y el dominio está por vencer, y el equipo lo resuelve. Llega por WhatsApp el reporte del mes con a quién le gana, a quién puede alcanzar y qué dicen de su competencia. En el mes 20 el cliente vuelve a encontrar el taller igual de bien."
    >
      <style>{CSS}</style>
      <div ref={escena} className="mksm-escena" aria-hidden="true">
        {/* Teléfono del dueño: conversación con el equipo */}
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 0,
            width: 150,
            height: 220,
            borderRadius: 24,
            background: C.navyOscuro,
            boxShadow: "0 18px 36px -16px rgba(1,26,64,.55)",
          }}
        >
          <div style={{ position: "absolute", left: 5, top: 5, width: 140, height: 210, borderRadius: 19, background: "#E9EDF3", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 50, top: 5, width: 40, height: 8, borderRadius: 4, background: C.navyOscuro, zIndex: 6 }} />

            {/* encabezado del chat */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 40,
                padding: "17px 8px 0",
                boxSizing: "border-box",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 5,
                zIndex: 3,
                borderBottom: `1px solid ${C.gris}`,
              }}
            >
              <span style={{ width: 16, height: 16, borderRadius: 8, background: C.hueso, border: `1px solid ${C.gris}`, display: "grid", placeItems: "center" }}>
                <IsotipoMK size={11} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: C.navyOscuro }}>MK Web Studio</span>
                <span data-k="escribiendo" style={{ fontSize: 7, color: C.grisTexto, opacity: 0 }}>
                  escribiendo…
                </span>
              </span>
            </div>

            {/* mensajes */}
            <div data-k="area" style={{ position: "absolute", left: 0, right: 0, top: 40, bottom: 28, overflow: "hidden" }}>
              <div data-k="lista" style={{ position: "relative" }}>
                {AVISOS.map((a, i) => (
                  <div key={a.mensaje} className="mksm-burbuja" data-k="msg" style={{ top: 7 + i * 26 }}>
                    <span className="mksm-ok">
                      <Check />
                    </span>
                    {a.mensaje}
                  </div>
                ))}

                <div
                  data-k="reporte"
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 7 + AVISOS.length * 26 + 2,
                    width: 126,
                    padding: "7px 8px 8px",
                    boxSizing: "border-box",
                    borderRadius: "2px 10px 10px 10px",
                    background: "#fff",
                    opacity: 0,
                    boxShadow: "0 1px 0 rgba(1,26,64,.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: C.navyOscuro }}>Reporte del mes</span>
                    <IsotipoMK size={10} />
                  </div>
                  <div style={{ height: 1, background: C.gris, marginTop: 5 }} />

                  <div className="mksm-fila" data-k="fila">
                    <span className="mksm-ico" style={{ background: C.lima }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.navyOscuro} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </span>
                    <span>
                      <span className="mksm-lbl" style={{ display: "block" }}>le gana a</span>
                      <span className="mksm-val">Taller Central</span>
                    </span>
                  </div>

                  <div className="mksm-fila" data-k="fila">
                    <span className="mksm-ico" style={{ background: C.coral }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.navyOscuro} strokeWidth="3" strokeLinecap="round">
                        <circle cx="12" cy="12" r="8" />
                        <circle cx="12" cy="12" r="3" fill={C.navyOscuro} />
                      </svg>
                    </span>
                    <span>
                      <span className="mksm-lbl" style={{ display: "block" }}>puede alcanzar a</span>
                      <span className="mksm-val" style={{ display: "block" }}>Auto Servicio Norte</span>
                      <span style={{ display: "block", fontSize: 7.5, color: C.navySuave, marginTop: 1 }}>le faltan 8 reseñas</span>
                    </span>
                  </div>

                  <div className="mksm-fila" data-k="fila">
                    <span className="mksm-ico" style={{ background: C.navy }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round">
                        <path d="M4 5h16v11H9l-5 4z" />
                      </svg>
                    </span>
                    <span>
                      <span className="mksm-lbl" style={{ display: "block" }}>dicen de su competencia</span>
                      <span className="mksm-val">“tardan en entregar”</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* barra de escribir */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 28, background: "#fff", display: "flex", alignItems: "center", gap: 5, padding: "0 7px", boxSizing: "border-box" }}>
              <div style={{ flex: 1, height: 16, borderRadius: 8, background: C.hueso, border: `1px solid ${C.gris}` }} />
              <div style={{ width: 16, height: 16, borderRadius: 8, background: C.navy }} />
            </div>
          </div>
        </div>

        {/* contador de meses */}
        <div style={{ position: "absolute", left: 180, top: 2 }}>
          <div style={{ fontSize: 9, color: C.grisTexto }}>mes</div>
          <div data-k="mesNum" style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em", color: C.navy, transformOrigin: "0 70%" }}>
            1
          </div>
        </div>
        <div style={{ position: "absolute", left: 180, top: 52, width: 140, display: "flex", flexWrap: "nowrap", gap: 2.6 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="mksm-punto" data-k="punto" />
          ))}
        </div>

        {/* avisos */}
        {AVISOS.map((a, i) => (
          <span key={a.problema} className="mksm-tag" data-k="tag" style={{ top: 74 + i * 25, background: C.coral, color: C.navyOscuro }}>
            <span data-k="tagChk" style={{ display: "none" }}>
              <Check color={C.lima} size={8} />
            </span>
            <span data-k="tagTxt">{a.problema}</span>
          </span>
        ))}

        {/* mes 20: la misma persona vuelve a encontrarlo */}
        <div data-k="final" style={{ position: "absolute", left: 176, top: 70, width: 144, height: 150, opacity: 0 }}>
          <div data-k="cara" style={{ position: "absolute", left: 4, top: 0, width: 58, height: 58 }}>
            <svg width="58" height="58" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
              <defs>
                <clipPath id="mksm-clip">
                  <circle cx="50" cy="50" r="46" />
                </clipPath>
              </defs>
              <circle cx="50" cy="50" r="48" fill={C.navySuave} stroke={C.navy} strokeWidth="3" />
              <g clipPath="url(#mksm-clip)">
                <path d="M12 104 Q14 80 50 76 Q86 80 88 104 Z" fill={C.navyOscuro} />
                <path d="M43 77 L50 86 L57 77" fill="none" stroke={C.coral} strokeWidth="3" strokeLinejoin="round" />
                <rect x="44" y="66" width="12" height="14" rx="4" fill="#D39A74" />
                <circle cx="28" cy="52" r="4.5" fill="#D9A07A" />
                <circle cx="72" cy="52" r="4.5" fill="#D9A07A" />
                <ellipse cx="50" cy="50" rx="22" ry="25" fill={C.piel} />
                <path d="M28 46 Q26 22 50 21 Q75 22 72 46 Q68 34 56 32 Q44 31 38 36 Q32 40 28 46 Z" fill={C.navyOscuro} />
                <path d="M38 41 Q42 37 46 40 M54 40 Q58 37 62 41 M39 49 Q42 45 45 49 M55 49 Q58 45 61 49" stroke={C.navyOscuro} strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M50 51 Q53 57 49 58" stroke="#B97E5A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M42 60 Q50 71 58 60 Z" fill="#7A2E22" />
                <g fill={C.coral} opacity=".45">
                  <ellipse cx="35" cy="57" rx="4" ry="2.6" />
                  <ellipse cx="65" cy="57" rx="4" ry="2.6" />
                </g>
              </g>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" style={{ position: "absolute", left: -6, top: -4 }}>
              <path data-k="sp" d="M12 1 L14 9 L22 7 L16 12 L22 17 L14 15 L12 23 L10 15 L2 17 L8 12 L2 7 L10 9 Z" fill={C.coral} />
            </svg>
          </div>

          <div
            data-k="dice"
            style={{
              position: "absolute",
              left: 66,
              top: 10,
              maxWidth: 76,
              padding: "5px 7px",
              borderRadius: "9px 9px 9px 2px",
              background: "#fff",
              border: `1.5px solid ${C.navy}`,
              fontSize: 9,
              fontWeight: 800,
              lineHeight: 1.15,
              color: C.navyOscuro,
              transformOrigin: "0 100%",
              opacity: 0,
            }}
          >
            ¡Sigue igual de bien!
          </div>

          <div
            data-k="ficha"
            style={{
              position: "absolute",
              left: 4,
              top: 68,
              width: 134,
              padding: "7px 8px",
              boxSizing: "border-box",
              borderRadius: 10,
              background: "#fff",
              border: `1px solid ${C.gris}`,
              boxShadow: `0 0 0 2px ${C.navy}`,
              opacity: 0,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: C.navyOscuro }}>Mecánica Express</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2, fontSize: 8.5, color: C.navySuave }}>
              <b>4.9</b>
              <span
                style={{
                  fontSize: 8.5,
                  letterSpacing: ".3px",
                  backgroundImage: `linear-gradient(90deg, ${C.coral} 98%, ${C.gris} 98%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                ★★★★★
              </span>
              <span>(348)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2, fontSize: 8.5, color: C.navySuave }}>
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: 3, background: C.lima }} />
              Abierto ahora
            </div>
          </div>
        </div>

        {/* transición del loop */}
        <div data-k="fade" style={{ position: "absolute", inset: -2, background: C.hueso }} />
      </div>
    </div>
  );
}

export default AnimacionServicioMensual;