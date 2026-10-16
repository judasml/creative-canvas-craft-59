# MK Web Studio — sitio

Sitio de MK Web Studio. Se aloja en **Cloudflare** (Worker `mkweb-sitio`); ya no depende de
Lovable. Cómo se construye y se despliega: [README.md](README.md).

- La ilustración animada de búsqueda local vive en un componente React autónomo y solo se monta en la tarjeta 01; así las otras tarjetas mantienen su estructura y aspecto.
- Animations in cards 01, 02 and 03 share the sticky-position playback controller so they restart when covered and respect reduced motion.
