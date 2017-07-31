import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
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
        BooksAPI.update(book, event.target.value).then((res) => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks
                        books={this.state.books}
                        onChangeShelf={this.changeShelf}
                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <Search
                        books={this.state.books}
                        onChangeShelf={this.changeShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
