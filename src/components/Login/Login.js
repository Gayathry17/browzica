import React, { useContext} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/firebase';

import loginImg from '../../assets/images/svg/login.svg'
import googleImage from '../../assets/images/svg/google1.svg'
import logoNoText from '../../assets/images/svg/logo-notext.svg';

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
                        <p>Tired of having to search for all your favourite websites? Look no further!<br/>Use browzica to keep track of your bookmarks</p>
                    </div>
                    <div className="login-rightcontainer">
                    <div className="logo-container">
                            <img src={logoNoText} alt=""/>
                        </div>
                        <div className="login-right-content">
                            <p>Welcome to</p>
                            <h1>browz<span style={{color: '#9151D0'}}>i</span>ca</h1>
                            <h4>Manage all your bookmarks easily!</h4>
                        </div>
                        <img src={loginImg} alt=""/>
                        <button onClick={handleOnClick} className="sign-in">
                            <img src={googleImage} alt=""/>
                            Sign In with Google
                        </button>
                    </div>
            </div>
            
        </div>
    )
}

export default Login
