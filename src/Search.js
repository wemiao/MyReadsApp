import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ShelfSelect from './ShelfSelect'

class Search extends Component {
    state = {
        searchBooks: [],
        query: ''
    }

    inBookshelf = (books, book) => {
        for(let shelfBook of books) {
            if(book.id === shelfBook.id) {
                return shelfBook.shelf
            }
        }
        return "none"
    }

    mergeSearchAndBookshelf = (searchBooks, books) => {
        let result = searchBooks.map((book) => {
            let obj = book;
            obj.shelf = this.inBookshelf(books, book)
            return obj
        })
        this.setState({ searchBooks: result })
    }

    isUnique = (book, curBooks, idx) => {
        for(let [i, curBook] of curBooks.entries()) {
            if (curBook.id === book.id) {
                return i === idx
            }
        }
        return true
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
        // filter out no thumbnail images
        //let curBooks = searchBooks.filter((book) => {
        //    return book.hasOwnProperty('imageLinks') 
        //})
        // filter by unique id to remove object duplicates
        let curBooks = searchBooks.filter((book, idx) => this.isUnique(book, searchBooks, idx))
        //curBooks = 
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
                if(searchBooks) {
                    <div className="search-books-results">     
                        <ol className="books-grid">
                            {curBooks.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
                                            </div>
                                            <ShelfSelect 
                                                shelf={book.shelf}
                                                changeShelf={(event) => this.changeShelf(event, book)}
                                            />
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
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
