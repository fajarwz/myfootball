var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKxZyOibbPKxbnXFCM0emRSJdB8265RG5Fz_0FqkaMi_fwPITgqDacoYKr31IToINVTU1slPbENfO3PUM_XN6Fo",
   "privateKey": "AbduHpfS5nQXQk3daMgsH_N1r3Ym-1q27dCQW3L4M0s"
};
 
 
webPush.setVapidDetails(
   'mailto:fajarwz.dev@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/e6EsqA9kgjs:APA91bEhnjY3ntPr8f9WvONsq9R4SID1zc5wv3Hdxk8qc_Jmck5SGRjigVzHiV3EqWEAvFPUaQPnPOLbxEy2h32Le9NHqJpc4CxEhy6RX6syryk8c6goev5LYHFwHzB4QOQ3rLvveudq",
   "keys": {
       "p256dh": "BDNqHp1iT5i2gK1cfAOdumA4RlFoUAxOIInHyTH3X+54CPtD9L0Z4eAEjIz96xYs4JD1ImWF3akQeaJvEeP+rNA=",
       "auth": "GUVfpb4ZSZWvbcMHFeYrnQ=="
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