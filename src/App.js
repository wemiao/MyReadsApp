import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks/>
                )}/>
                <Route exact path="/search" render={() => (
                    <Search/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
