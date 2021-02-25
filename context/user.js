// https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/
import React, { createContext, useContext, useEffect, useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '@config/firebase-app.json'

// init firebase
if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig)
}
firebase.auth().useDeviceLanguage()

//
const UserContext = createContext()


// 
export default function UserProvider({ children }) {
    const auth = useProvideAuth()
    return (
        <UserContext.Provider value={ auth }>
            {children}
        </UserContext.Provider>
    )
}

export function useAuth() {
    return useContext(UserContext)
}

function useProvideAuth() {
    const [user, setUser] = useState()
    const [idToken, setIdToken] = useState()

    const clearUser = () => {
        setUser(null)
        setIdToken(null)
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function (u) {
            if (u) {
                setUser(u)
                u.getIdToken().then(setIdToken)
            } else {
                clearUser()
            }
        }, err => clearUser(null))
        return () => unsubscribe()
    }, [])

    const signInWithEmailAndPassword = (email, pass) =>
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(credential => {
                setUser(credential.user)
            })

    const signOut = () =>
        firebase.auth().signOut().then(() => {
            clearUser()
        })

    return {
        user,
        idToken,
        signInWithEmailAndPassword,
        signOut,
    }
}