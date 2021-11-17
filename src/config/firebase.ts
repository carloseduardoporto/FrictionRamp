import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAa_T3mkHgMhU6Od5WKlbh_WLFJildROlM',
  projectId: 'frictionramp',

  authDomain: 'FrictionRamp.firebaseapp.com',
  databaseURL: 'https://frictionramp-default-rtdb.firebaseio.com/',
};

const firebase = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebase);

export default firebase;
