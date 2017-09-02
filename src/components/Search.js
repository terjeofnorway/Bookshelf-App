import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Book from './Book';

class Search extends Component {
    static propTypes = {
        query:PropTypes.string,
        onUpdateQuery:PropTypes.func.isRequired,
        onBookshelfChange:PropTypes.func.isRequired,
    };

    state = {
        queryString:''
    }

    constructor(props){
        super(props);

        this.waitToUpdateQuery = this.waitToUpdateQuery.bind(this);
        this.queryWaitTimeout;
    }

    /**
     * As we don't want to immidiately query on every keystroke,
     * add a timeout to see if user has at least paused typing.
     *
     * Therefore, store the search as searchString in local state and only
     * after 500ms of not typing, send the actual search request
     * up in the components chain.
     * @param e
     */
    waitToUpdateQuery(e){
        this.setState({queryString:e.target.value});

        clearTimeout(this.queryWaitTimeout);
        this.queryWaitTimeout = setTimeout(() => {
            this.props.onUpdateQuery(this.state.queryString);
            }, 500
        )
    }

    render() {
        const {queriedBooks, onBookshelfChange} = this.props;


        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.queryString} onChange={this.waitToUpdateQuery}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            queriedBooks.map((book) => <Book
                                key={book.id}
                                book={book}
                                onBookshelfChange={onBookshelfChange} />)
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

Search.defaultProps = {};

export default Search;