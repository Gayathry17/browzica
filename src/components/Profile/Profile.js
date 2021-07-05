import React, { useContext} from 'react'; 
import firebase from 'firebase';
import { Button } from '@material-ui/core'
import { AuthContext } from '../../context/AuthContext'  
import './Profile.css'

function Profile() {

    const { currentUser } = useContext(AuthContext)

    const deleteAccount = () => {
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
            // User deleted.
        }).catch((error) => {
            console.log('Sign in again to delete account')
        });
    }


    return (
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profileContainer">
                <div className="profile_header">
                    <img src={currentUser.photoURL} alt="" />
                    <div className="profile-name">
                        <h4>Email</h4>
                        <h3>{currentUser.email}</h3>
                    </div>
                    <div className="profile-email">
                        <h4>Name</h4>
                        <h3>{currentUser.displayName}</h3>
                    </div>
                </div>
                <div className="profile_options">
                    <Button onClick={deleteAccount}>Delete My Account</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile
