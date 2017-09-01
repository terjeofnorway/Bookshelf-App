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

    constructor(props){
        super(props);

        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        })
    }


    onBookshelfChange(bookID, newShelf){
        //TODO: Refactor for more eligance.
        this.setState((oldState) => {
            const book = oldState.books.find((book) => book.id === bookID);
            const updatedShelf = oldState.books.filter((book) => book.id !== bookID);

            book.shelf = newShelf;

            updatedShelf.push(book);

            return {books:updatedShelf};
        });


    }

    render() {
        //TODO: Change bookshelves to a loop from shelf library.

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
                                onBookshelfChange={this.onBookshelfChange}
                            />}
                        />

                        <Route path='/' exact render={() =>
                            <Bookshelf
                                books={this.state.books.filter((book) => book.shelf === Book.WANT_TO_READ)}
                                bookshelfTitle='Want to read'
                                onBookshelfChange={this.onBookshelfChange}
                            />}
                        />

                        <Route path='/' exact render={() =>
                            <Bookshelf
                                books={this.state.books.filter((book) => book.shelf === Book.READ)}
                                bookshelfTitle='Read'
                                onBookshelfChange={this.onBookshelfChange}
                            />}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
