# MK Web Studio — sitio de una página al estilo creatorbuzz.com

Construcción completa según el brief, con la estructura, tipografía, ritmo y efectos del sitio de referencia, pero con la marca, el copy y el negocio de MK Web Studio. Cero formularios: todo lleva a WhatsApp.

## Sistema de diseño (exacto al brief)

- Color: navy `#011A40`, navy suave `#394C6A`, coral `#FD5C41` (único acento, texto navy encima), hueso `#F6F7F8`, gris `#DEE1E6`, gris texto `#627189`, lima `#AFDE00` solo sobre navy.
- Tipografía por Google Fonts: Archivo (400/700/900) para rótulos y cuerpo, Newsreader (600 + itálica) para titulares editoriales, IBM Plex Mono para etiquetas y datos. Interlineado 0.80 en rótulos, 0.95 en titulares.
- Escala: `--paso` clamp(56–128px), `--borde` clamp(20–64px), radio 10px, contenedor 1400px.
- Todo se define como tokens en `src/styles.css`; ninguna clase de color suelta en componentes.

## Estructura de páginas

| Ruta | Contenido |
|---|---|
| `/` | Página completa (secciones abajo) |
| `/muestras/ficha-de-google` | Anatomía de una ficha bien hecha |
| `/muestras/sitio-en-celular` | Anatomía de un sitio en celular |
| `/muestras/antes-y-despues` | Comparación lado a lado |
| `/terminos` | Términos y condiciones |
| `/privacidad` | Política de privacidad |

## Secciones de la portada, en orden

1. Barra fija 72px: logotipo MK Web Studio + menú (EL MÉTODO · PRECIOS · MUESTRAS · CONTACTO) con letras que suben; en móvil, logo + botón coral `DIAGNÓSTICO`.
2. Hero: antetítulo mono con cuadrito coral, H1 "Que lo encuentren. Y que le escriban.", bajada, botón coral `Quiero ver mi diagnóstico`, nota mono, y franja de oferta en Newsreader itálica.
3. Muestras: antetítulo honesto (sin testimonios), párrafo de encuadre y 3 tarjetas 3:4 que navegan con telón.
4. Enjambre: sección 300vh con sticky; H2 real debajo y canvas 2D encima con ~140 fichas de "basura digital" que se dispersan al bajar (60 sin texto en móvil).
5. Cuatro tarjetas apiladas (sticky escalonado): ficha de Google, sitio, servicio mensual, e identidad con etiqueta lima `PRÓXIMAMENTE`.
6. Precios: tarjeta ARRANQUE `L 3,500`, tarjeta SITIO `L 7,500` / `L 12,000` (destacada), nota de descuento por servicio activo, bloque navy con `L 600 al mes` gigante y `L 1,800` pequeño y gris, y las dos promesas.
7. Doble cinta infinita de rubros (10 fichas, direcciones opuestas, pausa al hover).
8. CTA final 100vh con fotografía de fondo y velo navy 72%.
9. Footer navy con tres columnas y la firma gigante `MK WEB STUDIO` recortada a sangre.

## Efectos

Telón coral de 12 filas entre páginas internas; letras que suben en el menú (solo escritorio); enjambre en canvas 2D con pausa por IntersectionObserver; tarjetas apiladas solo con CSS sticky; cintas con CSS puro; scroll suave con Lenis solo en escritorio con ratón. Todo desactivado bajo `prefers-reduced-motion`.

## Imágenes que voy a generar

- 3 imágenes de muestras (ficha de Google, maqueta en celular, antes/después) en clave navy/hueso, sin stock de gente sonriendo.
- Foto del CTA final: dueño de negocio de perfil viendo su celular en su local, tratamiento documental.
- Imagen OG 1200×630 navy.
- Logotipo e isotipo subidos se usan en barra y footer.

## Notas técnicas

- El proyecto corre sobre TanStack Start, no React Router: las rutas van como archivos en `src/routes/` y la navegación usa `@tanstack/react-router`. El resto del brief se cumple tal cual.
- Solo se instala `lenis`. Metadatos y JSON-LD por ruta, `lang="es-HN"`, ciudad únicamente en metadatos.

## Datos que faltan (se dejan como marcador visible hasta que los envíe)

Número de WhatsApp con código de país, correo de contacto y nombre legal para JSON-LD y legales.
