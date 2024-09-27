import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // Fetch the books data from the Node.js server
    const fetchBooks = async () => {
      try {
        const api = process.env.REACT_APP_API;
        console.log(api)
        const response = await axios.get("http://20.233.227.7:3001/books");
        setBooks(response.data); // Set the books data
        setLoading(false); // Stop the loading spinner
      } catch (error) {
        setError('Error Fetching Books Data');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading Data ...</div>; // Show loading while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error if any
  }

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.name}</strong> by {book.author} - Chapters: {book.chapters}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
