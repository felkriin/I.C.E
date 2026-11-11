/* Funciona sin internet: guarda la app y sus imágenes en el dispositivo.
   Al publicar una versión nueva, sube el número de VERSION para que se renueve. */
const VERSION = 'ice-v3-1';
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./jspdf.umd.min.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./img/adorno-divisor.png",
  "./img/adorno-medallon-cabecera.png",
  "./img/adorno-rombo-superior.png",
  "./img/boton-chip-activo.png",
  "./img/boton-chip.png",
  "./img/boton-peligro.png",
  "./img/boton-principal-inactivo.png",
  "./img/boton-principal-presionado.png",
  "./img/boton-principal.png",
  "./img/boton-secundario-presionado.png",
  "./img/boton-secundario.png",
  "./img/cabecera-lista.png",
  "./img/casilla-marca-presionada.png",
  "./img/casilla-marca.png",
  "./img/fondo-app-claro.png",
  "./img/ico-dec-ajustar.png",
  "./img/ico-dec-mantener.png",
  "./img/ico-dec-observar.png",
  "./img/ico-dec-potenciar.png",
  "./img/ico-dec-quitar.png",
  "./img/ico-mec-espacio.png",
  "./img/ico-mec-jugadores.png",
  "./img/ico-mec-propia.png",
  "./img/ico-mec-puntaje.png",
  "./img/ico-mec-tiempo.png",
  "./img/ico-mec-turnos.png",
  "./img/ico-mec-victoria.png",
  "./img/ico-modo-digital.png",
  "./img/ico-modo-papel.png",
  "./img/ico-modo-pdf.png",
  "./img/ico-paso-0-declaracion.png",
  "./img/ico-paso-1-mecanicas.png",
  "./img/ico-paso-2-partida.png",
  "./img/ico-paso-3a-hacen.png",
  "./img/ico-paso-3b-dicen.png",
  "./img/ico-paso-4-cruce.png",
  "./img/ico-paso-5-decision.png",
  "./img/ilu-escena-inicio.png",
  "./img/ilu-pie-pagina.png",
  "./img/marco-aviso.png",
  "./img/marco-campo.png",
  "./img/marco-mitad.png",
  "./img/marco-popup.png",
  "./img/marco-sellado.png",
  "./img/marco-tarjeta-activa.png",
  "./img/marco-tarjeta.png",
  "./img/pestana-paso-actual.png",
  "./img/pestana-paso-hecho.png",
  "./img/pestana-paso.png",
  "./img/sim-negativo.png",
  "./img/sim-neutro.png",
  "./img/sim-positivo.png",
  "./fuentes/atkinson-hyperlegible-latin-400-italic.woff2",
  "./fuentes/atkinson-hyperlegible-latin-400-normal.woff2",
  "./fuentes/atkinson-hyperlegible-latin-700-normal.woff2",
  "./fuentes/bitter-latin-600-normal.woff2",
  "./fuentes/bitter-latin-700-normal.woff2",
  "./fuentes/ibm-plex-mono-latin-500-normal.woff2",
  "./fuentes/ibm-plex-mono-latin-600-normal.woff2"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  /* La página siempre primero de la red, para ver los cambios al instante; sin internet, la guardada. */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      const copia = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copia));
      return r;
    }).catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }
  /* Lo demás (imágenes, tipografías, jsPDF): primero lo guardado, y si no está, la red. */
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r && r.ok && (r.type === 'basic' || r.type === 'cors')) {
      const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia));
    }
    return r;
  }).catch(() => hit)));
});
