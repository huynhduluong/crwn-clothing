import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver } from 'firebase/auth'
import { getDoc, setDoc, getFirestore, doc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { Category } from '../../store/categories/category.types';

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

type ObjectsToAdd = {
    title: string
}

export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
}

export type AdditionalInformation = {
    displayName?: string
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback)
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubcribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubcribe()
                resolve(userAuth)
            },
            reject
        )

    })
}