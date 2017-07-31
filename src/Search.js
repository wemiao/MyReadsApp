import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import ShelfSelect from './ShelfSelect'

class Search extends Component {
    state = {
        searchBooks: [],
        query: ''
    }

    mergeSearchAndBookshelf = (searchBooks, books) => {
        let diff = _.differenceBy(searchBooks, books, 'id').map((book) => {
            let obj = book;
            obj.shelf = "none"
            return obj 
        })

        let intersection = _.intersectionBy(books, searchBooks,  'id')

        let result = intersection.concat(diff)
        this.setState({ searchBooks: result })
    }

    updateQuery = (query) => {
        this.setState({ query: query.trimLeft() })
        if(query) { // only query on nonempty string
            BooksAPI.search(query).then((searchBooks) => {
                if(searchBooks.error !== "empty query") {
                    this.mergeSearchAndBookshelf(searchBooks, this.props.books)
                } else {
                    this.setState({ searchBooks: [] })
                }
            })
        } else {
            this.setState({ searchBooks: [] })
        }
    } 

    changeShelf = (event, book) => {
        this.props.onChangeShelf(event, book)
        BooksAPI.update(book, event.target.value).then((res) => {
            BooksAPI.getAll().then((books) => {
                this.mergeSearchAndBookshelf(this.state.searchBooks, books)
            })
        })
    }

    render() {
        const { searchBooks, query } = this.state
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
                                                changeShelf={(event) => this.changeShelf(event, book)}
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
