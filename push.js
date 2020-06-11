var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLiH8p5B6A_oSkxQ6cw7u75E_h7KtWltb2pnYBxA0D6rVaqDq7T5CfXIgZI0SDSgQc1T42ATrUdmxnFeYcllbsU",
   "privateKey": "AhK5EgKtNwJK3a8yTRVmL4dInMZCq4ZopoJZEkQtbGE"
};
 
 
webPush.setVapidDetails(
   'mailto:fajarwz.dev@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ekPLPAobCsQ:APA91bGsGiRKK6rr4ei-XTJFh7G2kNrJg_P25_1AcOiAnDJdtdR_kpSC05Yq5rYXDdvG4PVsnnMZJ2d0LPMex7oFZES0r65nfzH9Gaoj5eHOXK2D0dP3zlH-hMakOH7gjuxC4y6DCxhN",
   "keys": {
       "p256dh": "BPfsvzJBFBM/EJ8zBYQDG6e22049an5J4NHDtGrorcTkGshMNeHmq6KUuxlJmeKYp7RaZDI5X8duY2QtL+s3TKE=",
       "auth": "EtnpgC9nnX8a0VqgWknqCQ=="
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