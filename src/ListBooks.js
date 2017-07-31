import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class ListBooks extends Component {
    state = {
        books: [],
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    changeShelf = (event, book) => {
        BooksAPI.update(book, event.target.value).then((res) => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
            })
        })
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Bookshelf
                    books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                    shelf="currentlyReading"
                    onChangeShelf={this.changeShelf}
                />
                <Bookshelf
                    books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                    shelf="wantToRead"
                    onChangeShelf={this.changeShelf}
                />
                <Bookshelf
                    books={this.state.books.filter((book) => book.shelf === "read")}
                    shelf="read"
                    onChangeShelf={this.changeShelf}
                />
            </div>
        )
    }
}

export default ListBooks
