import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase';

import { AuthContext } from '../../context/AuthContext'
import { db } from '../../firebase/firebase'

function Profile() {
    // const [users, setUsers] = useState([])
    
    // useEffect(() => {
    //     db.collection('users').onSnapshot(snapshot => {
    //         setUsers(snapshot.docs.map(doc => doc.data()))
    //     })
    // }, [])

    const { currentUser } = useContext(AuthContext)


    return (
        <div>
            <h1>{currentUser.displayName}</h1>
            <img src={currentUser.photoURL} alt="" />
        </div>
    )
}

export default Profile
