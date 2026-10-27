# Test Teórico Permiso B

Web para preparar el examen teórico del permiso de conducir B en España. Es un único archivo HTML, sin servidor ni base de datos: el progreso de cada alumno se guarda en su propio navegador.

## Qué incluye

- Examen simulado como el oficial: 30 preguntas, 30 minutos y un máximo de 3 fallos. También hay un simulacro realista sin ayudas y un examen de refuerzo con tus temas flojos.
- Práctica por temas, con la explicación de cada respuesta y la norma en la que se basa.
- Catálogo de señales, fichas de estudio, buscador y chuleta con las cifras que más caen.
- Mis fallos, detector de confusiones y repaso antes de dormir.
- Plan de hoy según la fecha de tu examen, gráficas de progreso, racha diaria y logros.
- Modo claro y oscuro, y versión para móvil instalable que funciona sin conexión.

## Cómo usarla

- **En el ordenador:** abre `index.html` con doble clic.
- **En el móvil:** activa GitHub Pages (Settings > Pages > rama `main`, carpeta raíz) y abre la dirección que te dé GitHub. En Android usa el menú ⋮ > «Instalar aplicación»; en iPhone, Compartir > «Añadir a pantalla de inicio».

Si cambias `index.html`, cambia también `VERSION` en `sw.js`, para que los móviles que ya la tienen instalada descarguen la versión nueva.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La web completa: estilos, preguntas, ilustraciones y código |
| `manifest.webmanifest` | Nombre, colores e iconos de la app instalada |
| `sw.js` | Guarda la web en el móvil para usarla sin conexión |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Iconos de la app |

## Contenido

Las preguntas y explicaciones son de elaboración propia y se basan en el Reglamento General de Circulación y en la normativa de tráfico vigente. Las ilustraciones de las señales son dibujos propios en SVG. No se ha copiado material de la DGT ni de otras webs de tests.
