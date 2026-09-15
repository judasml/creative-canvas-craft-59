import { useEffect, useRef, useState } from 'react';

/** Copy the accompanying public/premium folder unchanged into your project. */
export default function PremiumCatalog() {
  const frame = useRef<HTMLIFrameElement>(null);
  const observer = useRef<ResizeObserver>();
  const [height, setHeight] = useState(900);
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== window.location.origin) return;
      if (event.data?.type !== 'mk-premium-height') return;
      const value = Number(event.data.height);
      if (Number.isFinite(value) && value >= 300 && value <= 50000) setHeight(Math.ceil(value));
    };
    window.addEventListener('message', resize);
    return () => {
      window.removeEventListener('message', resize);
      observer.current?.disconnect();
    };
  }, []);
  const medir = () => {
    const doc = frame.current?.contentDocument;
    const shell = doc?.querySelector<HTMLElement>('.shell');
    if (!shell) return;
    const actualizar = () => setHeight(Math.ceil(shell.getBoundingClientRect().height));
    actualizar();
    observer.current?.disconnect();
    observer.current = new ResizeObserver(actualizar);
    observer.current.observe(shell);
  };
  return <iframe ref={frame} onLoad={medir} src="/premium/index.html" title="Catálogo Premium Motion — MK Web Studio" allow="autoplay" style={{ display: 'block', width: '100%', height, border: 0, background: '#161817' }} />;
}
