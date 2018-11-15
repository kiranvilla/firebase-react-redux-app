import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpwWDMog00gRVdGuGK5cE_K7Y3try53y8",
    authDomain: "kiran-marioplan.firebaseapp.com",
    databaseURL: "https://kiran-marioplan.firebaseio.com",
    projectId: "kiran-marioplan",
    storageBucket: "kiran-marioplan.appspot.com",
    messagingSenderId: "676249693100"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    googleAuthProvider,
};

export default firebase;