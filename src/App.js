import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
    state = {
        books: [],
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    changeShelf = (event, book) => {
        BooksAPI.update(book, event.target.value).then((shelf) => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div>
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
                )}/>
                <Route exact path="/search" render={() => (
                    <div>

                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
