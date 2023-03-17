//the core firebase package
import firebase from 'firebase/app';
//services we want to use
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBpuQB0LYrFD_AnXu-rMDnG7teQyRIBjGs",
    authDomain: "mymoney-fa50d.firebaseapp.com",
    projectId: "mymoney-fa50d",
    storageBucket: "mymoney-fa50d.appspot.com",
    messagingSenderId: "609019516528",
    appId: "1:609019516528:web:bf5bfadc178d7f2cdb86b5"
  };

  //init using firebase config object
  firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore = firebase.firestore();
  //use projectauth object, sends a request to firebase on a backend to handle.
  //it looks at sign in or login details and creates a json token to athenticate the user
  //generates a json token for web user and is sent back to browser with information about that user
  //that we can access from react. from now on every request to databse that web token is sent back to firebase
  const projectAuth =firebase.auth();

  //timestamp - special type used in firestore databse
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }