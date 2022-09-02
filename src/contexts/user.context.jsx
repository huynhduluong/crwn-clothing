import { createContext, useEffect, useReducer } from "react";
import { onAuthChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducers = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const initialState = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducers, initialState)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubcribe = onAuthChangedListener((user) => {
            if (user)
                createUserDocumentFromAuth(user)
            setCurrentUser(user)
        })

        return unsubcribe
    }, [])


    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

