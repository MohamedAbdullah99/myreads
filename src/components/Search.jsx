import React from 'react'
import { useEffect, useState } from "react";
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Books from './Books';
const Search = ({cahngeShelfSatus}) => {
  const [query, setQuery] = useState("");
  const [searchBook, setSearchBook] = useState([])
  const [mergedbooks, setMergedBooks] = useState([])
  
  useEffect(() => {
    let isActive = true;
    BooksAPI.search(query).then(data => {
       if (query) {
        if (data.error) {
            setSearchBook([])
        } else {
            if (isActive) {
                setSearchBook(data)
            }
        }
       }
    })
    return () => {
        isActive = false;
        setSearchBook([])
    }
  }, [query]);
 
  useEffect(() => {
    const comb = searchBook.map(book => {
        if(mapbid.contains(book.id)) {
            return mapbid.get(book.id);
        } else {
            return book
        }
    })
  }, [searchBook])
  return (
    <div className="search-books">
          <div className="search-books-bar">
            <button>
              <Link to="/"
                className="close-search"
                
              >
                Close
              </Link>
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchBook.map(b => (
                    <li key={b.id}>
                        <Books book={b} cahngeShelfSatus={cahngeShelfSatus} />
                    </li>
                ))}
            </ol>
          </div>
        </div>
  )
}

export default Search