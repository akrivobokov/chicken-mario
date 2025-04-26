const CACHE_NAME = 'chicken-mario-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/levels.js',
  '/manifest.json'
];
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(urlsToCache);
  }));
});
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  }));
});