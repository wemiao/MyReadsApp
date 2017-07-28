import React from 'react';

const ShelfSelect = (props) => {
    return (
        <div className="book-shelf-changer">
            <select value={props.shelf} onChange={props.changeShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>

    )
}

export default ShelfSelect
