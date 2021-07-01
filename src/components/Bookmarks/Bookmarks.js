import React, {useState,useContext,useEffect} from 'react';
import firebase from 'firebase';
import { Button, IconButton, Dialog, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';


import { AuthContext } from '../../context/AuthContext'
import {db} from '../../firebase/firebase';

import './BookMarks.css'


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
  
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
        </IconButton>
        ) : null}
    </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
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
                        <div className="sort-btns">
                            <button className="mostVisisted-btn">Most Visited</button>
                            <button className="alphabetical-btn">Alphabetical Order</button>
                        </div>
                    </div>
                </div>
                
                <div className="bookmark-body">
                    <Button onClick={handleOpen}>
                        <AddIcon/>
                        Add
                    </Button>
                </div>
            </div>

            <Dialog disableScrollLock onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="bookmark-dialog">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Bookmark
                </DialogTitle>
                <DialogContent dividers>
                <div>
                    <div className="name-label">
                        <label>
                            Website Name:
                        </label>
                        <input type="text" name="Website Name" value={name}  onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="url-label">
                        <label>
                            Website Url:
                        </label>
                        <input type="text" name="Website Url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    </div>
                </div>
                </DialogContent>
                <DialogActions>
                    <div className="modal-buttons">
                        <Button variant="contained" color="primary" onClick={createBookmark}>Save</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    </div>
                </DialogActions>
            </Dialog>         
            
        </div>
    )
}


