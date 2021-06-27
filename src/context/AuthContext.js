import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/firebase'
import firebase from 'firebase'

export const AuthContext = createContext()

function AuthContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('authUser'))
    const [pending, setPending] = useState(true) 

    const authListener = () => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user)
                setPending(false)
            } else {
                setCurrentUser(null)
            }
        })
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    }


    const handleUser = (user) => {
        setCurrentUser(user)
        localStorage.setItem('authUser', user)
    }

    useEffect(() => {
        authListener()
    }, [])


    const handleLogout = () => {
        auth.signOut();
        localStorage.removeItem('authUser')
    }

    const value = { currentUser, pending, handleLogout, handleUser }



    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;