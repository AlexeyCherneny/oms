import * as firebase from "firebase/app";
import "firebase/messaging";

import { store } from "../store";

import { FIREBASE_SETTINGS, VAPID_KEY } from "../settings";

const initializedFirebaseApp = firebase.initializeApp(FIREBASE_SETTINGS);

let messaging;

const updateFCMToken = () =>
  messaging
    .getToken()
    .then(token => {
      //console.log("token: ", token);
      store.dispatch({ type: "UPDATE_FCM_TOKEN", payload: token });
    })
    .catch(err => {
      console.log("Unable to retrieve refreshed token ", err);
    });

const configFCMMessages = () => {
  messaging = initializedFirebaseApp.messaging();

  messaging.usePublicVapidKey(VAPID_KEY);

  messaging.onTokenRefresh(() => {
    updateFCMToken(messaging);
  });

  messaging.onMessage(payload => {
    console.log("Message received. ", payload);
  });

  updateFCMToken(messaging);
};

const subscribeStoreOnMessages = () => {
  navigator.serviceWorker.addEventListener("message", event => {
    store.dispatch({ type: "RECEIVE_MESSAGE", payload: event });
  });
};

if (firebase.messaging.isSupported()) {
  if (!("Notification" in window)) {
    alert("Данный браузер не поддерживает веб уведомления.");
  } else if (Notification.permission === "granted") {
    configFCMMessages();
    subscribeStoreOnMessages();
  } else if (Notification.permission === "default") {
    Notification.requestPermission(permission => {
      if (permission === "granted") {
        configFCMMessages();
        subscribeStoreOnMessages();
      } else if (permission === "denied") {
        console.log("Notifications permission has blocked by user");
      } else {
        console.log("Notifications permission is off");
      }
    });
  } else if (Notification.permission === "denied") {
    console.log("Notifications permission has blocked by user");
  } else {
    console.log("Notifications permission is off");
  }
} else {
  alert("Интеграция с firebase на данном устройстве не поддерживается");
}
