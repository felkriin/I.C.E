# I.C.E. · Creators & Testers — aplicación instalable

Esta carpeta es la aplicación completa. Funciona sin internet y guarda los datos en el
dispositivo: no hay cuenta, ni servidor, ni nada que salga del celular.

## Qué hay aquí

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación entera |
| `manifest.webmanifest` | Nombre, ícono y colores con los que se instala |
| `sw.js` | Lo que permite abrirla sin internet |
| `img/` | Marcos, botones, íconos e ilustraciones |
| `fuentes/` | Las tres tipografías, para que se vean iguales sin internet |
| `jspdf.umd.min.js` | Genera las hojas de mesa en PDF |
| `icon-*.png` | Íconos de la aplicación instalada |

## Publicarla (una sola vez)

La aplicación necesita una dirección web con candado (https) para poder instalarse.
La forma gratuita más directa es GitHub Pages:

1. Crea una cuenta en github.com y un repositorio nuevo, por ejemplo `ice`.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio (no la carpeta dentro de otra).
3. En el repositorio, entra a **Settings › Pages** y en «Source» elige la rama `main`
   y la carpeta `/ (root)`. Guarda.
4. A los pocos minutos queda publicada en `https://TUUSUARIO.github.io/ice/`.

Otras opciones igual de válidas: Netlify o Vercel (arrastrando la carpeta) o cualquier
hosting propio. Lo único imprescindible es que la dirección empiece por `https://`.

## Instalarla en el celular

1. Abre la dirección en **Chrome** (Android) o **Safari** (iPhone).
2. Android: aparece el aviso «Instala la app en este dispositivo» o, en el menú ⋮,
   «Instalar aplicación» / «Añadir a pantalla de inicio».
3. iPhone: botón Compartir › «Añadir a pantalla de inicio».
4. Queda con su ícono y se abre a pantalla completa, sin barra del navegador.

Desde la segunda vez funciona sin señal. La primera apertura sí necesita internet
para descargarse.

## Dónde quedan los datos

- **Prototipos, mecánicas, marcas y decisiones:** en el almacenamiento local del navegador.
- **Fotos de las hojas:** en la base de datos de archivos del navegador.

Esto significa que los datos son de ese dispositivo y ese navegador. No se sincronizan
entre celulares, y se borran si se borran los datos del sitio o se desinstala la app.
Para llevarse la información hay que usar **Exportar datos (CSV)** desde el prototipo.

## Generar un archivo de instalación de Android (.apk)

Solo si hace falta entregar un archivo instalable:

1. Entra a [pwabuilder.com](https://www.pwabuilder.com) y pega la dirección publicada.
2. Elige **Android** › «Generate package».
3. Descarga el paquete. Trae el `.apk` para instalar directamente y el `.aab` por si
   algún día va a la Play Store.

Para instalar el `.apk` hay que permitir «instalar aplicaciones desconocidas» en el
celular. Es la misma aplicación: lo que cambia es la forma de entregarla.

## Al publicar una versión nueva

Cambia el número de `VERSION` en la primera línea de `sw.js` (por ejemplo, de
`ice-v3-1` a `ice-v3-2`) y vuelve a subir los archivos. Si no se cambia, los
dispositivos que ya la tengan pueden seguir mostrando la versión vieja.

## Licencias de las tipografías

Atkinson Hyperlegible, Bitter e IBM Plex Mono son de uso libre (SIL Open Font License).
Se incluyen aquí sus archivos para que la aplicación funcione sin internet.
