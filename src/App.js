import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './styles/App.css'

import Bookshelf from './components/Bookshelf';
import Book from './components/Book';
import Search from './components/Search';

class BooksApp extends React.Component {
    state = {
        books: [],
    }

    constructor(props) {
        super(props);

        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        })
    }


    onBookshelfChange(bookID, newShelf) {
        const book = this.state.books.find((book) => book.id === bookID);

        //TODO: Refactor for more eligance.
        this.setState((oldState) => {

            const updatedShelf = oldState.books.filter((book) => book.id !== bookID);

            book.shelf = newShelf;

            updatedShelf.push(book);

            return {books: updatedShelf};
        });

        BooksAPI.update(book, newShelf);
    }

    render() {
        //TODO: Change bookshelves to a loop from shelf library.

        return (
            <div>
                <Route path='/search' exact render={() => (
                    <Search/>
                )}/>

                <Route path='/' exact render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Book.CURRENTLY_READING)}
                                    bookshelfTitle='Currently Reading'
                                    onBookshelfChange={this.onBookshelfChange}
                                />

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Book.WANT_TO_READ)}
                                    bookshelfTitle='Want to read'
                                    onBookshelfChange={this.onBookshelfChange}
                                />

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Book.READ)}
                                    bookshelfTitle='Read'
                                    onBookshelfChange={this.onBookshelfChange}
                                />

                            </div>
                        </div>
                    </div>
                )}/>

            </div>
        )
    }
}


export default BooksApp;
