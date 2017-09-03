import React, {Component} from 'react';
import PropTypes from 'prop-types';
import nocover from '../graphics/no-cover.png'; //Used for when a cover is missing from the search.

import Bookshelf from './Bookshelf';

class Book extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired
    };


    constructor(props){
        super(props);
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    state = {
        confirmationClass:''
    }

    /**
     * Local onBookshelfChange event handler. Lets the component make
     * calculations before invoking the onBookshelfChange supplied by props.
     *
     * Note that the conformationClass state change only works for searched books. Books changing shelves will
     * unmount and re-mount, clearing the state in the process, which is by design. (see componendDidMount)
     * @param e
     * @return void
     */
    onBookshelfChange(e){
        this.setState({confirmationClass:'active'});
        this.props.onBookshelfChange(this.props.book, e.target.value);
    }

    /**
     * If component is mounting (happens on shelf change), check if the
     * book was mounted due to a recent update change. If so, set confirmationClass:'active'
     * to show a brief () on the cover.
     */
    componentDidMount(){
        let confirmationClass = Date.now() - this.props.book.updateStamp < 3000 ? 'active' : '';
        this.setState({confirmationClass: confirmationClass});
    }


    render() {
        const {title, authors, imageLinks} = this.props.book;
        const currentShelf = this.props.book.shelf || 'none';

        //Check if author actually exist and join. Expect to get either undefined or Array.
        const authorString = authors && authors.join(', ');
        //Check if imageLinks exist, or show nocover. Expect to get thumbnail if imageLinks exist.
        const thumbnail = (imageLinks && imageLinks.thumbnail) || nocover;

        //Loop available bookshelves to populate the dropdown list.
        const bookShelves = Object.keys(Bookshelf.SHELVES).map((key) => Bookshelf.SHELVES[key]);

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                    <div className={`book-shelf-confirmation ${this.state.confirmationClass}`}></div>
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