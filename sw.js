// Guarda la web para usarla sin conexión. Cambia VERSION al subir una versión nueva.
const VERSION = "test-b-202610281346";
const STATE = "tdgt-state";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== STATE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // La página: primero la red (para recibir cambios) y, sin conexión, la copia guardada
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { caches.open(VERSION).then(c => c.put("index.html", r.clone())); return r; }).catch(() => caches.match("index.html")));
    return;
  }
  // Iconos y tipografías: la copia guardada y, si no está, la red
  if (url.origin === location.origin || url.host.endsWith("fonts.googleapis.com") || url.host.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(e.request, c)); return r; })));
  }
});
// Recordatorio diario: la web guarda en STATE la hora elegida y el último día con práctica
self.addEventListener("periodicsync", e => {
  if (e.tag !== "tdgt-remind") return;
  e.waitUntil((async () => {
    const c = await caches.open(STATE), u = k => new URL(k, self.registration.scope).href;
    const r = await c.match(u("remind-state")); if (!r) return;
    const s = await r.json(), d = new Date();
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!s.on || s.last === k || d.getHours() < s.h || d.getHours() >= 23) return;
    const sent = await c.match(u("remind-sent")); if (sent && await sent.text() === k) return;
    await self.registration.showNotification("Hoy aún no has practicado", { body: "Haz una práctica rápida de 10 preguntas para no perder el ritmo.", icon: "icon-192.png", badge: "icon-192.png", tag: "tdgt-remind" });
    await c.put(u("remind-sent"), new Response(k));
  })());
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => { const w = ws.find(x => x.url.startsWith(self.registration.scope)); return w ? w.focus() : clients.openWindow("./#inicio"); }));
});
