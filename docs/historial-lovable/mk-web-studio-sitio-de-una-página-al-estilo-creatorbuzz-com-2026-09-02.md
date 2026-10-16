# MK Web Studio — sitio de una página al estilo creatorbuzz.com

Construcción completa según el brief, con la estructura, tipografía, ritmo y efectos del sitio de referencia, pero con la marca, el copy y el negocio de MK Web Studio. Cero formularios: todo lleva a WhatsApp.

## Sistema de diseño

### Color

- **Navy eléctrico principal:** `#0A2378`  
  Color navy por defecto para fondos, bloques principales, navegación y elementos de marca.

- **Navy oscuro:** `#011A40`  
  Se mantiene para texto sobre fondos claros, coral y lima, donde ofrece mejor contraste.

- **Navy suave:** `#394C6A`  
  Para elementos secundarios, textos o superficies de menor jerarquía.

- **Coral:** `#FD5C41`  
  Único acento cálido.  
  El texto sobre coral debe utilizar `#011A40`.

- **Hueso:** `#F6F7F8`  
  Fondo principal claro.

- **Gris:** `#DEE1E6`  
  Bordes, separadores y superficies secundarias.

- **Gris texto:** `#627189`  
  Texto secundario y descriptivo.

- **Lima:** `#AFDE00`  
  Acento complementario, principalmente asociado a superficies navy.  
  Cuando funcione como fondo, utilizar texto `#011A40`.

### Tipografía

- **Familia principal:** Figtree.
- Utilizar Figtree en toda la interfaz y comunicación visual.
- **Titulares:** pesos ligeros, composición limpia y tracking ligeramente negativo para una apariencia más compacta.
- **Texto general:** peso regular.
- **Etiquetas y microcopy:** minúsculas, peso regular; evitar el uso sistemático de mayúsculas.
- Referencia estética: tipografías geométricas contemporáneas como General Sans o Satoshi, manteniendo Figtree como fuente oficial por disponibilidad y compatibilidad web.

### Uso de color y contraste

- El navy eléctrico `#0A2378` es el color visual dominante.
- Para texto sobre coral `#FD5C41` o lima `#AFDE00`, utilizar siempre navy oscuro `#011A40`.
- No utilizar navy eléctrico como texto sobre coral o lima cuando comprometa el contraste y la accesibilidad.

### Marcas externas

- Cuando aparezca la marca **Google**, mantener siempre sus colores oficiales originales: azul, rojo, amarillo, azul, verde y rojo.
- No adaptar el logotipo de Google a la paleta de MK Web Studio.

### Escala y layout

- **Espaciado vertical `--paso`:** `clamp(56px, ..., 128px)`.
- **Margen/borde `--borde`:** `clamp(20px, ..., 64px)`.
- **Radio estándar:** `10px`.
- **Ancho máximo del contenedor:** `1400px`.

### Tokens y CSS

- Todos los colores, espacios, radios y medidas globales deben definirse como tokens en `src/styles.css`.
- Evitar valores de color escritos directamente dentro de componentes.
- No utilizar clases de color sueltas que rompan el sistema visual.
- Los componentes deben consumir siempre los tokens globales definidos por el sistema.

## Estructura de páginas

| Ruta                         | Contenido                         |
| ---------------------------- | --------------------------------- |
| `/`                          | Página completa (secciones abajo) |
| `/muestras/ficha-de-google`  | Anatomía de una ficha bien hecha  |
| `/muestras/sitio-en-celular` | Anatomía de un sitio en celular   |
| `/muestras/antes-y-despues`  | Comparación lado a lado           |
| `/terminos`                  | Términos y condiciones            |
| `/privacidad`                | Política de privacidad            |

## Secciones de la portada, en orden

1. Barra fija 72px: logotipo MK Web Studio + menú (EL MÉTODO · PRECIOS · MUESTRAS · CONTACTO) con letras que suben; en móvil, logo + botón coral `DIAGNÓSTICO`.
2. Hero: antetítulo mono con cuadrito coral, H1 "Que lo encuentren. Y que le escriban.", bajada, botón coral `Quiero ver mi diagnóstico`, nota mono, y franja de oferta en Newsreader itálica.
3. Muestras: antetítulo honesto (sin testimonios), párrafo de encuadre y 3 tarjetas 3:4 que navegan con telón.
4. Enjambre: sección 300vh con sticky; H2 real debajo y canvas 2D encima con ~140 fichas de "basura digital" que se dispersan al bajar (60 sin texto en móvil).
5. Cuatro tarjetas apiladas (sticky escalonado): ficha de Google, sitio, servicio mensual, e identidad con etiqueta lima `PRÓXIMAMENTE`.
6. Doble cinta infinita de rubros (10 fichas, direcciones opuestas, pausa al hover).
7. CTA final 100vh con fotografía de fondo y velo navy 72%.
8. Footer navy con tres columnas y la firma gigante `MK WEB STUDIO` recortada a sangre.

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
