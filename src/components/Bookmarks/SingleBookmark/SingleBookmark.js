import React from 'react';
import firebase from 'firebase'

import { db } from '../../../firebase/firebase';

import deleteImg from '../../../assets/images/svg/delete.svg'

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
            <div onClick={deleteBookmark} className="delete_icon">
                <img src={deleteImg} alt=""/>
            </div>
            <a onClick={updateVisitCount} href={url} target="_blank" rel="noreferrer" className="singleBookmarkContainer">
                <div className="singlebook-img">
                    <h1>{firstLetter(name)}</h1>
                </div>
                <p>{name}</p>
            </a>            
        </div>
    )
}

export default SingleBookmark
