import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import ShelfSelect from './ShelfSelect'

class Search extends Component {
    state = {
        books: [],
        searchBooks: [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trimLeft() })
        if(query) { // only query on nonempty string
            BooksAPI.search(query).then((searchBooks) => {
                if(searchBooks.error !== "empty query") {
                    this.setState({ searchBooks })
                } else {
                    this.setState({ searchBooks: [] })
                }
            })
        } else {
            this.setState({ searchBooks: [] })
        }
    } 

    onChangeShelf = (event, book) => {
        console.log(book)
        BooksAPI.update(book, event.target.value).then((res) => {
            console.log(res)
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
            })
        })
    }

    render() {
        const { books, searchBooks, query } = this.state
        // remove books with no thumbnails, as there would be no way to properly identify them in the
        // current interface
        let curBooks = searchBooks.filter((book) => {
            return book.hasOwnProperty('imageLinks') 
        })
        // filter by unique id to remove object duplicates
        curBooks = _.uniqBy(curBooks, 'id');
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link  
                        to="/"
                        className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                if(books) {
                    <div className="search-books-results">     
                        <ol className="books-grid">
                            {curBooks.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                            </div>
                                            <ShelfSelect 
                                                shelf={book.shelf}
                                                changeShelf={(event) => this.onChangeShelf(event, book)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                }
            </div>
        )
    }
}

export default Search;
