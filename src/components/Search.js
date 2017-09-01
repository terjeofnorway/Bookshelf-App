import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



class Search extends Component {
    static propTypes = {
        query:PropTypes.string,
        onUpdateQuery:PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);

        this.onUpdateQuery = this.onUpdateQuery.bind(this);
    }

    onUpdateQuery(e){
        this.props.onUpdateQuery(e.target.value);
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.props.query} onChange={this.onUpdateQuery}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }

}

Search.defaultProps = {};

export default Search;