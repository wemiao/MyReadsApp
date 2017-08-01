import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import './App.css'

class ListBooks extends Component {
    render() {
        const { books, onChangeShelf } = this.props
        const shelves = { currentlyReading: 'Currently Reading', wantToRead: 'Want to Read', read: 'Read' } 
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {Object.keys(shelves).map((shelfKey) => {
                    return <Bookshelf
                        title={shelves[shelfKey]}
                        books={books.filter((book) => book.shelf === shelfKey)}
                        onChangeShelf={onChangeShelf}
                        key={shelfKey}
                    />
                })}
            </div>
        )
    }
}

export default ListBooks
