'use strict'

var CACHE_VERSION = 2;
const CACHE_NAME = 'cache-v'+CACHE_VERSION;
// The files we want to cache
var PATH = '';
var resourceList = [
   PATH + './',
   PATH + './index.html',
   PATH + './js/main.js',
   PATH + './css/style.css',
   PATH + './manifest.json',
   PATH + './images/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
  }));
});

function addToCache(cacheName, resourceList) {
  caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});
