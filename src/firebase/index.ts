import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCFS7wmeCMQrf-tZhJXh19dvY_w3-zkcxY",
    authDomain: "splitcheck-2bf0b.firebaseapp.com",
    databaseURL: "https://splitcheck-2bf0b.firebaseio.com",
    projectId: "splitcheck-2bf0b",
    storageBucket: "splitcheck-2bf0b.appspot.com",
    messagingSenderId: "818214922231",
    appId: "1:818214922231:web:b923c52c18cdad80c9f0f2",
    measurementId: "G-83XW90VX31"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
