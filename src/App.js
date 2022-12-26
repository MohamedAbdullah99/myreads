import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter ,Route, Routes, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Home from "./components/Home";
import Books from "./components/Books";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState([])
  const [query, setQuery] = useState("");
  const [mergedbooks, setMergedBooks] = useState([])
  const [mapBooksId, setMapBooksId] = useState(new Map())

  useEffect(() => {
    BooksAPI.getAll().then(data => {
      setBooks(data)
      setMapBooksId(createMapBooksId(data))
    })
  }, [])

 
  const cahngeShelfSatus = (book, newShelf) => {
    const updateABook = books.map(b => {
      if (b.id === book.id) {
        book.shelf = newShelf;
        return book;
      }
      return b
    }) 
    if(!mapBooksId.has(book.id)) {
      book.shelf = newShelf;
      updateABook.push(book)
    }
    setBooks(updateABook);
    BooksAPI.update(book,newShelf);
  }

  const createMapBooksId = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }
  useEffect(() => {
    let stutas = true;
    BooksAPI.search(query).then(data => {
       if (query) {
        if (data.error) {
            setSearchBook([])
        } else {
            if (stutas) {
                setSearchBook(data)
            }
        }
       }
    })
    return () => {
        stutas = false;
        setSearchBook([])
    }
  }, [query]);
 
  useEffect(() => {
    const comb = searchBook.map(book => {
        if(mapBooksId.has(book.id)) {
            return mapBooksId.get(book.id);
        } else {
            return book;
        }
    })
    setMergedBooks(comb);
  }, [searchBook])
  
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <Home books={books} cahngeShelfSatus={cahngeShelfSatus} />
          } />
          <Route path="/search" element={
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"
                className="close-search"
                
              >
                Close
              </Link>
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
                  {mergedbooks.map(b => (
                      <li key={b.id}>
                          <Books book={b} cahngeShelfSatus={cahngeShelfSatus} />
                      </li>
                  ))}
              </ol>
            </div>
          </div>
          } />
        </Routes>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
