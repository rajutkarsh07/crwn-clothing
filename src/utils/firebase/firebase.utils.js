import { initializeApp } from "firebase/app"
import { getAuth, sighInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyATSJc4WTbH86GgoifIjA7hw_KEvnPsVVM",
  authDomain: "crwn-clothing-db-f0464.firebaseapp.com",
  projectId: "crwn-clothing-db-f0464",
  storageBucket: "crwn-clothing-db-f0464.appspot.com",
  messagingSenderId: "442184949009",
  appId: "1:442184949009:web:40cc796fa0d8b7426ec0b0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

console.log(provider)

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  // console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)
  // console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}