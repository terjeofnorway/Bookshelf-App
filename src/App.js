import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './styles/App.css'

import Bookshelf from './components/Bookshelf';
import Book from './components/Book';

class BooksApp extends React.Component {
    state = {
        books: [],
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        })
    }

    render() {
        return (
            // Add the global list wrapper in which each
            // Bookshelf component will be added
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <Route path='/' exact render={() =>
                            <Bookshelf
                                books={this.state.books.filter((book) => book.shelf === Book.CURRENTLY_READING)}
                                bookshelfTitle='Currently Reading'
                            />}
                        />

                        <Route path='/' exact render={() =>
                            <Bookshelf
                                books={this.state.books.filter((book) => book.shelf === Book.WANT_TO_READ)}
                                bookshelfTitle='Want to read'
                            />}
                        />

                        <Route path='/' exact render={() =>
                            <Bookshelf
                                books={this.state.books.filter((book) => book.shelf === Book.READ)}
                                bookshelfTitle='Read'
                            />}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
