// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase";
// Add the Firebase services that you want to use

const firebaseApp = firebase.initializeApp( {
    apiKey: 'AIzaSyA3quzqT7-E8mB5ok1LgT-HM-5PvwHgss0',
    authDomain: 'melzo-app.firebaseapp.com',
    databaseURL: 'https://melzo-app.firebaseio.com',
    projectId: 'melzo-app',
    storageBucket: 'melzo-app.appspot.com',
    messagingSenderId: '126598841107'
})
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};