import React from 'react';
import firebase from 'firebase'

import { db } from '../../../firebase/firebase';

import './SingleBookmark.css'

function SingleBookmark({ name, url, id, uid, count }) {

    const increment = firebase.firestore.FieldValue.increment(1)

    const firstLetter = (name) => {
        return String(name[0]).toLocaleUpperCase()
    }

    const deleteBookmark = () => {
        db.collection('users').doc(uid).collection('bookmarks').doc(id).delete()
    }

    const updateVisitCount = () => {
        db.collection('users').doc(uid).collection('bookmarks').doc(id).update({
            count: increment
        })
    }


    return (
        <div className="singleBookmark">
            <a onClick={updateVisitCount} href={url} target="_blank" rel="noreferrer" className="singleBookmarkContainer">
                <div className="singlebook-img">
                    <h1>{firstLetter(name)}</h1>
                </div>
                <p>{name}</p>
            </a>
            <button onClick={deleteBookmark}>{count}</button> 
        </div>
    )
}

export default SingleBookmark

// change delete button to trash icon