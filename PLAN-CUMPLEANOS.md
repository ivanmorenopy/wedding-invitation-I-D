# Plan: Invitación de Cumpleaños

Reutilizar la estructura y los estilos de la invitación de boda para una **invitación de cumpleaños**, simplificada, con paleta no romántica.

Estado: **EN CURSO** (respaldo + paleta hechos el 2026-10-12; resto pendiente).

**Decisiones confirmadas:**
- Tema **oscuro**: fondo negro, acentos dorados (#c3a768), detalles navy (#041332).
- Se edita **en el repo actual** (esta invitación reemplaza a la de boda).
- Se conserva **Confirmar asistencia (RSVP)** además de Portada, Nombre+Fecha y Evento.

---

## 1. Objetivo

- Reusar el HTML/CSS/JS existente (`index.html`, `styles.css`, `script.js`, `assets/`).
- Versión **simplificada**: menos secciones.
- Secciones finales:
  1. **Portada** (sobre "Toca para abrir") — igual que ahora.
  2. **Nombre + Fecha juntos** — fusionar `#nombres` y `#fecha` en una sola sección (nombre del festejado + fecha + cuenta regresiva).
  3. **Evento** — la antigua `#ceremonia` renombrada conceptualmente a "Evento" (fecha, hora, lugar, dirección, botones mapa y calendario).
- Paleta infantil/festejo no romántica.

## 2. Alcance (qué se elimina / qué queda)

| Sección actual | Decisión |
|---|---|
| `#portada` | **Se queda** |
| `#nombres` | **Fusionar** con `#fecha` → nueva `#nombre-fecha` |
| `#fecha` (countdown) | **Fusionar** arriba |
| `#historia` (timeline) | **Eliminar** |
| `#ceremonia` | **Se queda**, renombrada a "Evento" |
| `#vestimenta` | **Eliminar** (o consultar) |
| `#regalos` + modal | **Eliminar** |
| `#rsvp` | **Se queda** (confirmado) |
| `#tips` | **Eliminar** |
| `#footer` | **Se queda** (simplificado) |
| Modal paleta de colores | **Eliminar** |

## 3. Paleta de colores

Paleta pedida: **#c3a768** (dorado), **#000000** (negro), detalle **#041332** (azul medio noche).

### Variables actuales (styles.css:1-17)
```
--color-rosa: #f4e1d2;
--color-rosa-oscuro: #e8c4b0;
--color-rosa-light: #faf0eb;
--color-dorado: #c9a86c;
--color-dorado-oscuro: #a68b4b;
--color-crema: #faf8f5;
--color-texto: #5a4a3a;
--color-texto-claro: #8a7a6a;
--rgb-rosa: 244, 225, 210;
--rgb-rosa-light: 250, 240, 235;
--rgb-crema: 250, 248, 245;
```

### Propuesta (tema oscuro festejo — CONFIRMADO)
```
--color-dorado: #c3a768;          /* acento principal */
--color-dorado-oscuro: #9a8149;   /* acento oscuro */
--color-negro: #000000;           /* fondo principal */
--color-azul: #041332;            /* detalle (navy) */
--color-crema: #f4efe4;           /* superficies claras / tarjetas */
--color-rosa-light: #f4efe4;      /* reemplazo de rosa-light */
--color-texto: #f4efe4;           /* texto claro sobre fondo negro */
--color-texto-claro: #9a8f7a;
--rgb-crema: 4, 19, 50;           /* navy translúcido para fondos */
--rgb-rosa-light: 10, 8, 4;       /* negro cálido translúcido */
--rgb-rosa: 195, 167, 104;        /* dorado translúcido */
```

Notas:
- Mantener los nombres de variable (`--color-rosa`, `--color-rosa-light`) para **minimizar el diff**: solo cambian los valores. El rosa deja de ser rosa.
- Fondos: negro con capas translúcidas dorado/navy (los `rgba(var(--rgb-...))` ahora muestran video de fondo sobre negro).
- Tarjetas (`.countdown-item`, `.event-card`, etc.) pasan de `white` a superficie navy `#041332` con borde dorado.
- Botones: gradiente `#c3a768 → #9a8149` (ya lo hacen, solo cambia el dorado).
- Texto sobre negro debe ser claro (`#f4efe4`) para contraste accesible.

### Archivos con colores hardcodeados a revisar
- `styles.css`: `rgba(201, 168, 108, ...)` (dorado viejo), `rgba(90, 74, 58, ...)` (sombra marrón), `rgba(244, 225, 210, ...)`, `#25D366` (WhatsApp, solo si se conserva RSVP).
- `script.js:82`: `const colores = ['#c9a86c', '#e8c4b0', '#f4e1d2', '#a68b4b', '#faf8f5'];` (confetti) → cambiar a dorado/negro/azul.

## 4. Cambios por archivo

### `index.html`
- [x] `<title>` y encabezados → cumpleaños (hecho 2026-10-12: Esteban · 10 años).
- [x] Fusionar `#nombres` + `#fecha` en una sección `#nombre-fecha` (hecho 2026-10-12, clases CSS reutilizadas; `id="ceremonia"` conservado para minimizar diff):
  - Nombre del festejado + edad (opcional).
  - Fecha del evento + countdown (días/horas/minutos).
- [x] Eliminar secciones `#historia`, `#vestimenta`, `#regalos`, `#tips` y sus modales (hecho 2026-10-12; `#rsvp` se conserva por decisión §8).
- [x] Renombrar textos de `#ceremonia` → "Evento" (hecho 2026-10-12: fiesta de cumpleaños).
- [x] `#footer` simplificado (hecho 2026-10-12: Esteban + 12·12·2026).
- [x] Ajustar nav flotante (hecho 2026-10-12: solo nombre-fecha, ceremonia, rsvp).

### `styles.css`
- [x] Actualizar `:root` con la paleta nueva (hecho 2026-10-12: dorado #c3a768, negro, navy #041332, texto claro).
- [x] Reemplazar hardcodes marrón/dorado viejo por nuevos valores (hecho 2026-10-12: textura SVG, `.tips-icono`, sombra confir-asistencia; sombras `rgba(90,74,58)` restantes se limpian en "Limpiar CSS").
- [x] Ajustar estilos de `#nombre-fecha` (hecho 2026-10-12: alias `.nombres.visible`/`#nombre-fecha.visible` para fecha-label y countdown, fondo fusionado, estilo `.edad-festejo`; tarjetas a navy `#041332` con borde dorado, nav/botones flotantes a navy).
- [x] Limpiar CSS de secciones eliminadas (hecho 2026-10-12: ~900 líneas fuera — historia/timeline, vestimenta, regalos, tips, modales, recepcion, ampersand; sombras marrones → negro, `rgba(201,168,108)` → `rgba(195,167,104)`; styles.css 2137→1222 líneas).

### `script.js`
- [x] `colores` del confetti (hecho: dorado/navy/negro/crema).
- [x] Fecha del countdown → `2026-12-12T18:00:00` (hecho 2026-10-12).
- [x] Arrays de secciones en navegación → `['nombre-fecha', 'ceremonia', 'rsvp', 'footer']` (hecho 2026-10-12).
- [x] Quitar listeners de elementos eliminados (hecho 2026-10-12: JS de modales contribuir/paleta + hover de timeline eliminados; RSVP conserva sus links).

### `assets/`
- [ ] Reemplazar `sobre-cerrado.jpg`, logo del evento, sello, etc. (imágenes temáticas).
- [ ] Audio/video de fondo opcionales.

### Deployment
- [x] `CNAME` apuntaba a dominio de boda → eliminado 2026-10-12 (Pages vuelve a URL por defecto; recrear si hay dominio nuevo).
- [ ] `README.md` / `server.bat` actualizar descripción.

## 5. Contenido (inventado el 2026-10-12 — reemplazar por datos reales)

- [x] Nombre festejado/a: **Esteban**
- [x] Edad (si se muestra): **10 años**
- [x] Fecha del evento: **sábado 12 de diciembre de 2026** (verificado: cae sábado)
- [x] Hora: **18:00 hs** (fiesta 18:00–22:00 ART)
- [x] Lugar: **Quinta Setiembre Eventos** (se mantiene el de la boda)
- [x] Dirección: **Aconquija 1152, Ministro Rivadavia, Buenos Aires** (se mantiene)
- [x] Link Google Maps: se mantiene el de la boda
- [x] Link "Agendar en Google Calendar": regenerado para el cumple
- [x] Texto footer: **¡Te esperamos! — Esteban — 12·12·2026**
- [ ] Revisar: números WhatsApp RSVP (se mantienen Denys/Ivan como organizadores) y fecha límite (28/11/2026, inventada)

## 6. Estructura de carpetas (decisión)

**Confirmado: editar en el repo actual.** Esta invitación reemplaza a la de boda. Considerar un tag/rama `boda` antes de empezar para poder recuperar la versión original.

## 7. Orden de ejecución propuesto

1. Confirmar decisiones abiertas (§8).
2. Definir contenido (§5).
3. Actualizar `:root` (paleta) → verificación visual rápida.
4. Fusionar sección nombre+fecha en HTML.
5. Eliminar secciones fuera de alcance + limpiar nav.
6. Renombrar ceremonia → evento.
7. Actualizar `script.js` (confetti, countdown, secciones).
8. Limpiar CSS muerto.
9. Reemplazar imágenes/audio.
10. Revisar responsive y accesibilidad.
11. Actualizar CNAME/README.

## 8. Decisiones abiertas (confirmar antes de codificar)

1. ~~**Tema**~~ → **CONFIRMADO: oscuro.**
2. ~~**Carpeta**~~ → **CONFIRMADO: editar en el repo actual.**
3. ~~**Secciones extra**~~ → **CONFIRMADO: se conserva solo RSVP.**
4. **Contenido**: nombre, fecha, lugar y demás datos del cumpleaños (ver §5). **PENDIENTE.**
5. **Imágenes/audio**: ¿los provee el usuario o se dejan placeholders? **PENDIENTE.**

## 9. Progreso

- [x] Explorar estructura del proyecto
- [x] Redactar plan
- [x] Confirmar decisiones (§8): tema oscuro, editar en el repo, conservar RSVP
- [x] Definir contenido (§5) — inventado 2026-10-12, pendiente confirmar datos reales
- [x] Hacer tag/rama de respaldo de la versión boda (`boda-respaldo`)
- [x] Implementar paleta
- [x] Fusionar nombre+fecha
- [x] Eliminar secciones sobrantes (historia, vestimenta, regalos, tips, modal paleta, modal contribuir)
- [x] Renombrar ceremonia → evento
- [x] Actualizar `script.js`
- [x] Limpiar CSS (2026-10-12; ver §4)
- [ ] Reemplazar assets (excluido a pedido — queda pendiente del usuario)
- [x] Revisar responsive/accesibilidad (2026-10-12: responsive intacto tras limpieza — media queries conservados; a11y: alt agregado a logo-quinta y sello; countdown/nav/botones ya tenían roles y aria-labels)
- [x] Actualizar CNAME (eliminado 2026-10-12) / README parcial 2026-10-12
