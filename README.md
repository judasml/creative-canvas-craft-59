# MK Web Studio — sitio

El sitio público de MK Web Studio: la portada, las muestras, los precios y los catálogos de
plantillas. Hecho con **TanStack Start** (React) y alojado en **Cloudflare Workers**.

Nació en Lovable y desde octubre de 2026 **ya no depende de él**: se construye, se prueba y se
despliega desde aquí. El historial de lo que se pidió en Lovable está en
[docs/historial-lovable](docs/historial-lovable).

## Comandos

```sh
npm install                  # una vez
npm run dev                  # servidor local en http://localhost:8080
npm run build                # construye el Worker en .output/
npm run preview:cloudflare   # construye y lo corre en el motor de Cloudflare (workerd), en local
npm run deploy               # construye y publica en Cloudflare
npm run lint
```

## Cómo se publica

`vite.config.ts` construye con Nitro para Cloudflare y genera `.output/`. `wrangler.jsonc` dice cómo
se llama el Worker (`mkweb-sitio`) y en qué dominios vive (`mkwebstio.dev` y `www.mkwebstio.dev`).

1. Una vez: `npx wrangler login` con la cuenta de Cloudflare donde está el dominio.
2. `npm run deploy`.

**El dominio tiene que estar libre de registros DNS antiguos.** Un dominio propio de Worker crea
sus propios registros; si `mkwebstio.dev` o `www` ya tienen uno (por ejemplo apuntando a Lovable o
a Vercel), el despliegue se queja de que ya existe un registro DNS. Se borra ese registro en
Cloudflare → DNS y se repite.

## Imágenes

Todas viven en este repositorio: las del diseño en `src/assets/` (Vite les pone un nombre con
huella al construir) y las de marca, muestras y catálogos en `public/`. Antes, tres imágenes de las
muestras eran punteros `*.asset.json` a una ruta de la plataforma de Lovable (`/__l5e/...`) que en
otro alojamiento no existe; se descargaron y ahora son archivos normales.

## Estructura

| Carpeta | Qué hay |
|---|---|
| `src/routes/` | Una página por archivo (`index.tsx` es la portada) |
| `src/components/` | Secciones, botones y animaciones |
| `src/lib/site.ts` | Número de WhatsApp, textos de los botones y **`URL_AUDITOR`** |
| `public/plantillas`, `public/premium` | Los catálogos de plantillas que se enseñan a los clientes |
| `docs/historial-lovable/` | Lo que se pidió en Lovable, para no perder el contexto |

## El auditor

El botón «Quiero ver mi diagnóstico» lleva al auditor de presencia en Google (proyecto aparte,
`mkweb-auditor`). Su dirección se pone en `URL_AUDITOR` de `src/lib/site.ts`; mientras esté
vacío, esos botones no aparecen en el encabezado ni en precios.
