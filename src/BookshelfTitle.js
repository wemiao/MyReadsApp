import React from 'react';

const BookshelfTitle = (props) => {
    switch(props.shelf) {
        case "currentlyReading":
            return <h2 className="bookshelf-title">Currently Reading</h2>
        case "wantToRead":
            return <h2 className="bookshelf-title">Want to Read</h2>
        case "read":
            return <h2 className="bookshelf-title">Read</h2>
        default:
            return null
    }
}

export default BookshelfTitle
