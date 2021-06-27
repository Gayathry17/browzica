import React, {useState,useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

import { AuthContext } from '../../context/AuthContext'
import {db} from '../../firebase/firebase'


export default function Bookmarks() {

    const [open,setOpen] = useState(false);
    const [name,setName] = useState('');
    const [url,setUrl] = useState('');

    const { currentUser }  = useContext(AuthContext)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const createBookmark = () => {
        if(name && url) {
            db.collection('users').doc(currentUser.uid).collection('bookmarks').add({
                bName: name,
                bUrl: url,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })

        }

    }

    return (
        <div>
            <div>
                <Button variant="outlined" color="primary" onClick={handleOpen}>
                Open simple dialog
                </Button>
            </div>

            <Dialog disableScrollLock onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <label>
                    Website Name:
                </label>
                <input type="text" name="Website Name" value={name}  onChange={(e)=>setName(e.target.value)}/>
                <label>
                    Website Url:
                </label>
                <input type="text" name="Website Url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                <Button variant="contained" color="primary" onClick={createBookmark}>Save</Button>
                <Button variant="contained" color="textPrimary">Cancel</Button>
            
        </Dialog>
            
        </div>
    )
}


