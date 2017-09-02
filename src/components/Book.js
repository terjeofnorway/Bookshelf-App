import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';

class Book extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired
    };


    constructor(props){
        super(props);

        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    /**
     * Local onBookshelfChange event handler. Lets the component make
     * calculations before invoking the onBookshelfChange supplied by props.
     * @param e
     * @return void
     */
    onBookshelfChange(e){
        this.props.onBookshelfChange(this.props.book, e.target.value);
    }

    render() {
        //TODO: Cleanup in aisle 30-37
        const {title, authors, imageLinks} = this.props.book;
        const currentShelf = this.props.book.shelf || 'none';


        const authorString = authors && authors.join(', ');
        const thumbnail = (imageLinks && imageLinks.thumbnail) || 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';

        const bookShelves = Object.keys(Bookshelf.SHELVES).map((key) => Bookshelf.SHELVES[key]);


        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.onBookshelfChange} value={currentShelf}>
                            <option value="none" disabled>Move to...</option>
                            {bookShelves.map((shelf) => (<option value={shelf.ID} key={shelf.ID}>{shelf.TITLE}</option>))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authorString}</div>
            </div>
        )
    }
}


Book.defaultProps = {};

export default Book;