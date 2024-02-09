// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    doc, //retrieve document instances inside of our fire store database
    getDoc, //get document data
    setDoc, // set document data
    collection, //get a collection ref
    writeBatch,
    query,
    getDocs
  } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// eslint-disable-next-line
const firebaseConfig = {
  apiKey: "AIzaSyCHxEtTbZfGQEy_1JlXAR1Yt7BsqYmw-wE",
  authDomain: "crwnlearn-clothing-db.firebaseapp.com",
  projectId: "crwnlearn-clothing-db",
  storageBucket: "crwnlearn-clothing-db.appspot.com",
  messagingSenderId: "1020642940211",
  appId: "1:1020642940211:web:24e273430861aae9299a46",
  measurementId: "G-6X6YJFQSKF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account" //every time somebody interacts with our provider, 
    // we want to always force them to select an account.
});

// With auth, we can keep track of whether or not users are properly authenticating
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {} // add "Additional info" by ourselves and set default = empty
    ) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // await because Google needs to do this asynchronously to get the document
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // check if user data exits
    // if not, create/set the doc with data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
      }
    // if yes, return userDocRef
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  }; 

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  }; 

export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback)