import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyChoeJQgNqv2RiJc_0cyWLf3h9LQoFXhKI",
    authDomain: "train-schedule-e5f57.firebaseapp.com",
    databaseURL: "https://train-schedule-e5f57.firebaseio.com",
    projectId: "train-schedule-e5f57",
    storageBucket: "train-schedule-e5f57.appspot.com",
    messagingSenderId: "560312009913"
};
firebase.initializeApp(config);
export default firebase;