/**
 * Controla cuándo corre una animación dentro de una tarjeta apilada (sticky).
 *
 * - Arranca desde el segundo 0 cuando la animación se ve completa, nada la tapa
 *   y la tarjeta ya llegó a su posición fija. Si el usuario deja de desplazarse con la
 *   animación completa en la parte alta de la pantalla, también arranca.
 * - Se detiene y vuelve al inicio cuando deja de verse o la tapa la siguiente
 *   tarjeta; así cada vez que el usuario llega la ve desde el principio.
 * - Con "reducir movimiento" muestra un fotograma fijo y no anima.
 *
 * Devuelve una función de limpieza.
 */
export function reproducirEnPosicion(
  box: HTMLElement,
  render: (t: number) => void,
  duracion: number,
  fotogramaFijo: number,
): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const QUIETO_MS = 700;

  let raf = 0;
  let offset = 0;
  let playing = false;
  let quieto = false;
  let timer = 0;

  // La tarjeta sticky que contiene la animación.
  let tarjeta: HTMLElement | null = box.parentElement;
  while (tarjeta && getComputedStyle(tarjeta).position !== "sticky") tarjeta = tarjeta.parentElement;

  const fraccionVisible = (r: DOMRect) => {
    const vh = window.innerHeight;
    const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    return r.height > 0 ? Math.max(0, visible) / r.height : 0;
  };

  const tapada = (r: DOMRect) => {
    const vh = window.innerHeight;
    const x = r.left + r.width / 2;
    const y = Math.min(Math.max(r.top + r.height / 2, 0), vh - 1);
    const arriba = document.elementFromPoint(x, y);
    return !!arriba && !(tarjeta ?? box).contains(arriba);
  };

  const asentada = () => {
    if (!tarjeta) return true;
    const topFijo = parseFloat(getComputedStyle(tarjeta).top) || 0;
    return Math.abs(tarjeta.getBoundingClientRect().top - topFijo) < 4;
  };

  const loop = (now: number) => {
    render((now - offset) % duracion);
    raf = requestAnimationFrame(loop);
  };

  const play = () => {
    playing = true;
    offset = performance.now();
    raf = requestAnimationFrame(loop);
  };

  const reset = () => {
    playing = false;
    cancelAnimationFrame(raf);
    raf = 0;
    render(0);
  };

  const revisar = () => {
    if (reduce.matches) return;
    const r = box.getBoundingClientRect();
    if (!playing) {
      const completa = fraccionVisible(r) >= 0.98;
      const arribaDeLaPantalla = r.top < window.innerHeight * 0.35;
      if (completa && !tapada(r) && (asentada() || (quieto && arribaDeLaPantalla))) play();
    } else if (fraccionVisible(r) < 0.5 || tapada(r)) {
      reset();
    }
  };

  const onScroll = () => {
    quieto = false;
    window.clearTimeout(timer);
    revisar();
    timer = window.setTimeout(() => {
      quieto = true;
      revisar();
    }, QUIETO_MS);
  };

  const onReduce = () => {
    if (reduce.matches) {
      reset();
      render(fotogramaFijo);
    } else {
      render(0);
      onScroll();
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  reduce.addEventListener("change", onReduce);

  if (reduce.matches) render(fotogramaFijo);
  else {
    render(0);
    onScroll();
  }

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    reduce.removeEventListener("change", onReduce);
    window.clearTimeout(timer);
    cancelAnimationFrame(raf);
  };
}