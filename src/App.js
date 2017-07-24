import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
    state = {
        books: [],
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: true
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
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
                        />
                        <Bookshelf
                            books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                            shelf="wantToRead"
                        />
                        <Bookshelf
                            books={this.state.books.filter((book) => book.shelf === "read")}
                            shelf="read"
                        />
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
