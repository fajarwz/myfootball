importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox loaded successfully!`);
else
  console.log(`Workbox failed to load!`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/service-worker.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/img/logo.png', revision: '1' },
  { url: '/img/logo-72.png', revision: '1' },
  { url: '/img/logo-96.png', revision: '1' },
  { url: '/img/logo-128.png', revision: '1' },
  { url: '/img/logo-144.png', revision: '1' },
  { url: '/img/logo-192.png', revision: '1' },
  { url: '/img/logo-256.png', revision: '1' },
  { url: '/img/logo-384.png', revision: '1' },
  { url: '/img/logo-512.png', revision: '1' },
  { url: '/pages/nav.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/competition.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/contact.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/main.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/toUint8Array.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/home.js', revision: '1' },
  { url: '/js/competition.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },  
  { url: '/js/register-sw.js', revision: '1' },
], {
  // ignore a different set of search parameters
  ignoreUrlParametersMatching: [/.*/]
});

// offline use 
workbox.routing.registerRoute(    
  // new RegExp('^https:\/\/cors-anywhere\.herokuapp\.com\/https:\/\/api\.football-data\.org\/'),
  new RegExp('https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fetch-api',
  })
);

// caching google fonts 
workbox.routing.registerRoute(    
  new RegExp('https://fonts.googleapis.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts',
  })
);

workbox.routing.registerRoute(
  new RegExp('\/css\/|\/img\/|\/index.html'),
  workbox.strategies.cacheOnly({
    cacheName: 'css, img, index'
  })
);

workbox.routing.registerRoute(
  new RegExp('\/js\/'),
  workbox.strategies.cacheFirst({
    cacheName: 'js'
  })
);

workbox.routing.registerRoute(
  new RegExp('\/pages\/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/logo-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});