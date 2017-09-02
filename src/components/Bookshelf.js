import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


class Bookshelf extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        bookshelfTitle:PropTypes.string.isRequired,
    };

    static SHELVES = {
        CURRENTLY_READING: {ID: 'currentlyReading', TITLE: 'Currently Reading'},
        WANT_TO_READ: {ID: 'wantToRead', TITLE: 'Want To Read'},
        READ: {ID:'read', TITLE:'Read'},
    }

    constructor(props){
        super(props);

    }

    render() {
        const {bookshelfTitle, books, onBookshelfChange} = this.props;



        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => <Book
                            key={book.id}
                            book={book}
                            onBookshelfChange={onBookshelfChange} />)}

                    </ol>
                </div>
            </div>
        )
    }

}

Bookshelf.defaultProps = {};

export default Bookshelf;