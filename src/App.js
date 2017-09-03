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

    /**
     * Get books from API when the component has mounted.
     */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        });
    }

    /**
     * Triggers when the user selects another shelf from each dropdown in a Book instance.
     * This is also used by the search result listing when the user adds a new book to one
     * of the shelves.
     *
     * @param {object} newBook The entire object for a single book
     * @param {string} newShelf The ID of the new shelft to insert the book ingp.
     */
    onBookshelfChange(newBook, newShelf) {

        this.setState((oldState) => {
            // Pull book out of shelf
            const updatedShelf = oldState.books.filter((book) => book.id !== newBook.id);
            // Set correct shelf status
            newBook.shelf = newShelf;
            // Set a timestamp (Unix Epoch) to help determine if an update indication should be shown in Book.
            newBook.updateStamp = Date.now();
            // Push book into shelf
            updatedShelf.push(newBook);
            return {books: updatedShelf};
        });

        BooksAPI.update(newBook, newShelf);
    }


    /**
     * Update the query by calling the search API, merging shelf status
     * from existing shelved books and adding the result into the queriedBooks key in state.
     * This is triggered after the user has paused typing for X milliseconds. (Actual delay is
     * controllet by Search component.)
     *
     * @param {string} query The query to search for.
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
            .catch((error) => {
            });
    }

    render() {
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
                                {
                                    Object.keys(Bookshelf.SHELVES).map((shelf) => (
                                        <Bookshelf
                                            key={shelf}
                                            books={this.state.books.filter((book) => book.shelf === Bookshelf.SHELVES[shelf].ID)}
                                            bookshelfTitle={Bookshelf.SHELVES[shelf].TITLE}
                                            onBookshelfChange={this.onBookshelfChange}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}


export default BooksApp;
