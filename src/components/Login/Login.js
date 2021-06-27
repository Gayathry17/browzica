import React, { useContext} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/firebase';
import { Container } from '@material-ui/core';

import './Login.css'

import googleImage from '../../assets/images/svg/google.svg'

function Login() {

    const { handleUser } = useContext(AuthContext);
    const history = useHistory();

    const handleOnClick = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        auth
           .signInWithPopup(googleProvider)
           .then(res => {
               console.log(res.user)
               handleUser(res.user)
               if(res) {
                db.collection('users').doc(res.user.uid).set({
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    profilePhoto: res.user.photoURL
                });
               }              
           })
           .then(() => {
               history.push('/');
           })
            .catch((er) => {
                console.log(er)
            })
    
    }
   
    return (
        <div className="login">
            <div className="login-container">
                    <div className="login-leftcontainer">
                        <img src="https://images.unsplash.com/photo-1624728020767-985e0b40facd?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
                        <h3>Heyyyy</h3>
                        <p>This is just a paragraph</p>
                    </div>
                    <div className="login-rightcontainer">
                        <h1>Browzica</h1>
                        <p>Welcome to Bookmarks!!</p>
                        <button onClick={handleOnClick}>
                            <img src={googleImage} alt=""/>Sign In with Google</button>
                    </div>
            </div>
            
        </div>
    )
}

export default Login
