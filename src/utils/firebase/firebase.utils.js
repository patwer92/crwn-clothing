import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAnq2pfUJOqAbOV0zyNu2AWP3L4MgfZOkc',

  authDomain: 'crwn-clothing-db-4a58a.firebaseapp.com',

  projectId: 'crwn-clothing-db-4a58a',

  storageBucket: 'crwn-clothing-db-4a58a.appspot.com',

  messagingSenderId: '65201632714',

  appId: '1:65201632714:web:b8efe2fc30c54c22370b33',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exsist?
  // create / set the document with the data from userAuth in my collection

  // if user data exists?
  // return userDocRef

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
