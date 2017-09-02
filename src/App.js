import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom';
import './styles/App.css'

import Bookshelf from './components/Bookshelf';
import Search from './components/Search';

class BooksApp extends React.Component {
    state = {
        books: [],
        queriedBooks: [],
        query: '',
    }

    constructor(props) {
        super(props);

        this.onBookshelfChange = this.onBookshelfChange.bind(this);
        this.onUpdateQuery = this.onUpdateQuery.bind(this);
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        });
    }


    onBookshelfChange(newBook, newShelf) {

        //TODO: Refactor for more eligance.
        //TODO: Remove book from search result if any.
        this.setState((oldState) => {

            const updatedShelf = oldState.books.filter((book) => book.id !== newBook.id);

            newBook.shelf = newShelf;

            updatedShelf.push(newBook);

            return {books: updatedShelf};
        });

        BooksAPI.update(newBook, newShelf);
    }


    /**
     * Update the query by calling the search API, merging shelf status
     * from existing shelved books and adding the result into the queriedBooks key in state.
     * @param query String The query to search for.
     */
    onUpdateQuery(query) {
        this.setState({query});

        BooksAPI.search(query, 5)
            .then((searchedBooks) => {

                // Use Array.map to generate an array of books that have their
                // shelved versions set to the correct shelf status.
                const mergedBooks = searchedBooks.map((singleSearchedBook) => {
                    const bookInShelves = this.state.books.find((book) => book.id === singleSearchedBook.id);
                    if (bookInShelves) {
                        singleSearchedBook.shelf = bookInShelves.shelf;
                    }
                    return singleSearchedBook;
                });

                this.setState({queriedBooks: mergedBooks});
            })
            .catch((error) => {});
    }

    render() {
        //TODO: Change bookshelves to a loop from shelf library.

        return (
            <div>
                <Route path='/search' exact render={() => (
                    <Search
                        query={this.state.query}
                        onUpdateQuery={this.onUpdateQuery}
                        queriedBooks={this.state.queriedBooks}
                        onBookshelfChange={this.onBookshelfChange}
                    />
                )}/>

                <Route path='/' exact render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                            <Link to='/search' className='open-search'/>
                        </div>
                        <div className="list-books-content">
                            <div>

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Bookshelf.SHELVES.CURRENTLY_READING.ID)}
                                    bookshelfTitle='Currently Reading'
                                    onBookshelfChange={this.onBookshelfChange}
                                />

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Bookshelf.SHELVES.WANT_TO_READ.ID)}
                                    bookshelfTitle='Want to read'
                                    onBookshelfChange={this.onBookshelfChange}
                                />

                                <Bookshelf
                                    books={this.state.books.filter((book) => book.shelf === Bookshelf.SHELVES.READ.ID)}
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
