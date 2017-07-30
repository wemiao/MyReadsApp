import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookshelfTitle from './BookshelfTitle'
import ShelfSelect from './ShelfSelect'

class Bookshelf extends Component {
    render() {
        const { shelf, books, onChangeShelf } = this.props
        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <BookshelfTitle shelf={shelf}/>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                                    </div>
                                                    <ShelfSelect 
                                                        shelf={shelf}
                                                        changeShelf={(event) => onChangeShelf(event, book)}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Bookshelf;
