import React, {useState,useContext,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { AuthContext } from '../../context/AuthContext'
import {db} from '../../firebase/firebase';

import './BookMarks.css'


export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [open,setOpen] = useState(false);
    const [name,setName] = useState('');
    const [url,setUrl] = useState('');
    const { currentUser }  = useContext(AuthContext)



    useEffect(() => {
             db.collection('users').doc(currentUser.uid).collection('bookmarks').onSnapshot(snapshot => {
                 setBookmarks(snapshot.docs.map(doc => doc.data()))
             })
         }, [])

    console.log(bookmarks)

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
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                count:0
            })

        }

    }

    return (
        <div className="bookmark">
            <div className="bookmark-container">
                <h2>Bookmarks</h2>
                <div className="search-sort">
                    <div className="bookmark-search">
                        <SearchIcon />
                        <input type="text" placeholder="Search"/>
                    </div>
                    <div className="bookmark-sort">
                        <h3>Sort by</h3>
                        <Button variant="outlined" color="primary">Most Visited</Button>
                        <Button variant="outlined" color="primary">Alphabetical Order</Button>
                    </div>
                </div>
                
                <div className="bookmark-body">
                    <Button variant="outlined" color="primary" onClick={handleOpen}>
                     <AddIcon/>Add
                    </Button>
                </div>
            </div>
            
            
                <Dialog disableScrollLock onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="bookmark-dialog">
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


