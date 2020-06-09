var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIGcfSpQfhc5zTg6QiUS94qA_j6Na8OLwroUXT5ooWtUbZMDFBTnaMNdtc6Wd2ChiXrfXXh6MZmvu1-5kIWNyU8",
   "privateKey": "yEFiCoUEbjAWEv-kW7o6ozcUxqGgJTE4LptICPXMAeo"
};
 
 
webPush.setVapidDetails(
   'mailto:fajarwz.dev@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d3pSXyt2ayA:APA91bGztsGHgFqPhii8s81cdOsZMNQaUealudJXs56IBG5Gl4EZSjfmFrBo7CLuQyfCLZPuJ95LfYfW85vzfJdvs-77AZjw1DK7_pTZt7IimxRbQ9ghc57VFBlt5bCjDtsRx5H7DRu8",
   "keys": {
       "p256dh": "BJ4kQOPiSjLDOdzG2YD5MbbR5QuvTcgV5UWAG7NmoFMIRIrYY3JoNuKYr7DaU3ztLw4sGCxkkFC0MWaQBzt6YNU=",
       "auth": "oSfJfY62q4OViiW8H3R/7g=="
   }
};
var payload = 'Hai, selamat datang di MyFootball!';
 
var options = {
   gcmAPIKey: '509762887529',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);