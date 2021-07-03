import React from 'react';

import './SingleBookmark.css'

function SingleBookmark({ name, url, id }) {
    return (
        <div className="singleBookmark">
            <a href={url} target="_blank" rel="noreferrer">
                <div className="singlebook-img">
                <img src="" alt="" />
                </div>
                <p>{name}</p>
            </a>
        </div>
    )
}

export default SingleBookmark
