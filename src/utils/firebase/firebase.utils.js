import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDoc, setDoc, getFirestore, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIEwjzH4DxE_QvqzzMxt7wzMepbQrpsd4",
    authDomain: "crwn-clothing-db-6d1e2.firebaseapp.com",
    projectId: "crwn-clothing-db-6d1e2",
    storageBucket: "crwn-clothing-db-6d1e2.appspot.com",
    messagingSenderId: "815913782115",
    appId: "1:815913782115:web:3d596219039ff7f62ce156"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}