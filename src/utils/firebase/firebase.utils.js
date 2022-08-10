import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}