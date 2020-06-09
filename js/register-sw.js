if("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("ServiceWorker not supported yet in this browser!");
}

function registerServiceWorker() {
  return navigator.serviceWorker.register('/service-worker.js')
    .then(function (registration) {
      console.log('Service worker registered successfully!');
      return registration;
    })
    .catch(function (err) {
      console.error('Service worker registeration failed!', err);
    });
}

function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      
      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BIGcfSpQfhc5zTg6QiUS94qA_j6Na8OLwroUXT5ooWtUbZMDFBTnaMNdtc6Wd2ChiXrfXXh6MZmvu1-5kIWNyU8")
          }).then(function(subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
    }
    
    });
  }
}