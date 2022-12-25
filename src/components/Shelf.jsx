import React from 'react'
import Books from './Books'

const Shelf = ({shelftitle, books , cahngeShelfSatus}) => {
    
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{shelftitle}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map(b => (
                <li key={b.id}>
                    <Books book={b} cahngeShelfSatus={cahngeShelfSatus} />
                </li>
            ))}
           
        </ol>
    </div>
    </div>
  )
}

export default Shelf