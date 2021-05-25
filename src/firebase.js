

  import firebase from "firebase";


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCCGCGAPrwIswKBGUV_abh_hbUUnJBQCUg",
    authDomain: "instagram-clone-a06bd.firebaseapp.com",
    projectId: "instagram-clone-a06bd",
    storageBucket: "instagram-clone-a06bd.appspot.com",
    messagingSenderId: "441069994945",
    appId: "1:441069994945:web:2681d8e3f3fb86cf18a540",
    measurementId: "G-T66016G8HP"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };