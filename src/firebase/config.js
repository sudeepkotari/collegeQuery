import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZzQ3joCxAAhR3ENOC11qq_yMtEzWgudk",
    authDomain: "college-query.firebaseapp.com",
    projectId: "college-query",
    storageBucket: "college-query.appspot.com",
    messagingSenderId: "971603117181",
    appId: "1:971603117181:web:fbc9a412cfeed10d125d14"
  };

  firebase.initializeApp(firebaseConfig);

  export const cloudStorage = firebase.storage();