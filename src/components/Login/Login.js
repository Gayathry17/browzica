import React, { useContext} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/firebase';

import loginImg from '../../assets/images/svg/login.svg'
import googleImage from '../../assets/images/svg/google.svg'

import './Login.css'

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
                        <img src={loginImg} alt=""/>
                        <p>This is just a paragraphThis is just a paragraph. This is just a paragraph</p>
                    </div>
                    <div className="login-rightcontainer">
                        <div className="login-right-content">
                            <p>Welcome to</p>
                            <h1>Browzica</h1>
                            <h4>Manage all your bookmarks easily! <br /> Sign in now</h4>
                        </div>
                        <img src={loginImg} alt=""/>
                        <button onClick={handleOnClick}>
                            <img src={googleImage} alt=""/>
                            Sign In with Google
                        </button>
                    </div>
            </div>
            
        </div>
    )
}

export default Login
