import React, { useContext} from 'react'; // eslint-disable-next-line
import firebase from 'firebase';

import { AuthContext } from '../../context/AuthContext'  // eslint-disable-next-line
import { db } from '../../firebase/firebase'

function Profile() {
    // const [users, setUsers] = useState([])
    
    // useEffect(() => {
    //     db.collection('users').onSnapshot(snapshot => {
    //         setUsers(snapshot.docs.map(doc => doc.data()))
    //     })
    // }, [])
 // eslint-disable-next-line
    const { currentUser } = useContext(AuthContext)


    return (
        <div className="profile">
            <div className="profileContainer">
                <div className="profile_header">

                </div>
                <div className="profile_options">
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
