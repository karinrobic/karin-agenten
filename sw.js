const VERSION = 'v5';
const DATEIEN = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'kachel-k.png', 'drei-zeichen.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if (e.request.url.indexOf('karinrobic.github.io') < 0) { return; } e.respondWith(fetch(e.request).then(r => { var k = r.clone(); caches.open(VERSION).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request))); });
