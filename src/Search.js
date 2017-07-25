import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookshelfTitle from './BookshelfTitle'

class Search extends Component {
    state = {
        shelf: this.props.shelf 
    }

    handleChange = (event, key) => {
        console.log(event.target.value);
        console.log(key);
    }

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
                                                    <div className="book-shelf-changer">
                                                        <select value={this.state.shelf} onChange={(event) => onChangeShelf(event, book)}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                        
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
