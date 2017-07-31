import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import './App.css'

class ListBooks extends Component {
    render() {
        const { books, onChangeShelf } = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Bookshelf
                    books={books.filter((book) => book.shelf === "currentlyReading")}
                    shelf="currentlyReading"
                    onChangeShelf={onChangeShelf}
                />
                <Bookshelf
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    shelf="wantToRead"
                    onChangeShelf={onChangeShelf}
                />
                <Bookshelf
                    books={books.filter((book) => book.shelf === "read")}
                    shelf="read"
                    onChangeShelf={onChangeShelf}
                />
            </div>
        )
    }
}

export default ListBooks
